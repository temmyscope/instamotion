import { useContext } from "react";
import { VehicleContext } from "../provider";

export const useVehicleFilters = () => {

  const [_, dispatch] = useContext(VehicleContext);

  const filterByMake = () => dispatch({ type: 'MAKE' });
  const filterByModel = () => dispatch({ type: 'MODEL' });
  const filterByMileage = () => dispatch({ type: 'MILEAGE' });
  const filterByPower = () => dispatch({ type: 'POWER' });
  const filterByFirstReg = () => dispatch({ type: 'FIRST_REG' });
  const filterByFuel = () => dispatch({ type: 'FUEL' });
  const filterByPrice = () => dispatch({ type: 'PRICE' });
  const filterByGearBox = () => dispatch({ type: 'GEARBOX' });
  const filterByExtColor = () => dispatch({ type: 'EXT_COLOR' });
  const filterByCategory = () => dispatch({ type: 'CATEGORY' });


  return {
    filterByCategory, filterByExtColor, filterByFirstReg, filterByFuel, 
    filterByGearBox, filterByMake, filterByMileage, filterByModel, filterByPower, filterByPrice
  }
}