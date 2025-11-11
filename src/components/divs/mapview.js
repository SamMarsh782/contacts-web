import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ stops, setSearch, selected, setSelected }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!stops || stops.length === 0) return;

    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([41.39, -81.44], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    mapRef.current.eachLayer(layer => {
      if (layer instanceof L.Marker || layer instanceof L.FeatureGroup) {
        mapRef.current.removeLayer(layer);
      }
    });

    const markerGroup = L.featureGroup();

    stops.forEach((stop) => {
      const icon = L.divIcon({
        html: `<div class="custom-marker">${stop.ACTUAL_SEQUENCE_NUM}</div>`,
        className: `marker ${selected?.ACTUAL_SEQUENCE_NUM === stop.ACTUAL_SEQUENCE_NUM ? 'selected' : 'default'}`,
        iconSize: [30, 30]
      });

      const marker = L.marker([stop.LAT, stop.LONG], { icon });

      marker.on('click', () => {
        setSearch(stop.DESCRIPTION);
        setSelected(stop);
      });

      marker.addTo(markerGroup);
    });

    markerGroup.addTo(mapRef.current);

    // Only fit bounds if selected stop is not within current bounds
    if (selected) {
      const currentBounds = mapRef.current.getBounds();
      const selectedLatLng = L.latLng(selected.LAT, selected.LONG);

      if (!currentBounds.contains(selectedLatLng)) {
        mapRef.current.fitBounds(markerGroup.getBounds());
      }
    } else {
      // Initial load or no selection: fit to all stops
      mapRef.current.fitBounds(markerGroup.getBounds());
    }
  }, [stops, selected]);

  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};

export default MapView;
