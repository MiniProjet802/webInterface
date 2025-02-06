import React, { createContext } from "react";

const initialSearchContext = {
    startCoord: null,
    setStartCoord: () => {},
    endCoord: null,
    setEndCoord: () => {},
    dist: null,
    setDist: () => {},
    nbCharges: null,
    setNbCharges: () => {}
}

const SearchContext = createContext(initialSearchContext);

export { initialSearchContext, SearchContext };