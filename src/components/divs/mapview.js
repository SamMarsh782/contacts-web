import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ stops, setSearch, selected, setSelected }) => {
  const mapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!stops || stops.length === 0) return;

    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([41.39, -81.44], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    mapRef.current.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });

    markersRef.current = {};

    stops.forEach((stop) => {
      const isSelected = selected?.ACTUAL_SEQUENCE_NUM === stop.ACTUAL_SEQUENCE_NUM;
      const icon = L.divIcon({
        html: `<div class="custom-marker">${stop.ACTUAL_SEQUENCE_NUM}</div>`,
        className: `marker ${isSelected ? 'selected' : 'default'}`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([stop.LAT, stop.LONG], { 
        icon,
        zIndexOffset: isSelected ? 1000 : 0
      });

      marker.on('click', () => {
        setSearch(stop.DESCRIPTION);
        setSelected(stop);
      });

      marker.addTo(mapRef.current);
      markersRef.current[stop.ACTUAL_SEQUENCE_NUM] = marker;
    });

    if (stops.length > 0) {
      const bounds = L.latLngBounds(stops.map(s => [s.LAT, s.LONG]));
      if (selected) {
        const currentBounds = mapRef.current.getBounds();
        const selectedLatLng = L.latLng(selected.LAT, selected.LONG);
        if (!currentBounds.contains(selectedLatLng)) {
          mapRef.current.fitBounds(bounds);
        }
      } else {
        mapRef.current.fitBounds(bounds);
      }
    }
  }, [stops, selected, setSearch, setSelected]);

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};

export default MapView;