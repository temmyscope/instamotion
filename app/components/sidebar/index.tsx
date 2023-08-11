import React, { useContext, useState } from "react";
import { useRouter } from "next/router";

import { ColorFilter, NumberRangeFilter, SelectFilter } from "@/app/components/commons/filter";

import { VehicleContext } from "@/app/store/provider";
import { useVehicleFilter } from '@/app/store/hooks/filter';

export default function SideBar() {
  const [vehichleState, _] = useContext(VehicleContext);

  const [filters, setFilter] = useState({make: ''});

  const router = useRouter();

  const { 
    filterByPrice, 
    filterByPower, 
    filterByMileage, 
    filterByExtColor, emptyCurrentFilterState,
    filterByMake, filterByModel, filterByFuel,
    filterByCategory, filterByGearBox, filterByFirstReg
  } = useVehicleFilter();

  const addBrandFilter = (brand: string) => {
    setFilter(prevState => ({ ...prevState, make: brand }));
    filterByMake(brand);
  }

  const handleRouteParams = () => {
    console.log(router.query)
  }

  return (
    <React.Fragment>
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <form className="mt-4 border-t border-gray-200">

            <SelectFilter 
              label="Select category" handler={filterByCategory}
              options={Array.from(vehichleState.meta?.categories ?? [])} 
              nullStateHandler={() => emptyCurrentFilterState('category')}
            />

            <SelectFilter 
              label="Select a brand" handler={addBrandFilter}
              nullStateHandler={() => emptyCurrentFilterState('make')}
              options={vehichleState.meta.make? Object.keys(vehichleState.meta.make) : []} 
            />

            {filters.make !== '' && (
            <SelectFilter 
              label="Select a model" handler={filterByModel}
              nullStateHandler={() => emptyCurrentFilterState('model')}
              options={Array.from(vehichleState.meta.make[filters.make])} 
            />
            )}

            <SelectFilter 
              label="Select fuel type" handler={filterByFuel}
              options={Array.from(vehichleState.meta?.fuel ?? [])} 
              nullStateHandler={() => emptyCurrentFilterState('fuel')}
            />

            <SelectFilter 
              options={Array.from(vehichleState.meta?.first_reg ?? [])} 
              nullStateHandler={() => emptyCurrentFilterState('reg_year')}
              label="Select year of registration" handler={filterByFirstReg}
            />

            <SelectFilter 
              label="Select gear type" handler={filterByGearBox}
              options={Array.from(vehichleState.meta?.gearbox ?? [])} 
              nullStateHandler={() => emptyCurrentFilterState('gearbox')}
            />

            <NumberRangeFilter label="Price" handler={filterByPrice} />

            <NumberRangeFilter label="Power" handler={filterByPower} />

            <NumberRangeFilter label="Mileage" handler={filterByMileage} />
            
            <ColorFilter colors={Array.from(vehichleState.meta?.color ?? [])} handler={filterByExtColor} />

          </form>
        </div>
      </aside>
    </React.Fragment>
  )
}