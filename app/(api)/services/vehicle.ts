"use client";
import { requests } from "@/app/(api)/api";
import { GetVehicles, Vehichle } from "@/app/lib/types";


const vehicleAdapter = (data: any): Vehichle => {

  return ({
    id: data.id,
    co2: data.id,
    make: data.id,
    fuel: data.id,
    model: data.id,
    power: data.id,
    images: [data.id],
    mileage: data.id,
    consumption: data.id,
    first_registration: data.id,
  });
}

const ErrorResponseInterceptor = (res: Response) => {
  if (!res.ok) {
    throw new Error("Error");
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
        console.log(data['records'])
        return (data['records'] as Array<any>).map(datum => vehicleAdapter(datum));
      }
      return [];
    }
  );
}