'use client'

import mapboxgl from "!mapbox-gl"
import { useEffect, useRef } from "react"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESSTOKEN //obfuscate?

export default function CFAGIS() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // to initialize the map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE,
      center: [-104.834347, 38.896259],
      zoom: 11.8
    });

    map.current.on('load', () => {
      console.log(map.current.getSource('composite').vectorLayerIds) // For debugging

      const dataLayer = map.current.querySourceFeatures('composite', {
        'sourceLayer': process.env.NEXT_PUBLIC_MAPBOX_SOURCE_LAYER //name of vector source ID - need to obfuscate this
      });
      console.log(dataLayer)
      

    })
  }, [])

  function mapSetup() {
    // Create and label data clusters

  }

  return (
    <div className="h-full">
      <div ref={mapContainer} className="absolute h-full w-full"/>
    </div>
  )
}