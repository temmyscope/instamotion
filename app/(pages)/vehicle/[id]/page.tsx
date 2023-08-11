"use client";
import { useEffect, useState } from "react";

import ThumbnailImage, { ImageInFocus } from "@/app/components/commons/gallery";

import { useVehicleSelector } from "@/app/store/hooks/selector";
import Label from "@/app/components/commons/label";
import { Image, Vehicle } from "@/app/lib/types";

export default function Page({ params }: { params: { id: string } }) {
  const { selectById } = useVehicleSelector();

  const [vehicleData, setVehicleData] = useState<Vehicle|undefined>();
  let [imageInFocus, setImageInFocus] = useState<Image|undefined>();

  const loadData = (id: string) => {
    let vehicle = selectById(id);
    if (vehicle) {
      setVehicleData(vehicle);
      setImageInFocus(vehicle.images[0] )
    }
  };


  useEffect(() => {

    if (params.id !== undefined) {
      loadData(params.id);
    }

    return () => {};
  }, [params.id]);

  if (vehicleData == undefined) {
    return;
  }

  return(
  <div className="grid gap-4 flex justify-center items-center justify-center py-4">
    <div className="flex justify-center items-center justify-center">
      {imageInFocus && <ImageInFocus name="" vehicleImage={imageInFocus} />}
    </div>

    <div className="grid grid-cols-5 gap-4 flex justify-center items-center justify-center">
      {vehicleData.images.slice(0, 5).map((image, idx) => (
        <ThumbnailImage name={`${vehicleData?.make}`} vehicleImage={image} key={idx} />
      ))} 
    </div>

    <div className='flex flex-row flex-wrap items-center justify-center'>
      <Label label={vehicleData.make} name={'Brand'} id={`vehicle-${vehicleData.id}-brand`}  />
      <Label label={vehicleData.model.model} name={'Model'} id={`vehicle-${vehicleData.id}-model`} />
      <Label label={`${vehicleData.mileage}`} name={'Mileage'} id={`vehicle-${vehicleData.id}-mileage`} />
      <Label 
        label={
          `${vehicleData.first_registration?.month ?? 'N'}.${vehicleData.first_registration?.year ?? 'A'}`
        } name={'First Reg.'}  id={`vehicle-${vehicleData.id}-first_reg`}
      />
      <Label label={vehicleData.fuel} name={'⛽︎'} id={`vehicle-${vehicleData.id}-fuel`} />
      <Label label={`${vehicleData.power}`} name={'Power 🔌'} id={`vehicle-${vehicleData.id}-power`} />
      <Label 
        label={`${vehicleData.consumption.combined ?? 'N.A'}`} 
        name={'Comb. Consumption'} id={`vehicle-${vehicleData.id}-consump-comb`} 
      />
      <Label 
        label={`${vehicleData.co2.emission ?? 'N.A'}`} name={'CO₂ Emission'} id={`vehicle-${vehicleData.id}-emission`} 
      />
    </div>

</div>
  )
}