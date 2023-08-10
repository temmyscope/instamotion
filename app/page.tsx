"use client";
import React, { Suspense, useContext, lazy } from 'react';

import SideBar from '@/app/components/sidebar';

import { VehicleContext } from './store/provider';

const VehicleTile = lazy(() => import('./components/commons/tile/index'));

export default function Home() {
  const [vehichleState, _] = useContext(VehicleContext);

  return (
    <React.Fragment>
      
      <SideBar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">     
          <div className="grid grid-cols-3 gap-4 mb-4">

            <Suspense fallback={<p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loading</p>}>
                {vehichleState.userIsSearching === true?
                vehichleState.filtered.map((vehicle, idx) => (
                  <VehicleTile vehicle={vehicle} key={idx} />
                ))
                :
                vehichleState.vehicles.map((vehicle, idx) => (
                  <VehicleTile vehicle={vehicle} key={idx} />
                ))}
            </Suspense>

          </div>
        </div>
      </div>
    </React.Fragment>
  )
}