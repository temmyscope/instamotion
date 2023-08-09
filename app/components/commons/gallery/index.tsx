import Image from 'next/image';
import { Image as VehicleImage } from "@/app/lib/types";

export default function ThumbnailImage({ name, vehicleImage }: { name: string, vehicleImage: VehicleImage }) {
  
  return (
    <div>
      <Image 
        src={vehicleImage.url ?? ""} width={'200'} height={'75'} className="h-auto max-w-full rounded-lg"
        alt={`Picture of ${name} `}
      />
    </div>
  );
}

export function ImageInFocus({ name, vehicleImage }: { name: string, vehicleImage: VehicleImage }) {
  
  return (
    <div>
      <Image 
        src={vehicleImage.url ?? ""} alt={`Picture of ${name} `} height={300} width={500}
        className="h-auto max-w-full rounded-lg" objectFit='contain'
      />
    </div>
  );
}

