function makeSoapRequest(dist, speed, tps_charge, nbCharge){
    return `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:min="miniprojet.soap.calcservice">
        <soapenv:Header/>
        <soapenv:Body>
            <min:calcTravelTime>
                <min:distance>${dist}</min:distance>
                <min:speed>${speed}</min:speed>
                <min:chargeTime>${tps_charge}</min:chargeTime>
                <min:nbCharge>${nbCharge}</min:nbCharge>
            </min:calcTravelTime>
        </soapenv:Body>
        </soapenv:Envelope>
    `
}

function makeRestRequest(dist, speed, tps_charge, nbCharge){
    return `http://localhost:7071/api/prediction/tpsTrajet?distance=${dist}&speed=${speed}&chargeTime=${tps_charge}&nbCharge=${nbCharge}`
}

async function fetchTrajetPredictionRest(dist, speed, tps_charge, nbCharge) {
    const url = makeRestRequest(dist, speed, tps_charge, nbCharge);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    });

    const jsonResponse = await response.json();
    return jsonResponse;
    
}

async function fetchTrajetPredictionSoap(dist, speed, tps_charge, nbCharge) {
    const url = 'http://127.0.0.1:8000';
    const soapRequest = makeSoapRequest(dist, speed, tps_charge, nbCharge)

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8'
        },
        body: soapRequest,
        credentials: 'same-origin'
    });

    const xmlResponse = await response.text()
        .then(text => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "text/xml");
            return {
                "time-pred": parseFloat(xmlDoc.firstChild.firstChild.firstChild.firstChild.textContent)
            };
        });
    return xmlResponse;
}

export { fetchTrajetPredictionSoap, fetchTrajetPredictionRest };