
import Image from 'next/image';
import { Vehichle } from "@/app/lib/types";

export default function VehicleTile({ vehicle }: { vehicle: Vehichle }) {
  
  return (
    <div className="flex items-center justify-center h-60 rounded bg-gray-50 dark:bg-gray-800">
      <Image 
        src={vehicle.images[0].url ?? ""}  width={'200'} height={'75'}
        alt={`Picture of ${vehicle.make} ${vehicle.model.model} ${vehicle.model.year} ${vehicle.images[0].car_angle}`}
      />
    </div>
  );
}