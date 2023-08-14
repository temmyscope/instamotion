import { GetVehicles, Vehicle, VehicleMetaDataType } from "@/app/lib/types";

/**
 * modifies retrieved items into useable data for this usecase
 * @param data 
 * @returns {Vehicle}
 */
export const adaptVehicleFeatures = (data: any): Vehicle => {
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


/**
 * retrieves vehicle data from api
 * @returns  {Promise<{vehicles: Array<Vehicle>, meta: VehicleMetaDataType}>}
 */
export const getVehicles: GetVehicles = async() => {

  return fetch(`https://run.mocky.io/v3/e7d5a5aa-8bdf-4a36-b6ab-134c08df916b`, {
    method: 'GET', headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    },
  }).then((res) => res.json()).then((data) => {
    if (data['records'] && data['records']?.length > 0) {
      // console.log(data['records']);
      return responseProcessor(data['records']);
    }
    return { vehicles: [], meta: {} as VehicleMetaDataType };
  });
}

/**
 * processes api response and makes sense of the data
 * @param {Array<any>} data 
 * @returns 
 */
export const responseProcessor = (data: Array<any>) => {
  let VehicleMetaData: VehicleMetaDataType = {
    'make': {} as {[key: string]: Set<string>}, 'firstReg': new Set<number>(),
    'color': new Set(), 'fuel': new Set(), 'gearBox': new Set(), 'categories': new Set(),
  };

  let formattedData = data.map(
    vehicle => { 
      let vf = adaptVehicleFeatures(vehicle);
      VehicleMetaData = getVehichleMetaData(vf, VehicleMetaData);
      return vf;
    }
  );
  return { vehicles: formattedData, meta: VehicleMetaData};
}

/**
 * extract metadata and grouping info from vehicle data
 * 
 * @param {Vehicle} vf 
 * @param {VehicleMetaDataType} VehicleMetaData 
 * @returns {VehicleMetaDataType}
 */
export const getVehichleMetaData = (vf: Vehicle, VehicleMetaData: VehicleMetaDataType) => {
  VehicleMetaData['categories'].add(vf.category);
  VehicleMetaData['make'][vf.make] = VehicleMetaData['make'][vf.make]?.add(
    vf.model.model
  ) ?? new Set([vf.model.model]);
  VehicleMetaData['fuel'] = VehicleMetaData['fuel'].add(vf.fuel);
  if (vf.color) {
    VehicleMetaData['color'] = VehicleMetaData['color'].add(vf.color);
  }
  if (vf.first_registration.year) {
    VehicleMetaData['firstReg'] = VehicleMetaData['firstReg'].add(vf.first_registration.year);
  }
  VehicleMetaData['gearBox'] = VehicleMetaData['gearBox'].add(vf.gearbox);

  return VehicleMetaData;
}