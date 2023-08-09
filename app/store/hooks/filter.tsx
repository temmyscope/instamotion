import { useContext } from "react";
import { VehicleContext } from "../provider";

export const useVehicleFilter = () => {

  const [_, dispatch] = useContext(VehicleContext);

  const filterByMake = (maker: string) => dispatch({ type: 'FILTER_BY_MAKE', payload: { maker } });
  const filterByModel = (model: any) => dispatch({ type: 'FILTER_BY_MODEL', payload: { model }  });
  const filterByMileage = (mileage: number) => dispatch({ type: 'FILTER_BY_MILEAGE', payload: { mileage }  });
  const filterByPower = (power: number) => dispatch({ type: 'FILTER_BY_POWER', payload: { power }  });
  const filterByFirstReg = (registration: any) => dispatch({ type: 'FILTER_BY_FIRST_REG', payload: { registration }  });
  const filterByFuel = (fuelType: string) => dispatch({ type: 'FILTER_BY_FUEL', payload: { fuelType }  });
  const filterByPrice = (price: number) => dispatch({ type: 'FILTER_BY_PRICE', payload: { price } });
  const filterByGearBox = (gearBox: string) => dispatch({ type: 'FILTER_BY_GEARBOX', payload: { gearBox }  });
  const filterByExtColor = (color: string) => dispatch({ type: 'FILTER_BY_EXT_COLOR', payload: { color }  });
  const filterByCategory = (category: string) => dispatch({ type: 'FILTER_BY_CATEGORY', payload: { category }  });


  return {
    filterByCategory, filterByExtColor, filterByFirstReg, filterByFuel, 
    filterByGearBox, filterByMake, filterByMileage, filterByModel, filterByPower, filterByPrice
  }
}