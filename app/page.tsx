"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { Suspense, useContext, lazy, useEffect } from 'react';

import SideBar from '@/app/components/sidebar';

import { Vehicle } from "@/app/lib/types";
import { VehicleContext } from '@/app/store/provider';
import { getVehicles } from '@/app/api/services/vehicle';
import { convertParamToFilters } from "./lib/utils";

const VehicleTile = lazy(() => import('./components/commons/tile/index'));

export default function Home() {
  const router = useRouter();
  const routerParams = useSearchParams();
  const [vehichleState, dispatch] = useContext(VehicleContext);

  useEffect(() => {
    (async() => {
      const urlParams = convertParamToFilters(routerParams);
      
      const data = await getVehicles();
      if (data.vehicles) {
        
        dispatch({
          type: 'INITIALISE', 
          payload: { data: data.vehicles, meta: data.meta, filters: urlParams }
        });
      }
    })();

    return () => {}
  }, []);

  const simulateLoadMoreOnDownScroll = () => {
    const rect = typeof window === 'undefined' || !window.document
      ? { left: 0, top: 0 }
      : document.body.getBoundingClientRect();

    const x = rect.left;
    const y = -rect.top;
    if ((y%100) > 85) {
      let vehicleData: Array<Vehicle> = [];
      // increase number of retrieved items
      vehicleData = [ ...vehicleData, ...vehichleState.vehicles ];
      dispatch({ 
        type: 'UPDATE',
        payload: { data: vehicleData, meta: vehichleState.meta, filters: vehichleState.filters }
      });
    }

  }

  useEffect(() => {

    window.addEventListener('scroll', simulateLoadMoreOnDownScroll);

    return () => {
      window.removeEventListener('scroll', simulateLoadMoreOnDownScroll)
    }
  });

  console.log(vehichleState.filtered);
  console.log(vehichleState.filters);

  const goTo = (e: any, id: string) => {
    e.preventDefault()
    router.push(`/vehicle/${id}`)
  }


  return (
    <React.Fragment>
      
      <SideBar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">     
          <div className="grid grid-cols-3 gap-4 mb-4">

            <Suspense fallback={<p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loading</p>}>
                {vehichleState.userIsSearching === true?
                vehichleState.filtered.map((vehicle, idx) => (
                  <VehicleTile vehicle={vehicle} key={idx} goTo={(e) => goTo(e, vehicle.id)} />
                ))
                :
                vehichleState.vehicles.map((vehicle, idx) => (
                  <VehicleTile vehicle={vehicle} key={idx} goTo={(e) => goTo(e, vehicle.id)}  />
                ))}
            </Suspense>

          </div>
        </div>
      </div>
    </React.Fragment>
  )
}