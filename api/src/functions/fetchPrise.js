const { app } = require('@azure/functions');
require('dotenv').config();

function makePrisesUrl(lat, lon, distance = 100) {
    // console.log("fetching with : ", lat, lon, distance);
    let point = `POINT(${lon} ${lat})`;
    // return `https://odre.opendatasoft.com/api/explore/v2.1/catalog/datasets/bornes-irve/records?where=within_distance(geo_point_borne%2C%20GEOM%27POINT(45%206)%27%2C%201000km)&order_by=distance(geo_point_borne%2C%20GEOM%27POINT(45%206)%27)&limit=20`;
    return `https://odre.opendatasoft.com/api/explore/v2.1/catalog/datasets/bornes-irve/records?where=within_distance(geo_point_borne%2C%20GEOM%27${point}%27%2C%20${distance}km)&order_by=distance(geo_point_borne%2C%20GEOM%27${point}%27)&limit=20`;
}

async function fetchPrisesData(lat, lon) {
    let dist = 1;
    let finished = false;
    let data = [];

    while (!finished) {
        await fetch(makePrisesUrl(lat, lon, dist))
            .then(response => response.json())
            .then(json => {
                if (json.total_count == 0) {
                    dist *= 10;
                } else {
                    data = json.results;
                    finished = true;
                }
            })
            .catch(err => {
                console.log(err);
                finished = true;
            });
    }
    // console.log("Data: ", data[0]);
    return data[0];
}

app.http('nearestPrise', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'prise/nearest',
    handler: async (req, context) => {
        console.log(req.query);
    
        const lat = req.query.get('lat');
        const lon = req.query.get('lon');
        console.log(lat, lon);
        const data = await fetchPrisesData(lat, lon);
        console.log(data);
        return {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
    }
});
