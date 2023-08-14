import Image from 'next/image';
import { Vehicle } from "@/app/lib/types";
import Label from '@/app/components/commons/label';
import LazyLoad from 'react-lazyload';
import { MouseEvent } from 'react';

export function VehicleTile(
  { vehicle, goTo }: { vehicle: Vehicle, goTo: (e: MouseEvent<HTMLAnchorElement>) => void }
) {
  
  return (
    <a 
      href={`/vehicle/${vehicle.id}`} onClick={goTo}
      className="flex flex-col my-1 items-center justify-evenly h-64 rounded bg-gray-50 dark:bg-gray-800"
    >
      <Image 
        src={vehicle.images[0].url ?? ""} 
        width={'200'} height={'70'} style={{width: '100%', height: '60%', objectFit: 'contain' }}
        alt={`Picture of ${vehicle.make} ${vehicle.model.model} ${vehicle.model.year} ${vehicle.images[0].car_angle}`}
      />
      <div className='flex flex-row flex-wrap items-center'>
        <Label label={vehicle.make} name={'Brand'} id={`vehicle-${vehicle.id}-brand`} />
        <Label label={vehicle.model.model} name={'Model'} id={`vehicle-${vehicle.id}-model`}  />
        <Label label={`${vehicle.mileage}`} name={'Mileage'} id={`vehicle-${vehicle.id}-mileage`}  />
        <Label 
          label={
            `${vehicle.first_registration?.month ?? 'N'}.${vehicle.first_registration?.year ?? 'A'}`
          } name={'First Reg.'} id={`vehicle-${vehicle.id}-first-registration`} 
        />
        <Label label={vehicle.fuel} name={'Fuel ⛽︎'}  id={`vehicle-${vehicle.id}-fuel`}  />
        <Label label={`${vehicle.power}`} name={'Power 🔌'} id={`vehicle-${vehicle.id}-power`}  />
        <Label 
          label={`${vehicle.consumption.combined ?? 'N.A'}`} 
          name={'Comb. Consumption'} id={`vehicle-${vehicle.id}-consumption-comb`} 
        />
        <Label 
          label={`${vehicle.co2.emission ?? 'N.A'}`} name={'CO₂ Emission'} id={`vehicle-${vehicle.id}-emission`} 
        />
      </div>
    </a>
  );
}

export default function LazyVehicleTile(
  { vehicle, goTo }: { vehicle: Vehicle, goTo: (e: MouseEvent<HTMLAnchorElement>) => void }
) {
  
  return (
    <LazyLoad offset={100}>
      <VehicleTile vehicle={vehicle} goTo={goTo} />
    </LazyLoad>
  );
}