function makeUrl(slat, slon, elat, elon) {
    return `http://localhost:7071/api/route?slat=${slat}&slon=${slon}&elat=${elat}&elon=${elon}`;
}

const CorrectedRoutApiUrl = "http://localhost:7071/api/correctedroute";

async function test(){
    console.log('test');
    const response = await fetch('test.json');
    const geoJson = await response.json();
    return geoJson;
}

async function fetchRouteGeoJson(slat, slon, elat, elon){
    const url = makeUrl(slat, slon, elat, elon);
    console.log("fetchRouteGeoJson", url);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .catch(err => {
        console.log(err);
    });
    return response.json();
}

async function fetchCorrectedRouteGeoJson(positions) {
    console.log("positions", positions);
    const response = await fetch(CorrectedRoutApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            positions: positions
        })
    });
    return response.json();
}

export { test, fetchRouteGeoJson, fetchCorrectedRouteGeoJson };