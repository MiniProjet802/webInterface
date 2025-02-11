import React, { useEffect, useState } from 'react';
import { TrajetPrediction } from './trajet_prediction';

export function VehicleDetail(props) {
    const [chargeTimeDic, setChargeTimeDic] = useState(null);

    useEffect(() => {
        if(props.data && props.data.connectors) {
            let chargeTimeDic = {};
            props.data.connectors.forEach(connector => {
                chargeTimeDic[connector.standard] = connector.time;
            });
            setChargeTimeDic(chargeTimeDic);
        }
    }, [props]);


    return (
        <div className="vehicle-detail" style={{display: props.isHidden?"none":"block"}}>
            <div className='vehicle-detail-img-container'>
                <img className='vehicle-detail-img' src={props.data.media.image.url} alt={props.data.naming.model} />
                <div className='vehicle-detail-brand'>
                    <img src={props.data.media.brand.thumbnail_url} alt={props.data.naming.make} />
                </div>
            </div>
            <div className='vehicle-detail-info'>
                <div className='vehicle-detail-info-container'>
                    <h2>{props.data.naming.model} {props.data.naming.make}</h2>
                    <p>{props.data.naming.chargetrip_version}</p>
                </div>
                <TrajetPrediction
                    speed={props.data.performance.top_speed}
                    chargeTimeDic={chargeTimeDic}
                />
                <div className='vehicle-detail-info-container'>
                    <h3>Autonomie</h3>
                    <table className='range-table'>
                        <thead>
                            <tr>
                                <th scope='col'>Situation</th>
                                <th scope='col'>Mauvaise (10°C)</th>
                                <th scope='col'>Moyenne (23°C)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Autoroute</th>
                                <td>{props.data.range.worst.highway} km</td>
                                <td>{props.data.range.best.highway} km</td>
                            </tr>
                            <tr>
                                <th scope="row">Ville</th>
                                <td>{props.data.range.worst.city} km</td>
                                <td>{props.data.range.best.city} km</td>
                            </tr>
                            <tr>
                                <th scope="row">Moyenne</th>
                                <td>{props.data.range.worst.combined} km</td>
                                <td>{props.data.range.best.combined} km</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='vehicle-detail-info-container'>
                    <h3>Connecteur</h3>
                    <span className='vehicle-detail-info-item'><p>Supporte la charge rapide : </p><p className='vehicle-detail-info-value'>{props.data.routing.fast_charging_support ? "oui" : "non"}</p></span>
                    <div className='vehicle-detail-info-item-list'><p>Type de prises :</p><div>{props.data.connectors.map((connector, i) => <p key={i} className='vehicle-detail-info-value'>{connector.standard}</p>)}</div></div>
                </div>
                <div className='vehicle-detail-info-container'>
                    <h3>Performance</h3>
                    <span className='vehicle-detail-info-item'><p>Usable kWh: </p><p className='vehicle-detail-info-value'>{props.data.battery.usable_kwh}</p></span>
                    <span className='vehicle-detail-info-item'><p>Acceleration: </p><p className='vehicle-detail-info-value'>{props.data.performance.acceleration} s</p></span>
                    <span className='vehicle-detail-info-item'><p>Vitesse Max: </p><p className='vehicle-detail-info-value'>{props.data.performance.top_speed} km/h</p></span>
                </div>
            </div>
        </div>
    );
};
