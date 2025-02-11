import React from 'react'
import { fetchTrajetPredictionRest } from '../lib'
import { SearchContext } from '../globals'

export function TrajetPrediction(props){
    const { dist, nbCharges } = React.useContext(SearchContext)
    const [time, setTime] = React.useState(null)

    React.useEffect(() => {
        // TODO
        let chargetime = 0;
        for(const key in props.chargeTimeDic){
            chargetime += props.chargeTimeDic[key];
        }
        if(props.chargeTimeDic.length > 0){
            chargetime /= props.chargeTimeDic.length;
        }
        fetchTrajetPredictionRest(dist, props.speed, chargetime, nbCharges)
        .then(resp => {
            console.log(resp);
            setTime(resp["time-pred"]);
        })
        .catch(err => 
            console.log(err)
        )
    }, [props, dist, nbCharges])

    return (<div className='vehicle-detail-info-container'>
        <h3>Prediction</h3>
        {!!time && <span className='vehicle-detail-info-item'><p>Durée du trajet : </p><p className='vehicle-detail-info-value'>{Math.floor(time / 3600)}h{Math.floor((time % 3600) / 60)}</p></span>}
        {!time && <span className='Vehicle-detail-info-item'><p>Séléctionnez un trajet</p></span>}
    </div>)
}