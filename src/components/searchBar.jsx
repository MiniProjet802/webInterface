import React, {useContext} from 'react';
import { SearchContext } from '../globals';
import { SearchBox } from '@mapbox/search-js-react';

export function SearchBar() {
    const { setStartCoord, setEndCoord } = useContext(SearchContext);
    
    const onChange = (result, isStart) => {
        if (result.features && result.features.length > 0) {
            if(isStart) {
                setStartCoord(result.features[0].geometry.coordinates);
            } else {
                setEndCoord(result.features[0].geometry.coordinates);
            }
        } else {
            console.error("No features found in the result");
        }
    }

    return (<div id="searchBar">
        <div className='search-item'>
            <p>Depart : </p>
            <SearchBox
                id="startSearch"
                accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                options={{
                    language: 'fr',
                    country: 'FR'
                }}
                onRetrieve={(e) => onChange(e, true)}
            />
        </div>
        <div className='search-item'>
            <p>Arrivé : </p>
            <SearchBox
                id="startSearch"
                accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                options={{
                    language: 'fr',
                    country: 'FR'
                }}
                onRetrieve={(e) => onChange(e, false)}
            />
        </div>
    </div>);
}
