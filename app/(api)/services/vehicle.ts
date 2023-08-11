import { requests } from "@/app/(api)/api";
import { GetVehicles, Vehicle, VehicleMetaDataType } from "@/app/lib/types";

/**
 * modifies retrieved items into useable item
 * @param data 
 * @returns {Vehicle}
 */
const vehicleFeatureAdapter = (data: any): Vehicle => {
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
    gearbox: data.drivetrain?.transmission_type ?? '',
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
    category: data.category,
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
    [], 
    [ErrorResponseInterceptor], 
    'https://run.mocky.io/v3/e7d5a5aa-8bdf-4a36-b6ab-134c08df916b'
  );

  return api.get('/').then(
    data => {
      if (data['records'] && data['records']?.length > 0) {
        let VehicleMetaData: VehicleMetaDataType = {
           'make': {} as {[key: string]: Set<string>}, 'first_reg': new Set<number>(),
          'color': new Set(), 'fuel': new Set(), 'gearbox': new Set(), 'categories': new Set(),
        };

        let formattedData = (data['records'] as Array<any>).map(
          vehicle => { 
            let vf = vehicleFeatureAdapter(vehicle);
            VehicleMetaData = getVehichleMetaData(vf, VehicleMetaData);
            return vf;
          }
        );
        // console.log(data['records']);
        return { vehicles: formattedData, meta: VehicleMetaData};
      }
      return { vehicles: [], meta: {} as VehicleMetaDataType };
    }
  );
}


export const getVehichleMetaData = (vf: Vehicle, VehicleMetaData: VehicleMetaDataType) => {
  VehicleMetaData['categories'].add(vf.category);
  VehicleMetaData['make'][vf.make] = VehicleMetaData['make'][vf.make]?.add(
    vf.model.model
  ) ?? new Set([vf.model.model]);
  VehicleMetaData['fuel'] = VehicleMetaData['fuel'].add(vf.fuel);
  VehicleMetaData['color'] = VehicleMetaData['color'].add(vf.color);
  if (vf.first_registration.year) {
    VehicleMetaData['first_reg'] = VehicleMetaData['first_reg'].add(vf.first_registration.year);
  }
  VehicleMetaData['gearbox'] = VehicleMetaData['gearbox'].add(vf.gearbox);

  return VehicleMetaData;
}