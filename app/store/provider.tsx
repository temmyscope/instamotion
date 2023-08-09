import { VehicleContextState } from '@/app/lib/types';
import React, { useEffect, useMemo, useReducer } from 'react';
import { vehicleReducer, initialState } from './reducers/vehicle';
import { getVehichles } from '../(api)/services/vehicle';


type VehicleContextProp = {
  children: React.ReactNode
}

export const VehicleContext = React.createContext<[ 
  VehicleContextState, React.Dispatch<any> 
]>([  { vehicles: [], filtered: [], userIsSearching: false }, () => {} ]);

const VehicleContextProvider = ({ children }: VehicleContextProp) => {
  const [vehicleListingState, dispatch] = useReducer(vehicleReducer, initialState);

  useEffect(() => {
    (async() => {
      const vehicles = await getVehichles();
      if (vehicles) {
        dispatch({type: 'INITIALISE', data: vehicles})
      }
    })();

    return () => {}
  }, []);  

  return(
    <VehicleContext.Provider value={[vehicleListingState, dispatch]}>
      {children}
    </VehicleContext.Provider>
  )
}

export { VehicleContextProvider }