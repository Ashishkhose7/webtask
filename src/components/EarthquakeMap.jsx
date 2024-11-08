import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Function to create a custom icon with a color-coded FontAwesome location icon
const createCustomIcon = (color) => {
  return L.divIcon({
    className: '',
    html: `<i class="fas fa-map-marker-alt" style="color: ${color}; font-size: 1.5rem;"></i>`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

// A custom hook to update map view when an earthquake is clicked
function ResetCenter({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 6, {
        animate: true,
      });
    }
  }, [coords, map]);

  return null;
}

// Define color-coded icons based on earthquake magnitude
const redIcon = createCustomIcon('red');
const tomatoIcon = createCustomIcon('tomato');
const blueIcon = createCustomIcon('blue');

const EarthquakeMap = ({ earthquakes, selectedEarthquake }) => {
  const [selectedCoords, setSelectedCoords] = useState(null);
  const mapRef = useRef(null);  // Store map reference
  const markersRef = useRef({});  // Store marker references by ID

  const getIconByMagnitude = (magnitude) => {
    if (magnitude >= 6) return redIcon;
    if (magnitude >= 4) return tomatoIcon;
    return blueIcon;
  };

  // Center map and open popup for selected earthquake
  useEffect(() => {
    if (selectedEarthquake) {
      const { geometry } = selectedEarthquake;
      const { coordinates } = geometry;
      setSelectedCoords([coordinates[1], coordinates[0]]);
      // Trigger the popup for the selected earthquake
      const marker = markersRef.current[selectedEarthquake.id];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedEarthquake]);  // Trigger whenever the selected earthquake changes

  return (
    <MapContainer
    center={selectedCoords || [20, 0]}
    zoom={selectedCoords ? 6 : 2}      className="h-full w-full"
      whenCreated={(map) => (mapRef.current = map)} // Store map reference
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      {earthquakes.map((quake) => {
        const { coordinates } = quake.geometry;
        return (
          <Marker
            key={quake.id}
            position={[coordinates[1], coordinates[0]]}
            icon={getIconByMagnitude(quake.properties.mag)}
            ref={(el) => (markersRef.current[quake.id] = el)} // Store reference to the marker
          >
            <Popup>
              <div className="text-gray-800">
                <h3 className="font-semibold text-lg mb-1">{quake.properties.place}</h3>
                <p><strong>Magnitude:</strong> {quake.properties.mag}</p>
                <p><strong>Location:</strong> {coordinates[1].toFixed(2)}, {coordinates[0].toFixed(2)}</p>
                <p><strong>Time:</strong> {new Date(quake.properties.time).toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
      {/* Add the ResetCenter component to update the map position when an earthquake is selected */}
      {selectedCoords && (
          <ResetCenter coords={selectedCoords} />
        )}
    </MapContainer>
  );
};

export default EarthquakeMap;
