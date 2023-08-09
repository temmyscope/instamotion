"use client";
import React, { Suspense, useContext, useEffect } from 'react';

import SideBar from '@/app/components/sidebar';
import VehicleTile from '@/app/components/commons/tile';
import VehicleTileSkeleton from '@/app/components/commons/tile/skeleton';

import { VehicleContext } from './store/provider';


export default function Home() {
  const [vehichleState, _] = useContext(VehicleContext);

  console.log(vehichleState.userIsSearching)
  useEffect(() => {
    console.log(vehichleState)

  }, [vehichleState])

  return (
    <React.Fragment>
      
      <SideBar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">     
          <div className="grid grid-cols-3 gap-4 mb-4">

            <Suspense fallback={<>{Array().fill(0, 0, 9).map((_, index) => <VehicleTileSkeleton key={index} />)} </>}>
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
