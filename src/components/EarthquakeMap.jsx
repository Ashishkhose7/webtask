// components/EarthquakeMap.js
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Function to determine icon color based on magnitude
const getIconByMagnitude = (magnitude) => {
  let color;
  if (magnitude >= 5.0) {
    color = 'red';
  } else if (magnitude >= 3.0) {
    color = 'tomato';
  } else {
    color = 'blue';
  }

  // Return a FontAwesome location icon with the selected color
  return L.divIcon({
    html: `<i class="fas fa-map-marker-alt" style="color: ${color}; font-size: 24px;"></i>`,
    iconSize: [24, 24],
    className: 'text-center',
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

const EarthquakeMap = ({ earthquakes, selectedEarthquake }) => {
  const mapRef = useRef(null);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const markersRef = useRef({});

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
  }, [selectedEarthquake]);

  return (
    <MapContainer
      center={selectedCoords || [20, 0]}
      zoom={selectedCoords ? 6 : 2} // Zoom in if an earthquake is selected
      scrollWheelZoom={true}
      className="h-full w-full"
      whenCreated={(map) => (mapRef.current = map)}
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
            icon={getIconByMagnitude(quake.properties.mag)} // Use the custom icon based on magnitude
            ref={(el) => (markersRef.current[quake.id] = el)} // Store the marker reference
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
