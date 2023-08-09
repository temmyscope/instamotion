import React, { Suspense } from 'react';
import type { Metadata } from 'next'

import SideBar from '@/app/components/sidebar';
import VehicleTile from '@/app/components/commons/tile';
import VehicleTileSkeleton from '@/app/components/commons/tile/skeleton';

import { getVehichles } from '@/app/(api)/services/vehicle';


export const metadata: Metadata = {
  title: 'Vehicle Listing',
  description: 'Vehicle SEO text goes here',
}

export default async function Home() {
  const vehicles = await getVehichles();

  return (
    <React.Fragment>
      
      <SideBar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">     
          <div className="grid grid-cols-3 gap-4 mb-4">

            <Suspense fallback={<>{Array().fill(0, 0, 9).map(_ => <VehicleTileSkeleton />)} </>}>
              {vehicles.map(vehicle => (
                <VehicleTile vehicle={vehicle} />
              ))}
            </Suspense>

          </div>
        </div>
      </div>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.0/flowbite.min.js"></script>
    </React.Fragment>
  )
}
