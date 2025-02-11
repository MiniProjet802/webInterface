function makeUrl(lat, lon) {
    return `http://localhost:7071/api/prise/nearest?lat=${lat}&lon=${lon}`;
}

/** calcDist
 * Calculate the distance between two points on the earth's surface
 * @param {float} lat1 
 * @param {float} lon1 
 * @param {float} lat2 
 * @param {float} lon2 
 * @returns {float} distance in km
 */
function calcDist(lat1, lon1, lat2, lon2) {
    let R = 6371;
    let dLat = (lat2 - lat1) * Math.PI / 180;
    let dLon = (lon2 - lon1) * Math.PI / 180;
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

async function fetchPrisesListe(path, autonomie, startautonomie = 0) {
    var prises = [];
    let i = 1;
    let currPos = path[0];
    let currdist = startautonomie;
    let dist = 0;
    let totDist = 0;
    while(i < path.length){
        dist = calcDist(currPos[1], currPos[0], path[i][1], path[i][0]);
        if(dist + currdist > autonomie){
            let priseAdded = false;
            while(!priseAdded){
                let prise = await fetch(makeUrl(currPos[1], currPos[0]))
                    .then(response => response.json())
                    .then(json => {
                        return json;
                    })
                    .catch(err => {
                        console.log(err);
                    });
                // TODO check length of route to prise
                if(currdist + calcDist(currPos[1], currPos[0], prise.xlongitude, prise.ylatitude) > autonomie){
                    i--;
                    currPos = path[i];
                    // eslint-disable-next-line
                }{ 
                    prises.push(prise);
                    currdist = 0;
                    priseAdded = true;
                }
            }
        }else{
            currdist += dist;
            currPos = path[i];
        }
        totDist +=dist;
        i++;
    }
    console.log("prises", prises);
    return {
        prises: prises,
        dist: totDist
    };
}

export { fetchPrisesListe };