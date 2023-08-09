"use client";
import React, { Suspense } from 'react';

import SideBar from '@/app/components/sidebar';
import VehicleTile from '@/app/components/commons/tile';
import VehicleTileSkeleton from '@/app/components/commons/tile/skeleton';

import { useVehicleSelector } from './store/hooks/selector';


export default function Home() {
  const { selectAll } = useVehicleSelector();

  const vehicles = selectAll();

  return (
    <React.Fragment>
      
      <SideBar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">     
          <div className="grid grid-cols-3 gap-4 mb-4">

            <Suspense fallback={<>{Array().fill(0, 0, 9).map((_, index) => <VehicleTileSkeleton key={index} />)} </>}>
              {vehicles.map(vehicle => (
                <VehicleTile vehicle={vehicle} />
              ))}
            </Suspense>

          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
