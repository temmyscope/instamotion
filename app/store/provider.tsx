import { VehicleContextState } from '@/app/lib/types';
import React, { useEffect, useMemo, useReducer } from 'react';
import { vehicleReducer, initialState } from './reducers/vehicle';


type VehicleContextProp = {
  children: React.ReactNode
}

export const VehicleContext = React.createContext<[ VehicleContextState, React.Dispatch<any> ]>([  { vehicles: [] }, () => {} ]);

const VehicleContextProvider = ({ children }: VehicleContextProp) => {
  const [vehicleListingState, dispatch] = useReducer(vehicleReducer, initialState);


  return(
    <VehicleContext.Provider value={[vehicleListingState, dispatch]}>
      {children}
    </VehicleContext.Provider>
  )
}

export { VehicleContextProvider }