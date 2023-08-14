import React, { useReducer } from 'react';

import { vehicleReducer, initialState } from '@/app/store/reducers/vehicle';
import { FilterType, VehicleContextState, VehicleMetaDataType } from '@/app/lib/types';

type VehicleContextProp = {
  children: React.ReactNode
}

export const VehicleContext = React.createContext<[ VehicleContextState, React.Dispatch<any> ]>([ 
  { 
    vehicles: [], filtered: [], filters: {} as FilterType,
    meta: {} as VehicleMetaDataType, userIsSearching: false 
  }, 
  () => {} 
]);


/**
 * global context provider for vehicle-related components
 * 
 * @returns 
 */
const VehicleContextProvider = ({ children }: VehicleContextProp) => {
  const [vehicleListingState, dispatch] = useReducer(vehicleReducer, initialState);

  
  return(
    <VehicleContext.Provider value={[vehicleListingState, dispatch]}>
      {children}
    </VehicleContext.Provider>
  )
}

export { VehicleContextProvider }