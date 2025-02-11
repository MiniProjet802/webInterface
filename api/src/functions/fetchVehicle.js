const { app } = require('@azure/functions');
const { createClient, fetchExchange, cacheExchange } = require('urql');
const { gql } = require('graphql-tag');
require('dotenv').config();

const headers = {
    'x-client-id': process.env.CHARGETRIP_CLIENT_ID,
    'x-app-id': process.env.CHARGETRIP_APP_ID,
};

const client = createClient({
    url: 'https://api.chargetrip.io/graphql',
    fetchOptions: {
        method: 'POST',
        headers,
    },
    exchanges: [cacheExchange, fetchExchange],
});

const vehicleListQuery = gql`
query vehicleList($page: Int, $size: Int, $search: String) {
  vehicleList(
    page: $page, 
    size: $size, 
    search: $search, 
    ) {
      id
      naming {
        make
        model
        }
        media {
          image {
            thumbnail_url
            }
            }
            }
            }
`;

const VehicleDetailsQuery = gql`
query vehicle($vehicleId: ID!) {
  vehicle(id: $vehicleId) {
    naming {
      make
      model
      chargetrip_version
    }
    connectors {
      standard
      time
    }
    media {
      image {
        url
      }
      brand {
        thumbnail_url
      }
    }
    battery {
      usable_kwh
    }
    range {
      best {
        highway
        city
        combined
      }
      worst {
        highway
        city
        combined
      }
      chargetrip_range {
        best
        worst
      }
    }
    routing {
      fast_charging_support
    }
    connectors {
      standard
    }
    performance {
      acceleration
      top_speed
    }
  }
}`;

async function getVehicleList(page, size = 10, search = ''){
    return await client
        .query(vehicleListQuery, { page, size, search })
        .toPromise()
        .then(response => {
        console.log("resp liste", response);
            return response.data.vehicleList;
        })
        .catch(error => console.log(error));
};

async function getVehicleDetails(vehicleId){
    return await client
        .query(VehicleDetailsQuery, { vehicleId })
        .toPromise()
        .then(response => {
            console.log("resp detail", response);
            return response.data;
        })
        .catch(error => console.log(error));
}

app.http('vehicleListe', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'vehicles/list',
    handler: async (req, context) => {
        console.log(req.query);
        
        const page = req.query.get('page');
        const size = req.query.get('size');
        const search = req.query.get('search');
        console.log(page, size, search);

        const data = await getVehicleList(parseInt(page), parseInt(size), search);
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

app.http('vehicleDetails', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'vehicles/details/{vehicleId}',
    handler: async (req, context) => {
        const vehicleId = req.params.vehicleId;
        console.log("vehicleId", vehicleId);
        const data = await getVehicleDetails(vehicleId);
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
