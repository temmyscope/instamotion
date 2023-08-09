/**
 * 
 * place all data types here
 */

export type Image = {
  url: string
  car_angle: string
}

export interface Vehicle{
  id: string
  images: Array<Image>
  make: string
  model: {
    model: string
    detail: string
    year: number
  }
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

export type GetVehicles = () => Promise<Array<Vehicle>>

/**
 * 
 * place all context state types below this line
 */

export interface VehicleContextState { vehicles: Vehicle[], filtered: Vehicle[], userIsSearching: boolean }