function makeUrlListe(page, size, search = "") {
    return `http://localhost:7071/api/vehicles/list?page=${page}&size=${size}&search=${search}`;
}

function makeUrlDetails(id) {
    return `http://localhost:7071/api/vehicles/details/${id}`;
}

async function fetchVehicleListe(page, size, search = "") {
    return await fetch(makeUrlListe(page, size, search))
        .then(response => response.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            console.log(err);
        });
}

async function fetchVehicleDetails(id) {
    return await fetch(makeUrlDetails(id))
        .then(response => response.json())
        .then(json => {
            return json;
        })
        .catch(err => {
            console.log(err);
        });
}

export { fetchVehicleListe, fetchVehicleDetails };