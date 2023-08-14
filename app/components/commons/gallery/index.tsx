import Image from 'next/image';
import { Image as VehicleImage } from "@/app/lib/types";


type VehicleImageProp = {
  name: string, 
  vehicleImage: VehicleImage
}

/**
 * generate thumbnail small images for product
 * 
 * @param {VehicleImageProp} param
 * @returns 
 */
export default function ThumbnailImage({ name, vehicleImage }: VehicleImageProp) {

  return (
    <div>
      <Image 
        src={vehicleImage.url ?? ""} width={'200'} height={'75'} 
        className="h-auto max-w-full rounded-lg" alt={`Picture of ${name} `}
      />
    </div>
  );
}

/**
 * generate large image for product
 * 
 * @param {VehicleImageProp} param
 * @returns 
 */
export function ImageInFocus({ name, vehicleImage }: VehicleImageProp) {

  return (
    <div>
      <Image 
        src={vehicleImage.url ?? ""} alt={`Picture of ${name} `} height={300} width={500}
        className="h-auto max-w-full rounded-lg" objectFit='contain'
      />
    </div>
  );
}

