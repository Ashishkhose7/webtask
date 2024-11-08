import React, { useState, useEffect } from "react";
import EarthquakeMap from "../components/EarthquakeMap";
import EarthquakeList from "../components/EarthquakeList";

const App = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [selectedEarthquake, setSelectedEarthquake] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
      );
      const data = await response.json();
      setEarthquakes(data.features);
    };
    fetchData();
  }, []);

  return (
    <>
      {/* Title and description */}
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold">
          Recent Earthquake Activity Visualization
        </h1>
        <p className="text-lg mt-2">
          Explore and analyze the recent earthquake activity around the world to
          understand seismic patterns.
        </p>
      </div>
      <div className="flex h-screen">
        <div className="flex-grow">
          {/* Earthquake Map */}
          <EarthquakeMap
            earthquakes={earthquakes}
            selectedEarthquake={selectedEarthquake} // Pass selected earthquake data to the map
          />
        </div>
        <div className="w-1/3 max-w-xs h-full overflow-y-auto p-4 bg-white shadow-lg">
          {/* Earthquake List */}
          <EarthquakeList
            earthquakes={earthquakes}
            onSelectEarthquake={setSelectedEarthquake} // Pass clicked earthquake data to the parent
          />
        </div>
      </div>
    </>
  );
};

export default App;
