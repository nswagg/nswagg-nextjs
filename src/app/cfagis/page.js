'use client'

import { useEffect, useRef } from "react"

import mapboxgl from "!mapbox-gl"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESSTOKEN

export default function CFAGIS() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  /*const center = [-104.834347, 38.896259] 
  const cfageo = process.env.NEXT_PUBLIC_MAPBOX_CFAGEO */

  useEffect(() => {
    if(map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE,
      center: [-104.834347, 38.896259],
      zoom: 11.8
    });

    /* map.on('load', () => {

      // All of the delivery data points
      map.addSource('data', {
        type: 'vector',
        url: cfageo,
        // Filter out cancelled orders.
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
      });
      // data clusters
      map.addSource('data_clusters', {
        type: 'vector',
        url: cfageo,
        // Filter out cancelled orders.
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

      // heatmap layer
      map.addLayer({
        id: 'heatmap',
        type: 'heatmap',
        source: 'data',
          "source-layer": "cfageo",
        maxzoom: 16,
        paint: {
          'heatmap-weight': [
            "interpolate",
            ["linear"],
            ["zoom"],
            13,
            0.125, // 20 deliveries
            18,
            0.5 // 2 deliveries

          ],
          'heatmap-intensity': 1,
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(33,102,172,0)',
            0.2,
            'rgb(103,169,207)',
            0.4,
            'rgb(209,229,240)',
            0.6,
            'rgb(253,219,199)',
            0.8,
            'rgb(239,138,98)',
            1,
            'rgb(178,24,43)'
          ],
          'heatmap-radius': [
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            17,
            16,
            40
          ],
          'heatmap-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            12,
            1,
            13,
            0
          ]
        }
      });
      // data points layer (circles)
      map.addLayer({
          id: 'delivery-point',
          type: 'circle',
          source: 'data',
          "source-layer": "cfageo",
          filter: ['!', ['has', 'point_count']],
          paint: {
            // Size circle radius by delivery distance and zoom level
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              13,
              ['interpolate', ['linear'], ['get', 'Actual Route Distance (Miles)'], 1, 1, 10, 6],
              16,
              ['interpolate', ['linear'], ['get', 'Actual Route Distance (Miles)'], 1, 5, 16, 30]
            ],
            // Color circle by delivery distance
            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'Actual Route Distance (Miles)'],
              1,
              'rgba(33,102,172,0)',
              2,
              'rgb(103,169,207)',
              3,
              'rgb(209,229,240)',
              6,
              'rgb(253,219,199)',
              8,
              'rgb(239,138,98)',
              10,
              'rgb(178,24,43)'
              ],
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-stroke-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              12,
              0,
              13,
              1
            ],
            // Transition from heatmap to circle layer by zoom level
            'circle-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              12,
              0,
              13,
              1
            ]
          }
        },
        'waterway-label'
      );
      map.addLayer({
        id:'cluster-count',
        type: 'symbol',
        source: 'data_clusters',
        "source-layer": "cfageo",
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

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'data_clusters',
        "source-layer": "cfageo",
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            2,
            '#f1f075',
            6,
            '#f28cb1'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            10,
            2,
            20,
            8,
            30
          ],
          'circle-opacity': 0
        }
      })

      // CFA delivery Zone
      map.addSource('CFA_delivery_area', {
        type: 'vector',
        url: process.env.NEXT_PUBLIC_MAPBOX_CFADELIVERYAREA
      });

      map.addLayer({
        id: 'delivery_boundary',
        type: 'fill',
        source: 'CFA_delivery_area',
        "source-layer": "CFA_delivery_area",
        paint: {
          'fill-color': '#888888',
          'fill-opacity': 0.4
        },
        'layout': {}
      });
    }) //end map.on('load')
    return () => map.remove() */
  }) // end useEffect()

  return (
    <div className="h-full">
      <div ref={mapContainer} className="absolute h-full w-full"/>
    </div>
  )
}