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

/*     map.current.on('load', () => {
      console.log(map.current.getSource('composite').vectorLayerIds) // For debugging

      const dataLayer = map.current.querySourceFeatures('composite', {
        'sourceLayer': process.env.NEXT_PUBLIC_MAPBOX_SOURCE_LAYER //name of vector source ID - need to obfuscate this
      });
      console.log(dataLayer) 

      map.current.addSource('dataLayer', {
        type: 'geojson',
        data: dataLayer,
        filter: [
          "all",
          [
            "match",
            ["get", "Order Status"],
            ["Done"],
            true,
            false
          ]
        ],
        cluster: true,
        clusterMaxZoom: 22,
        clusterRadius: 10
      });

      map.current.addLayer({
        id:'cluster-count',
        type:'symbol',
        source: 'dataLayer',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': ['get', 'point_count_abbreviated'],
          'text-font': ['DIN Offc Pro Medium','Arial Unicode MS Bold'],
          'text-size': [
            'interpolate',
            ['linear'],
            ['zoom'],
            12,
            12,
            16,
            24
          ],
        },
        paint: {
          'text-opacity': [
          'interpolate',
              ['linear'],
              ['zoom'],
              12,
              0,
              13,
              1
          ],
          'text-halo-color': '#000000',
          'text-halo-width': 1,
          'text-color': '#ffffff'
        }
      }); 
    }) */ // end map.on('load')
  }, []) // end useEffect()

  return (
    <div className="h-full">
      <div ref={mapContainer} className="absolute h-full w-full"/>
    </div>
  )
}