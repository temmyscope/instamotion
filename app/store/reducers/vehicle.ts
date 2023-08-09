import { VehicleContextState } from "@/app/lib/types";

const initialState: VehicleContextState = { vehicles: [] }

const vehicleReducer = (prevState = initialState, action: any): VehicleContextState  => {
  switch(action.type) {
    case 'INITIALISE':
      return { ...prevState, vehicles: action.data };
    case 'FILTER_BY_MAKE':
      return { ...prevState,  };
    case 'FILTER_BY_MODEL':
      return { ...prevState,  };
    case 'FILTER_BY_MILEAGE':
      return { ...prevState,  };
    case 'FILTER_BY_POWER':
      return { ...prevState,  };
    case 'FILTER_BY_FIRST_REG':
      return { ...prevState,  };
    case 'FILTER_BY_FUEL':
      return { ...prevState,  };
    case 'FILTER_BY_PRICE':
      return { ...prevState,  };
    case 'FILTER_BY_GEARBOX':
      return { ...prevState,  };
    case 'FILTER_BY_EXT_COLOR':
      return { ...prevState,  };
    case 'FILTER_BY_CATEGORY':
      return { ...prevState,  };
    default:
      return prevState
  }
}

export { vehicleReducer, initialState }