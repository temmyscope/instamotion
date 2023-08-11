import { useContext } from "react";
import { VehicleContext } from "../provider";

export const useVehicleFilter = () => {

  const [_, dispatch] = useContext(VehicleContext);

  const dummyUpdate = () => dispatch({type: 'DUMMY_UPDATE', payload: { data: _.vehicles.slice(0, 6) }});

  const filterByMake = (maker: string) => dispatch({ type: 'FILTER_BY_MAKE', payload: { maker } });

  const filterByModel = (model: any) => dispatch({ type: 'FILTER_BY_MODEL', payload: { model }  });

  const filterByMileage = (min: number, max: number) => dispatch({ 
    type: 'FILTER_BY_MILEAGE', payload: { min, max }  
  });
  const filterByPower = (min: number, max: number) => dispatch({ 
    type: 'FILTER_BY_POWER', payload: { min, max }
  });
  const filterByFirstReg = (registration: number|string) => dispatch({ 
    type: 'FILTER_BY_FIRST_REG', payload: { registration: Number(registration) }  
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
    filterByPower, filterByPrice, dummyUpdate, filterByCategory, 
    filterByExtColor, filterByFirstReg, filterByFuel, emptyCurrentFilterState,
  }
}