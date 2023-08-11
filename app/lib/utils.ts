import { FilterType, Vehicle } from "@/app/lib/types";
import { ReadonlyURLSearchParams } from "next/navigation";

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
      (vehicle) => Number(((filters['power']!).min) <= vehicle.power) && 
      (vehicle.power <= Number((filters['power']!).max) )
    )
  }
  if (filters['fuel']) {
    vehicleData = vehicleData.filter(
      (vehicle) => ((filters['fuel'] as string).toLowerCase() == vehicle.fuel.toLowerCase())
    )
  }
  if (filters['price']) {
    vehicleData = vehicleData.filter(
      (vehicle) => Number(((filters['price']!).min) <= vehicle.price.price) && 
      (vehicle.price.price <= Number((filters['price']!).max ))
    )
  }
  if (filters['mileage']) {
    vehicleData = vehicleData.filter(
      (vehicle) => Number(((filters['mileage']!).min) <= vehicle.mileage) && 
      (vehicle.mileage <= Number((filters['mileage']!).max) )
    )
  }
  if (filters['reg_year']) {
    vehicleData = vehicleData.filter(
      (vehicle) => (Number(filters['reg_year']) === vehicle.first_registration.year)
    ) 
  }
  if (filters['gearbox']) {
    vehicleData = vehicleData.filter(
      (vehicle) => ((filters['gearbox'] as string).toLowerCase() == vehicle.gearbox.toLowerCase())
    )
  }
  if (filters['color']) {
    vehicleData = vehicleData.filter(
      (vehicle) => ((filters['color'] as string).toLowerCase() == vehicle.color.toLowerCase())
    )
  }
  if (filters['category']) {
    vehicleData = vehicleData.filter(
      (vehicle) => ((filters['category'] as string).toLowerCase() == vehicle.category.toLowerCase())
    )
  }
  return vehicleData;
}

export const convertParamToFilters = (
  router: ReadonlyURLSearchParams
) => {
  const filterParam: {[k: string]: string|{min: string, max: string}} = {}
  router.forEach((value: string, key: string) => {
    if (['price', 'power', 'mileage'].includes(key)) { //filters that use to & from range
      let val = value.replace("[", "").replace("]", "").split(",")
      if (val.length === 2) {
        filterParam[key] = {
          min: val[0].replace(" ", ""), max: val[1].replace(" ", "")
        };
      }
      console.log(val);
    }else{
      filterParam[key] = value;
    }
    console.log(`${key}: ${value}`)
  });
  return filterParam;
}
