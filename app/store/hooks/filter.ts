import { useContext } from "react";
import { VehicleContext } from "../provider";

export const useVehicleFilter = () => {

  const [_, dispatch] = useContext(VehicleContext);
  /**
   * dispatch action payload to filter vehicle context state by maker
   * @param {string} maker 
   * @returns 
   */
  const filterByMake = (maker: string) => dispatch({ type: 'FILTER_BY_MAKE', payload: { maker } });

  /**
   * dispatch action payload to filter vehicle context state by model
   * @param {string} model 
   * @returns 
   */
  const filterByModel = (model: string) => dispatch({ type: 'FILTER_BY_MODEL', payload: { model }  });

  /**
   * dispatch action payload to filter vehicle context state by mileage
   * @param {number} min
   * @param {number} max 
   * @returns 
   */
  const filterByMileage = (min: number, max: number) => dispatch({ 
    type: 'FILTER_BY_MILEAGE', payload: { min, max }  
  });

  /**
   * dispatch action payload to filter vehicle context state by power
   * @param {number} min
   * @param {number} max 
   * @returns 
   */
  const filterByPower = (min: number, max: number) => dispatch({ 
    type: 'FILTER_BY_POWER', payload: { min, max }
  });

  /**
   * dispatch action payload to filter vehicle context state by year of registration
   * @param {number|string} regYear
   * @returns 
   */
  const filterByFirstReg = (regYear: number|string) => dispatch({ 
    type: 'FILTER_BY_FIRST_REG', payload: { regYear: Number(regYear) }  
  });

  /**
   * dispatch action payload to filter vehicle context state by fuel type
   * @param {string} fuelType
   * @returns 
   */
  const filterByFuel = (fuelType: string) => dispatch({ type: 'FILTER_BY_FUEL', payload: { fuelType }  });

  /**
   * dispatch action payload to filter vehicle context state by price
   * @param {number} min
   * @param {number} max 
   * @returns 
   */
  const filterByPrice = (min: number, max: number) => dispatch({ 
    type: 'FILTER_BY_PRICE', payload: { min, max }
  });

  /**
   * dispatch action payload to filter vehicle context state by fuel type
   * @param {string} regYear
   * @returns 
   */
  const filterByGearBox = (gearBox: string) => dispatch({ 
    type: 'FILTER_BY_GEARBOX', payload: { gearBox } 
  });
  
  /**
   * dispatch action payload to filter vehicle context state by color
   * @param {string} color
   * @returns 
   */
  const filterByExtColor = (color: string) => dispatch({ 
    type: 'FILTER_BY_EXT_COLOR', payload: { color }  
  });
  
  /**
   * dispatch action payload to filter vehicle context state by category
   * @param {string} category
   * @returns 
   */
  const filterByCategory = (category: string) => dispatch({ 
    type: 'FILTER_BY_CATEGORY', payload: { category } 
  });

  /**
   * dispatch action payload to reset filter vehicle context state to initial state for a field/filter
   * @param {string} fieldName
   * @returns 
   */
  const emptyCurrentFilterState = (fieldName: string) => dispatch(
    {type: 'UNDO_THIS_FILTER', payload: { filter: fieldName }
  })

  return {
    filterByGearBox, filterByMake, filterByMileage, filterByModel, 
    filterByPower, filterByPrice, filterByCategory, 
    filterByExtColor, filterByFirstReg, filterByFuel, emptyCurrentFilterState,
  }
}