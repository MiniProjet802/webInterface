const { app } = require('@azure/functions');
require('dotenv').config();

async function calcTravelTime(distance, speed, chargeTime, nbCharge){
    let travelTime = (distance / speed) * 3600 // calcul du temps de trajet en secondes
    travelTime += nbCharge * chargeTime // ajout du temps de charge
    return {"time-pred": travelTime};
}

app.http('calcPrediction', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'prediction/tpsTrajet',
    handler: async (req, context) => {
        console.log(req.query);
    
        const distance = req.query.get('distance');
        const speed = req.query.get('speed');
        const chargeTime = req.query.get('chargeTime');
        const nbCharge = req.query.get('nbCharge');

        console.log(distance, speed, chargeTime, nbCharge);
        const data = await calcTravelTime(distance, speed, chargeTime, nbCharge);
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
