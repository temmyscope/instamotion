import { FilterType, Vehicle } from "@/app/lib/types"

export const filterVehicles = (vehicleData: Array<Vehicle>, filters: FilterType) => {
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

export const callFilterFromQuery = (query: any) => {

}