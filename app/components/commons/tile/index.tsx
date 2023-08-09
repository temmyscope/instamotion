import Image from 'next/image';
import { Vehichle } from "@/app/lib/types";
import Label from '@/app/components/commons/label';

export default function VehicleTile({ vehicle }: { vehicle: Vehichle }) {
  
  return (
    <a href={`/vehicle/${vehicle.id}`} className="flex flex-col my-1 items-center justify-evenly h-64 rounded bg-gray-50 dark:bg-gray-800">
      <Image 
        src={vehicle.images[0].url ?? ""} 
        width={'200'} height={'70'} style={{width: '100%', height: '60%', objectFit: 'contain' }}
        alt={`Picture of ${vehicle.make} ${vehicle.model.model} ${vehicle.model.year} ${vehicle.images[0].car_angle}`}
      />
      <div className='flex flex-row flex-wrap items-center'>
        <Label label={vehicle.make} name={'Brand'} />
        <Label label={vehicle.model.model} name={'Model'} />
        <Label label={`${vehicle.mileage}`} name={'Mileage'} />
        <Label 
          label={
            `${vehicle.first_registration?.month ?? 'N'}.${vehicle.first_registration?.year ?? 'A'}`
          } name={'First Reg.'}
        />
        <Label label={vehicle.fuel} name={'⛽︎'} />
        <Label label={vehicle.power} name={'Power 🔌'} />
        <Label label={`${vehicle.consumption.combined ?? 'N.A'}`} name={'Comb. Consumption'} />
        <Label label={`${vehicle.co2.emission ?? 'N.A'}`} name={'CO₂ Emission'} />
      </div>
    </a>
  );
}