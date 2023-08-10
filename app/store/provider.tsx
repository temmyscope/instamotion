import { VehicleContextState, VehicleMetaDataType } from '@/app/lib/types';
import React, { useEffect, useMemo, useReducer } from 'react';
import { vehicleReducer, initialState } from './reducers/vehicle';
import { getVehichles } from '../(api)/services/vehicle';


type VehicleContextProp = {
  children: React.ReactNode
}

export const VehicleContext = React.createContext<[ 
  VehicleContextState, React.Dispatch<any> 
]>([  { vehicles: [], filtered: [], meta: {} as VehicleMetaDataType, userIsSearching: false }, () => {} ]);

const VehicleContextProvider = ({ children }: VehicleContextProp) => {
  const [vehicleListingState, dispatch] = useReducer(vehicleReducer, initialState);

  useEffect(() => {
    (async() => {
      const data = await getVehichles();
      if (data.vehicles) {
        dispatch({type: 'INITIALISE', payload: { data: data.vehicles, meta: data.meta }})
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