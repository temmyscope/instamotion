import { VehicleContextState } from "@/app/lib/types";

const initialState: VehicleContextState = { vehicles: [] }

const vehicleReducer = (prevState = initialState, action: any): VehicleContextState  => {
  switch(action.type) {
    case 'MAKE':
      return { ...prevState,  };
    case 'MODEL':
      return { ...prevState,  };
    case 'MILEAGE':
      return { ...prevState,  };
    case 'POWER':
      return { ...prevState,  };
    case 'FIRST_REG':
      return { ...prevState,  };
    case 'FUEL':
      return { ...prevState,  };
    case 'PRICE':
      return { ...prevState,  };
    case 'GEARBOX':
      return { ...prevState,  };
    case 'EXT_COLOR':
      return { ...prevState,  };
    case 'CATEGORY':
      return { ...prevState,  };
    default:
      return prevState
  }
}

export { vehicleReducer, initialState }