function makeSoapRequest(dist, speed, tps_charge, nbCharge){
    return `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:min="miniprojet.soap.calcservice">
        <soapenv:Header/>
        <soapenv:Body>
            <min:calcTravelTime>
                <!--Optional:-->
                <min:distance>${dist}</min:distance>
                <!--Optional:-->
                <min:speed>${speed}</min:speed>
                <!--Optional:-->
                <min:chargeTime>${tps_charge}</min:chargeTime>
                <!--Optional:-->
                <min:nbCharge>${nbCharge}</min:nbCharge>
            </min:calcTravelTime>
        </soapenv:Body>
        </soapenv:Envelope>
    `
}

async function fetchTrajetPrediction(dist, speed, tps_charge, nbCharge) {
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

export { fetchTrajetPrediction }