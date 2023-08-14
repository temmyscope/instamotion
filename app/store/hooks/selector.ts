import { useContext } from "react";
import { VehicleContext } from "../provider";

export const useVehicleSelector = () => {
  const [vehichles, _] = useContext(VehicleContext);

  /**
   * returns vehicle by id from the context state
   * @param {string} id
   * @returns 
   */
  const selectById = (id: string) => {
    return vehichles.vehicles.find(vehicle => vehicle.id == id);
  }

  /**
   * returns all vehicles within the context state
   * @returns 
   */
  const selectAll = () => vehichles.vehicles;

  /**
   * returns resulting filtered vehicles within the context state
   * @returns 
   */
  const selectFiltered = () => vehichles.filtered;

  return { selectById, selectAll, selectFiltered }
}