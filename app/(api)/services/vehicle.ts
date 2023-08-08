import { requests } from "@/app/(api)/api";
import { GetVehicles, Vehichle } from "@/app/lib/types";


const vehicleFeatureAdapter = (data: any): Vehichle => {
  let month = null, year = null;
  
  if (data.vehicle_history.reg_date) {
    [month, year] = (data.vehicle_history.reg_date as string).split('.', 2).map(
      value => Number(value)
    );
  }

  return ({
    id: data.id,
    co2: {
      class: data.environment.pollutant,
      emission: data.environment.emission
    },
    color: data.color,
    make: data.brand,
    fuel: data.drivetrain.fuel.type,
    model: {
      model: data.model,
      detail: data.model_text_extended,
      year: data.model_year
    },
    power: data.performance,
    price: { 
      price: data.price_data.price, 
      currency: data.price_data.currency 
    },
    images: data.media.final,
    mileage: data.kilometer,
    consumption: {
      unit: data.drivetrain.consumption.unit,
      combined:  data.drivetrain.consumption.consumption_combined,
    },
    first_registration: { month, year },
  });
}

const ErrorResponseInterceptor = (res: Response) => {
  if (!res.ok) {
    throw new Error("Error: I can do anything to global state and determine error view here");
  }
  return res;
}

export const getVehichles: GetVehicles = async() => {

  const api = requests(
    [], [ErrorResponseInterceptor], 'https://run.mocky.io/v3/e7d5a5aa-8bdf-4a36-b6ab-134c08df916b'
  );

  return api.get('/').then(
    data => {
      if (data['records'] && data['records']?.length > 0) {
        return (data['records'] as Array<any>).map(vehicle => vehicleFeatureAdapter(vehicle));
      }
      return [];
    }
  );
}