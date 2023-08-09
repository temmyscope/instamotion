import { useContext } from "react";
import { VehicleContext } from "../provider";

export const useVehicleFilters = () => {

  const [_, dispatch] = useContext(VehicleContext);

  const filterByMake = (maker: string) => dispatch({ type: 'MAKE', payload: { maker } });
  const filterByModel = (model: any) => dispatch({ type: 'MODEL', payload: { model }  });
  const filterByMileage = (mileage: number) => dispatch({ type: 'MILEAGE', payload: { mileage }  });
  const filterByPower = (power: number) => dispatch({ type: 'POWER', payload: { power }  });
  const filterByFirstReg = (registration: any) => dispatch({ type: 'FIRST_REG', payload: { registration }  });
  const filterByFuel = (fuelType: string) => dispatch({ type: 'FUEL', payload: { fuelType }  });
  const filterByPrice = (price: number) => dispatch({ type: 'PRICE', payload: { price } });
  const filterByGearBox = (gearBox: string) => dispatch({ type: 'GEARBOX', payload: { gearBox }  });
  const filterByExtColor = (color: string) => dispatch({ type: 'EXT_COLOR', payload: { color }  });
  const filterByCategory = (category: string) => dispatch({ type: 'CATEGORY', payload: { category }  });


  return {
    filterByCategory, filterByExtColor, filterByFirstReg, filterByFuel, 
    filterByGearBox, filterByMake, filterByMileage, filterByModel, filterByPower, filterByPrice
  }
}