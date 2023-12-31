/**
 * 
 * place all data types here
 */

export type Image = {
  url: string
  car_angle: string
}

export type Vehicle = {
  id: string
  images: Array<Image>
  make: string
  model: {
    model: string
    detail: string
    year: number
  }
  gearbox: string
  category: string,
  mileage: number
  first_registration: {
    month: number|null
    year: number|null
  }
  fuel: string
  power: number
  price: { 
    price: number
    currency: string
  }
  consumption: {
    unit: string
    combined:  number|null
  }
  co2: {
    class: string
    emission: number|null
  }
  color: string
}

export type VehicleMetaDataType = {
  categories: Set<string>
  color: Set<string>
  make: {[key: string]: Set<string>}
  fuel: Set<string>
  gearBox: Set<string>
  firstReg: Set<number>
}

export type FilterType = {
  make: string|undefined
  model: string|undefined
  mileage: {min: number, max: number}|undefined
  power: {min: number, max: number}|undefined
  regYear: number|undefined
  fuel: string|undefined
  price: {min: number, max: number}|undefined
  gearBox: string|undefined
  color: string|undefined
  category: string|undefined
}

export type GetVehicles = () => Promise<{ vehicles: Array<Vehicle>, meta: VehicleMetaDataType}>

export type VehicleContextState = { 
  vehicles: Vehicle[] 
  meta: VehicleMetaDataType,
  filtered: Vehicle[] 
  userIsSearching: boolean 
  filters: FilterType
}