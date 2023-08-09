import { useContext } from "react";
import { VehicleContext } from "../provider";

export const useVehicleSelector = () => {
  const [vehichles, _] = useContext(VehicleContext);

  const selectById = (id: string) => {
    return vehichles.vehicles.find(vehicle => vehicle.id == id);
  }

  const selectAll = () => vehichles.vehicles;

  return { selectById, selectAll }
}