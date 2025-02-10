import React, {useEffect, useState, useContext} from 'react';
import ReactMapboxGl, { GeoJSONLayer, Marker } from 'react-mapbox-gl';
import startMarqueur from '../assets/marqueur_start.svg';
import endMarqueur from '../assets/marqueur_end.svg';
import priseMarqueur from '../assets/marqueur_prise.svg';
import { fetchRouteGeoJson, fetchPrisesListe, fetchCorrectedRouteGeoJson } from '../lib';
import { SearchContext } from '../globals';
import 'mapbox-gl/dist/mapbox-gl.css';

export function Map() {
    const Map = ReactMapboxGl({
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
        pitchWithRotate: false,
        dragRotate: false,
        refreshExpiredTiles: false
    });
    const { startCoord, endCoord, setDist, setNbCharges } = useContext(SearchContext);
    const [geoJson, setGeoJson] = useState(null);
    const [upGeoJson, setUpGeoJson] = useState(false);
    const [prises, setPrises] = useState([]);

    useEffect(() => {
        if(startCoord && endCoord) {
            fetchRouteGeoJson(startCoord[0], startCoord[1], endCoord[0], endCoord[1]).then(geoJson => {
                setGeoJson(geoJson);
                setUpGeoJson(!upGeoJson);
            });
        }
    }, [startCoord, endCoord]);

    useEffect(() => {
        // if(geoJson) {
        //     fetchPrisesListe(geoJson.features[0].geometry.coordinates, 100)
        //     .then((prises, dist) => {
        //         console.log(prises);
        //         console.log(dist);
        //         setDist(dist);
        //         setPrises(prises);
        //         setNbCharges(prises.length);
        //         let coords = [startCoord];
        //         prises.forEach(prise => {
        //             coords.push([prise.xlongitude, prise.ylatitude]);
        //         });
        //         coords.push(endCoord);
        //         console.log("cords" ,coords);
        //         fetchCorrectedRouteGeoJson(coords)
        //         .then(geoJson => {
        //             console.log("corrected", geoJson);
        //             setGeoJson(geoJson);
        //         });
        //     });
        // }
    }, [upGeoJson, geoJson, startCoord, endCoord, setDist, setNbCharges]);

    return (<Map
    // eslint-disable-next-line
    style="mapbox://styles/mapbox/streets-v9"
    containerStyle={{
        height: '100vh',
        width: '100vw'
    }}
    center={[3.2877,47.3318]}
    zoom={[5]}
    >
        {startCoord && <Marker coordinates={startCoord} anchor="center">
            <img src={startMarqueur} alt="start" className='img-marqueur' />
        </Marker>}
        {endCoord && <Marker coordinates={endCoord} anchor="center">
            <img src={endMarqueur} alt="end" className='img-marqueur' />
        </Marker>}
        {geoJson && <>
            {prises && prises.map((prise, index) => {
                return <Marker key={index} coordinates={[prise.xlongitude, prise.ylatitude]} anchor="center">
                    <img src={priseMarqueur} alt="prise" className='img-marqueur' />
                </Marker>
            })}
            <GeoJSONLayer 
                data={geoJson}
                lineLayout={{
                    'line-cap': 'round',
                    'line-join': 'round'
                }}
            />
        </>}
    </Map>);
}
