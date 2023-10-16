"use client"

import { useState } from 'react'
import styles from './style.module.css'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'

export default function NasaGIS() {
const [show, setShow] = useState(true)

	return(
		<>
			<div className='sm:hidden'>
				<Disclosure as="div" className={""}>
					{({open}) => (
						<>
							<div className={`absolute ${open ? "right-0" : "left-0"}`}>
								<Disclosure.Button className={`rounded-sm bg-white m-4 relative sm:hidden w-8 h-8 p-1`}>
									<span className='sr-only'>Open Map Legend</span>
									{open ? (
										<XMarkIcon aria-hidden="true"/>
									) : (
										<Bars3Icon aria-hidden="true"/>
									)}
								</Disclosure.Button>
							</div>
							<Disclosure.Panel className="sm:hidden">
								{/** Map Legend */}
								<div className={`max-w-full max-h-xs sm:max-h-md bg-white m-2 p-4 rounded-sm`}>
									<h1 className="text-lg sm:text-2xl">Landslides</h1>
									<p className='text-sm sm:text-base'>
										Data:&nbsp;
										<a href="https://data.nasa.gov/Earth-Science/Global-Landslide-Catalog-Export/dd9e-wu2v/data" className="text-cyan-600">
											NASA&apos;s Global Landslide Catalog (GLC)
										</a>
										&nbsp;from 1988 to 2017
									</p>
									<div className="mb-5">
										<h2 className="text:base sm:text-xl mt-2">Casualties</h2>
										<div className={`h-2 sm:h-3 w-full mb-1 ${styles.rainbow}`}/> 
										<div className="h-2 sm:h-3 w-full flex justify-between text-sm sm:text-base">
											<div>0</div>
											<div>100</div>
											<div>1000</div>
											<div>3000</div>
											<div>5000+</div>
										</div>
									</div>
									<div className='flex'>
										<div className='bg-red-700 h-1 w-5 mt-2'/>
										<p className='text-sm sm:text-base'>&nbsp;Fault Lines</p>
									</div>
									<p className='text-xs mt-2'>Size of the circle indicates size of the landslide and color indicates the number of human casualties (including injuries) resulting from the landslide</p>
								</div>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>

			<link
				href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css"
				rel="stylesheet"
			/>

			{/** Map Legend */}
			<div className={`absolute hidden sm:block sm:max-w-xs max-h-md bg-white m-2 p-4 rounded-sm`}>
				<h1 className="text-2xl">Landslides</h1>
				<p>
					Data:&nbsp;
					<a href="https://data.nasa.gov/Earth-Science/Global-Landslide-Catalog-Export/dd9e-wu2v/data" className="text-cyan-600">
						NASA&apos;s Global Landslide Catalog (GLC)
					</a>
					&nbsp;from 1988 to 2017
				</p>
				<div className="mb-5">
					<h2 className="text-xl mt-2">Casualties</h2>
					<div className={`h-3 w-full mb-1 ${styles.rainbow}`}/> 
					<div className="h-3 w-full flex justify-between">
						<div>0</div>
						<div>100</div>
						<div>1000</div>
						<div>3000</div>
						<div>5000+</div>
					</div>
				</div>
				<div className='flex'>
					<div className='bg-red-700 h-1 w-5 mt-2'/>
					<p>&nbsp;Fault Lines</p>
				</div>
				<p className='text-xs mt-2'>Size of the circle indicates size of the landslide and color indicates the number of human casualties (including injuries) resulting from the landslide</p>
			</div>

			<iframe 
				src="https://api.mapbox.com/styles/v1/nswagg/cku6d397t005217nxro34xi39.html?title=false&access_token=pk.eyJ1IjoibnN3YWdnIiwiYSI6ImNrdHE4cG55azB0ejEybm11N21samw5c3YifQ.164L6otfChZfmGbF2GMDoQ&zoomwheel=false#2.04/21.1/-27.92/0/3" 
				title="Landslide Size Compared to Number of Fatalities (1988-2017 NASA)"
				style={{width:"100%", height:"100vh"}}
			/>
		</>

	)
}