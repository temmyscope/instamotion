import { FilterType, VehicleContextState, VehicleMetaDataType } from "@/app/lib/types";
import { filterVehicles } from "@/app/lib/utils";

const initialState: VehicleContextState = { 
  vehicles: [], meta: {} as VehicleMetaDataType, filtered: [], userIsSearching: false,
  filters: {
    'make': undefined, 'model': undefined, 
    'mileage': undefined, 'power': undefined, 
    'regYear': undefined, 'fuel': undefined, 
    'price': undefined, 'gearBox': undefined, 
    'color': undefined, 'category': undefined,
  }
}

const vehicleReducer = (prevState = initialState, action: any): VehicleContextState  => {
  
    const map = new Map([
      ['INITIALISE', () => ({ 
        ...prevState, 
        vehicles: action.payload.data, meta: action.payload.meta,
        filters: {...prevState.filters, ...action.payload.filters}, userIsSearching: true
      })],
      ['UPDATE', () => {
        if (prevState.vehicles.length >= 300) {
          return ({ ...prevState, })
        }
        return ({ 
        ...prevState, meta: action.payload.meta,
        vehicles: [...prevState.vehicles, ...action.payload.data],
        filters: {...prevState.filters, ...action.payload.filters}, userIsSearching: true
        })
      }],
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
        ...prevState, userIsSearching: true, filters: {...prevState.filters, regYear: action.payload.regYear} 
      })],
      ['FILTER_BY_FUEL', () => ({ 
        ...prevState, userIsSearching: true, filters: {...prevState.filters, fuel: action.payload.fuelType} 
      })],
      ['FILTER_BY_GEARBOX', () => ({ 
        ...prevState, userIsSearching: true, filters: {...prevState.filters, gearBox: action.payload.gearBox} 
       })],
      ['FILTER_BY_EXT_COLOR', () => ({ 
        ...prevState, userIsSearching: true, filters: {...prevState.filters, color: action.payload.color} 
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