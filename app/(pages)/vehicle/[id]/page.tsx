import ThumbnailImage, { ImageInFocus } from "@/app/components/commons/gallery";

export default function Page({ params }: { params: { id: string } }) {

  return(
  <div className="grid gap-4">
    <ImageInFocus name="" vehicleImage={{url: '', car_angle: ''}} />
    <div className="grid grid-cols-5 gap-4">
      <ThumbnailImage name="" vehicleImage={{url: '', car_angle: ''}} />  
    </div>
</div>
  )
}