import { FilterType, VehicleContextState, VehicleMetaDataType } from "@/app/lib/types";
import { filterVehicles } from "@/app/lib/utils";

const initialState: VehicleContextState = { 
  vehicles: [], meta: {} as VehicleMetaDataType, filtered: [], userIsSearching: false,
  filters: {
    'make': undefined, 'model': undefined, 'mileage': undefined, 'power': undefined, 'reg_year': undefined,
    'fuel': undefined, 'price': undefined, 'gearbox': undefined, 'colour': undefined, 'category': undefined,
  }
}

const vehicleReducer = (prevState = initialState, action: any): VehicleContextState  => {
  
    const map = new Map([
      ['INITIALISE', () => ({ 
        ...prevState, vehicles: action.payload.data, meta: action.payload.meta,
      })],
      ['DUMMY_UPDATE', () => ({ 
        ...prevState, vehicles: [...prevState.vehicles, action.payload.data]
      })],
      ['FILTER_BY_MAKE', () => ({ 
        ...prevState, userIsSearching: true, filters: {...prevState.filters, make: action.payload.make} 
      })],
      ['FILTER_BY_MODEL', () => ({ 
        ...prevState, userIsSearching: true, filters: {...prevState.filters, model: action.payload.model} 
      })],
      ['FILTER_BY_MILEAGE', () => ({ 
        ...prevState, userIsSearching: true, filters: {...prevState.filters, mileage: action.payload} 
      })],
      ['FILTER_BY_POWER', () => ({ 
        ...prevState, userIsSearching: true, filters: {...prevState.filters, power: action.payload} 
      })],
      ['FILTER_BY_PRICE', () => ({ 
        ...prevState, userIsSearching: true, filters: {...prevState.filters, price: action.payload} 
      })],
      ['FILTER_BY_FIRST_REG', () => ({ 
        ...prevState, userIsSearching: true, filters: {...prevState.filters, reg_year: action.payload.registration} 
      })],
      ['FILTER_BY_FUEL', () => ({ 
        ...prevState, userIsSearching: true, filters: {...prevState.filters, fuel: action.payload.fuelType} 
      })],
      ['FILTER_BY_GEARBOX', () => ({ 
        ...prevState, userIsSearching: true, filters: {...prevState.filters, gearbox: action.payload.gearBox} 
       })],
      ['FILTER_BY_EXT_COLOR', () => ({ 
        ...prevState, userIsSearching: true, filters: {...prevState.filters, colour: action.payload.color} 
      })],
      ['FILTER_BY_CATEGORY', () => ({ 
        ...prevState, userIsSearching: true, filters: {...prevState.filters, category: action.payload.category} 
      })],
      ['UNDO_THIS_FILTER', () => ({ 
        ...prevState, userIsSearching: true, filters: {...prevState.filters, [action.payload.filter]: undefined}
      })],
      ['UNDO_ALL_FILTERS', () => ({ 
        ...prevState, userIsSearching: true, filters: {} as FilterType
      })],
    ]);

    let stateData = map.get(action.type);
    if (['INITIALISE', 'DUMMY_UPDATE'].includes(action.type)) {
      return stateData!();
    }

    //where the filtering actually happens
    if (stateData) {
      let updatedState = stateData();
      return { 
        ...stateData(), filtered: filterVehicles(updatedState.vehicles, updatedState.filters)
      };
    }
    return prevState;
}

export { vehicleReducer, initialState }