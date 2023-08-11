import { FilterType, Vehicle, VehicleContextState, VehicleMetaDataType } from '@/app/lib/types';
import React, { useEffect, useMemo, useReducer } from 'react';
import { vehicleReducer, initialState } from './reducers/vehicle';
import { getVehichles } from '../(api)/services/vehicle';


type VehicleContextProp = {
  children: React.ReactNode
}

export const VehicleContext = React.createContext<[ 
  VehicleContextState, React.Dispatch<any> 
]>([ 
  { 
    vehicles: [], filtered: [], filters: {} as FilterType,
    meta: {} as VehicleMetaDataType, userIsSearching: false 
  }, 
  () => {} 
]);

const VehicleContextProvider = ({ children }: VehicleContextProp) => {
  const [vehicleListingState, dispatch] = useReducer(vehicleReducer, initialState);

  useEffect(() => {
    (async() => {
      const data = await getVehichles();
      if (data.vehicles) {
        let vehicleData: Array<Vehicle> = [];
        // increase number of retrieved items by iteratively incrementing it
        for (let index = 0; index < 30; index++) {  
          vehicleData = [ ...vehicleData, ...data.vehicles ];
        }
        dispatch({type: 'INITIALISE', payload: { data: vehicleData, meta: data.meta }})
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