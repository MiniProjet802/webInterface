import React from 'react';

export function VehicleCard(props) {


    return (
        <div onClick={(e) => props.onClick(props.data.id)} className="vehicle-card">
            <img src={props.data.media.image.thumbnail_url} alt={props.data.naming.model} />
            <div>
                <h3>{props.data.naming.model}</h3>
                <p>{props.data.naming.make}</p>
            </div>
        </div>
    );
};
