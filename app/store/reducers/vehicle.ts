import { FilterType, Vehicle, VehicleContextState, VehicleMetaDataType } from "@/app/lib/types";

const initialState: VehicleContextState = { 
  vehicles: [], meta: {} as VehicleMetaDataType, filtered: [], userIsSearching: false,
  filters: {
    'make': undefined, 'model': undefined, 'mileage': undefined, 'power': undefined, 'reg_year': undefined,
    'fuel': undefined, 'price': undefined, 'gearbox': undefined, 'colour': undefined, 'category': undefined,
  }
}

const filterVehicles = (vehicleData: Array<Vehicle>, filters: FilterType) => {
  if (filters['make'] !== undefined) {
    vehicleData = vehicleData.filter(
      (vehicle) => ((filters['make'] as string).toLowerCase() == vehicle.make.toLowerCase())
    )
  }
  if (filters['model']) {
    vehicleData = vehicleData.filter(
      (vehicle) => ((filters['model'] as string).toLowerCase() == vehicle.model.model.toLowerCase())
    )
  }
  if (filters['power']) {
    vehicleData = vehicleData.filter(
      (vehicle) => ((filters['power']!).min <= vehicle.power) && (vehicle.power <= (filters['power']!).max )
    )
  }
  if (filters['fuel']) {
    vehicleData = vehicleData.filter(
      (vehicle) => ((filters['fuel'] as string).toLowerCase() == vehicle.fuel.toLowerCase())
    )
  }
  if (filters['price']) {
    vehicleData = vehicleData.filter(
      (vehicle) => ((filters['price']!).min <= vehicle.price.price) && (vehicle.price.price <= (filters['price']!).max )
    )
  }
  if (filters['mileage']) {
    vehicleData = vehicleData.filter(
      (vehicle) => ((filters['mileage']!).min <= vehicle.mileage) && (vehicle.mileage <= (filters['mileage']!).max )
    )
  }
  if (filters['reg_year']) {
    vehicleData = vehicleData.filter(
      (vehicle) => (filters['reg_year'] === vehicle.first_registration.year)
    ) 
  }
  if (filters['gearbox']) {
    vehicleData = vehicleData.filter(
      (vehicle) => ((filters['gearbox'] as string).toLowerCase() == vehicle.gearbox.toLowerCase())
    )
  }
  if (filters['colour']) {
    vehicleData = vehicleData.filter(
      (vehicle) => ((filters['colour'] as string).toLowerCase() == vehicle.color.toLowerCase())
    )
  }
  if (filters['category']) {
    vehicleData = vehicleData.filter(
      (vehicle) => ((filters['category'] as string).toLowerCase() == vehicle.category.toLowerCase())
    )
  }
  return vehicleData;
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