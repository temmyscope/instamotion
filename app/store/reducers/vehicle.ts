import { VehicleContextState } from "@/app/lib/types";

const initialState: VehicleContextState = { vehicles: [], filtered: [], userIsSearching: false }

const vehicleReducer = (prevState = initialState, action: any): VehicleContextState  => {
  switch(action.type) {
    case 'INITIALISE':
      return { ...prevState, vehicles: action.data };
    case 'FILTER_BY_MAKE':
      return { ...prevState, userIsSearching: true,  };
    case 'FILTER_BY_MODEL':
      return { ...prevState, userIsSearching: true,  };
    case 'FILTER_BY_MILEAGE':
      return { 
        ...prevState, filtered: prevState.vehicles.filter(
          (vehicle) => (action.payload.min <= vehicle.mileage) && (vehicle.mileage <= action.payload.max )
        )
      };
    case 'FILTER_BY_POWER':
      return { 
        ...prevState, userIsSearching: true, filtered: prevState.vehicles.filter(
          (vehicle) => (action.payload.min <= Number(vehicle.power)) && (Number(vehicle.power) <= action.payload.max)
        )
      };
    case 'FILTER_BY_FIRST_REG':
      return { ...prevState, userIsSearching: true,  };
    case 'FILTER_BY_FUEL':
      return { ...prevState,  };
    case 'FILTER_BY_PRICE':
      return { 
        ...prevState, userIsSearching: true, filtered: prevState.vehicles.filter(
          (vehicle) => (action.payload.min <= vehicle.price.price) && (vehicle.price.price <= action.payload.max )
        ) 
      };
    case 'FILTER_BY_GEARBOX':
      return { ...prevState, userIsSearching: true,  };
    case 'FILTER_BY_EXT_COLOR':
      return { 
        ...prevState, userIsSearching: true, filtered: prevState.vehicles.filter(
          (vehicle) => (action.payload.color as string).toLowerCase() === (vehicle?.color ?? '').toLowerCase()
        )
      };
    case 'FILTER_BY_CATEGORY':
      return { ...prevState, userIsSearching: true,  };
    default:
      return prevState
  }
}

export { vehicleReducer, initialState }