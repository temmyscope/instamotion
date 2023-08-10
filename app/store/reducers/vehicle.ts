import { VehicleContextState, VehicleMetaDataType } from "@/app/lib/types";

const initialState: VehicleContextState = { 
  vehicles: [], meta: {} as VehicleMetaDataType, filtered: [], userIsSearching: false 
}

const vehicleReducer = (prevState = initialState, action: any): VehicleContextState  => {
    const map = new Map([
      ['INITIALISE', () => ({ ...prevState, vehicles: action.payload.data, meta: action.payload.meta })],
      ['FILTER_BY_MAKE', () => ({ ...prevState, userIsSearching: true,  })],
      ['FILTER_BY_MODEL', () => ({ ...prevState, userIsSearching: true,  })],
      ['FILTER_BY_MILEAGE', () => ({ 
        ...prevState, filtered: prevState.vehicles.filter(
          (vehicle) => (action.payload.min <= vehicle.mileage) && (vehicle.mileage <= action.payload.max )
        )
      })],
      ['FILTER_BY_POWER', () => ({ 
        ...prevState, userIsSearching: true, filtered: prevState.vehicles.filter(
          (vehicle) => (action.payload.min <= Number(vehicle.power)) && (Number(vehicle.power) <= action.payload.max)
        )
      })],
      ['FILTER_BY_FIRST_REG', () => ({ ...prevState, userIsSearching: true,  })],
      ['FILTER_BY_FUEL', () => ({ ...prevState,  })],
      ['FILTER_BY_PRICE', () => ({ 
        ...prevState, userIsSearching: true, filtered: prevState.vehicles.filter(
          (vehicle) => (action.payload.min <= vehicle.price.price) && (vehicle.price.price <= action.payload.max )
        ) 
      })],
      ['FILTER_BY_GEARBOX', () => ({ ...prevState, userIsSearching: true,  })],
      ['FILTER_BY_EXT_COLOR', () => ({ 
        ...prevState, userIsSearching: true, filtered: prevState.vehicles.filter(
          (vehicle) => (action.payload.color as string).toLowerCase() === (vehicle?.color ?? '').toLowerCase()
        )
      })],
      ['FILTER_BY_CATEGORY', () => ({ ...prevState, userIsSearching: true,  })],
    ]);
    let stateData = map.get(action.type);
    
    return stateData? stateData() : prevState;
}

export { vehicleReducer, initialState }