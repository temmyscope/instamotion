import { VehicleContextState, VehicleMetaDataType } from "@/app/lib/types";

const initialState: VehicleContextState = { 
  vehicles: [], meta: {} as VehicleMetaDataType, filtered: [], userIsSearching: false 
}

const vehicleReducer = (prevState = initialState, action: any): VehicleContextState  => {
    const map = new Map([
      ['INITIALISE', () => ({ 
        ...prevState, vehicles: action.payload.data, meta: action.payload.meta 
      })],
      ['FILTER_BY_MAKE', () => ({ ...prevState, userIsSearching: true, filtered: prevState.vehicles.filter(
        (vehicle) => ((action.payload.maker as string).toLowerCase() == vehicle.make.toLowerCase())
      ) })],
      ['FILTER_BY_MODEL', () => ({ ...prevState, userIsSearching: true, filtered: prevState.vehicles.filter(
        (vehicle) => ((action.payload.model as string).toLowerCase() == vehicle.model.model.toLowerCase())
      ) })],
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
      ['FILTER_BY_FIRST_REG', () => ({ 
        ...prevState, userIsSearching: true, filtered: prevState.vehicles.filter(
          (vehicle) => (action.payload.registration == vehicle.first_registration.year)
        ) 
      })],
      ['FILTER_BY_FUEL', () => ({ ...prevState, userIsSearching: true, filtered: prevState.vehicles.filter(
        (vehicle) => ((action.payload.fuelType as string).toLowerCase() === vehicle.fuel.toLowerCase())
      ) })],
      ['FILTER_BY_PRICE', () => ({ 
        ...prevState, userIsSearching: true, filtered: prevState.vehicles.filter(
          (vehicle) => (action.payload.min <= vehicle.price.price) && (vehicle.price.price <= action.payload.max )
        ) 
      })],
      ['FILTER_BY_GEARBOX', () => ({ ...prevState, userIsSearching: true, filtered: prevState.vehicles.filter(
        (vehicle) => ((action.payload.gearBox as string).toLowerCase() === vehicle.gearbox.toLowerCase())
      ) })],
      ['FILTER_BY_EXT_COLOR', () => ({ 
        ...prevState, userIsSearching: true, filtered: prevState.vehicles.filter(
          (vehicle) => (action.payload.color as string).toLowerCase() === (vehicle?.color ?? '').toLowerCase()
        )
      })],
      ['FILTER_BY_CATEGORY', () => ({ ...prevState, userIsSearching: true, filtered: prevState.vehicles.filter(
        (vehicle) => ((action.payload.category as string).toLowerCase() === vehicle.category.toLowerCase())
      ) })],
    ]);

    let stateData = map.get(action.type);

    return stateData? stateData() : prevState;
}

export { vehicleReducer, initialState }