/**
 * 
 * place all data types here
 */

export interface Vehichle{
  id: string
  images: Array<string>
  make: string
  model: string
  mileage: number
  first_registration: number
  fuel: string
  power: string
  consumption: number
  co2: string
}

export type GetVehicles = () => Promise<Array<Vehichle>>

/**
 * 
 * place all context state types below this line
 */

export interface VehicleContextState { vehicles: Vehichle[] }