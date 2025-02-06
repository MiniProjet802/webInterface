import React, { useState } from 'react';
import { Map, SearchBar, VehicleSelector } from './components';
import { SearchContext, initialSearchContext } from './globals';
import './App.css';

function App() {
  const [startCoord, setStartCoord] = useState(initialSearchContext.startCoord);
  const [endCoord, setEndCoord] = useState(initialSearchContext.endCoord);
  const [dist, setDist] = useState(initialSearchContext.dist);
  const [nbCharges, setNbCharges] = useState(initialSearchContext.nbCharges);

  return (
    <div className="App">
      <SearchContext.Provider value={{ startCoord, setStartCoord, endCoord, setEndCoord, dist, setDist, nbCharges, setNbCharges }}>
        <VehicleSelector />
        <SearchBar />
        <Map />
      </SearchContext.Provider>
    </div>
  );
}

export default App;
