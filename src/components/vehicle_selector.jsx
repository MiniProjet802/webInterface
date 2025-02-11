import React, { useEffect, useState } from 'react';
import { fetchVehicleDetails, fetchVehicleListe } from '../lib';
import { VehicleCard, VehicleDetail, HideButton } from './';

export function VehicleSelector() {
    // eslint-disable-next-line
    const [vehicleListe, setVehicleListe] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [isVehicleSelected, setIsVehicleSelected] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        fetchVehicleListe(0, 100)
            .then(data => {
                console.log(data);
                setVehicleListe(data);
            });
    }, []);

    const vehicleSelected = (id) => {
        fetchVehicleDetails(id)
            .then(data => {
                console.log(data);
                setSelectedVehicle(data.vehicle);
                setIsVehicleSelected(true);
            });
    }

    const toggleHide = () => {
        setIsHidden(!isHidden);
    }

    const quit = () => {
        setIsVehicleSelected(false);
    }

    return (
        <div id="vehicle-selector">
            { isVehicleSelected && selectedVehicle && <>
                <span className='vehicle-selector-title'>
                    <div style={{display: isHidden?"none":"block"}}
                        onClick={quit}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                    </div>
                    <h1 style={{flex: 2, display: isHidden?"none":"block"}}>Vehicle Detail</h1>
                    <HideButton isHidden={isHidden} onClick={toggleHide}/>
                </span>
                <VehicleDetail
                    isHidden={isHidden}
                    data={selectedVehicle}
                />
            </>}
            {!isVehicleSelected && vehicleListe && <>
                <span className='vehicle-selector-title'>
                    <div style={{display: isHidden?"none":"block"}}></div>
                    <h1 style={{flex: 2, display: isHidden?"none":"block"}}>Vehicle Detail</h1>
                    <HideButton isHidden={isHidden} onClick={toggleHide}/>
                </span>
                <div className='vehicle-liste' style={{display: isHidden?"none":"block"}}>
                    {vehicleListe.map((vehicle, index) => (
                        <VehicleCard 
                            key={index}
                            data={vehicle}
                            onClick={vehicleSelected}
                        />
                    ))}
                </div>
            </>}
        </div>
    );
};
