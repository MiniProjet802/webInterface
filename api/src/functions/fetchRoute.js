const { app } = require('@azure/functions');
require('dotenv').config();

function makeRouteUrl(slat, slon, elat, elon) {
    return `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.OPENROUTE_TOKEN}&start=${slat},${slon}&end=${elat},${elon}`;
}

function makeCorrectedRouteUrl() {
    return "https://api.openrouteservice.org/v2/directions/driving-car/geojson";
}

async function fetchRouteData(slat, slon, elat, elon) {
    const url = makeRouteUrl(slat, slon, elat, elon);
    console.log(url);
    const response = await fetch(url);
    return response.json();
}

async function fetchCorrectedRouteData(positions) {
    const response = await fetch(makeCorrectedRouteUrl(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.OPENROUTE_TOKEN
        },
        body: JSON.stringify({
            coordinates: positions
        })
    });
    return response.json();
}

app.http('route', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        console.log(req.query);
    
        const slat = req.query.get('slat');
        const slon = req.query.get('slon');
        const elat = req.query.get('elat');
        const elon = req.query.get('elon');
        console.log(slat, slon, elat, elon);
        const data = await fetchRouteData(slat, slon, elat, elon);
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

app.http('correctedroute', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        console.log(req.body);
    
        const { positions } = req.body;
        const data = await fetchCorrectedRouteData(positions);
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
