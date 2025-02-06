import React from 'react'
import { fetchTrajetPrediction } from '../lib'
import { SearchContext } from '../globals'

export function TrajetPrediction(props){
    const { dist, nbCharge } = React.useContext(SearchContext)
    const [time, setTime] = React.useState(null)

    React.useEffect(() => {
        // TODO
        let chargetime = 0;
        for(const key in props.chargeTimeDic){
            chargetime += props.chargeTimeDic[key];
        }
        chargetime /= props.chargeTimeDic.length;
        fetchTrajetPrediction(dist, props.speed, chargetime, nbCharge)
        .then(resp => {
            console.log(resp);
            setTime(resp["time-pred"]);
        })
        .catch(err => 
            console.log(err)
        )
    })

    return (<div className='vehicle-detail-info-container'>
        <h3>Prediction</h3>
        {!!time && <span className='vehicle-detail-info-item'><p>Durée du trajet : </p><p className='vehicle-detail-info-value'>{Math.floor(time / 3600)}h{Math.floor((time % 3600) / 60)}</p></span>}
    </div>)
}