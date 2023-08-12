import { useContext } from "react";
import { VehicleContext } from "../provider";

export const useVehicleFilter = () => {

  const [_, dispatch] = useContext(VehicleContext);

  const filterByMake = (maker: string) => dispatch({ type: 'FILTER_BY_MAKE', payload: { maker } });

  const filterByModel = (model: any) => dispatch({ type: 'FILTER_BY_MODEL', payload: { model }  });

  const filterByMileage = (min: number, max: number) => dispatch({ 
    type: 'FILTER_BY_MILEAGE', payload: { min, max }  
  });
  const filterByPower = (min: number, max: number) => dispatch({ 
    type: 'FILTER_BY_POWER', payload: { min, max }
  });
  const filterByFirstReg = (regYear: number|string) => dispatch({ 
    type: 'FILTER_BY_FIRST_REG', payload: { regYear: Number(regYear) }  
  });
  const filterByFuel = (fuelType: string) => dispatch({ type: 'FILTER_BY_FUEL', payload: { fuelType }  });

  const filterByPrice = (min: number, max: number) => dispatch({ 
    type: 'FILTER_BY_PRICE', payload: { min, max }
  });

  const filterByGearBox = (gearBox: string) => dispatch({ 
    type: 'FILTER_BY_GEARBOX', payload: { gearBox } 
  });
  
  const filterByExtColor = (color: string) => dispatch({ 
    type: 'FILTER_BY_EXT_COLOR', payload: { color }  
  });
  
  const filterByCategory = (category: string) => dispatch({ 
    type: 'FILTER_BY_CATEGORY', payload: { category } 
  });

  const emptyCurrentFilterState = (fieldName: string) => dispatch(
    {type: 'UNDO_THIS_FILTER', payload: { filter: fieldName }
  })

  return {
    filterByGearBox, filterByMake, filterByMileage, filterByModel, 
    filterByPower, filterByPrice, filterByCategory, 
    filterByExtColor, filterByFirstReg, filterByFuel, emptyCurrentFilterState,
  }
}