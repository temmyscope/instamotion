"use client";
import { useEffect, useState } from "react";

import ThumbnailImage, { ImageInFocus } from "@/app/components/commons/gallery";

import { useVehicleSelector } from "@/app/store/hooks/selector";
import Label from "@/app/components/commons/label";

export default function Page({ params }: { params: { id: string } }) {
  const { selectById } = useVehicleSelector();
  let vehicle = selectById(params.id);
  if (!vehicle) {
    return;
  }

  let [imageInFocus, setImageInFocus] = useState(vehicle.images[0].url ?? '')


  useEffect(() => {
    

    return () => {
      setImageInFocus('');
    }
  }, [params.id])

  return(
  <div className="grid gap-4 flex justify-center items-center justify-center py-4">
    <div className="flex justify-center items-center justify-center">
      <ImageInFocus name="" vehicleImage={{url: imageInFocus, car_angle: ''}} />
    </div>

    <div className="grid grid-cols-5 gap-4 flex justify-center items-center justify-center">
      {vehicle.images.slice(0, 5).map((image, idx) => (
        <ThumbnailImage name={`${vehicle?.make}`} vehicleImage={image} key={idx} />
      ))} 
    </div>

    <div className='flex flex-row flex-wrap items-center justify-center'>
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

</div>
  )
}