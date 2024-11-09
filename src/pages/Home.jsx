import React, { useState, useEffect } from 'react';
import EarthquakeMap from '../components/EarthquakeMap';
import EarthquakeList from '../components/EarthquakeList';

const Home = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [selectedEarthquake, setSelectedEarthquake] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
      );
      const data = await response.json();
      setEarthquakes(data.features);
    };
    fetchData();
  }, []);

  return (
    <>
    <div className="text-center my-6">
      <h1 className="text-4xl font-bold">Recent Earthquake Activity Visualization</h1>
      <p className="text-lg mt-2">Explore and analyze the recent earthquake activity around the world to understand seismic patterns.</p>
    </div>
    <div className="flex flex-col md:flex-row h-screen">
      {/* Map Container */}
      <div className="md:flex-grow h-[50vh] md:h-full">
        {/* <h1 className="text-2xl md:text-3xl font-bold text-center my-4">Earthquake Activity Visualizer</h1> */}
        <EarthquakeMap earthquakes={earthquakes} selectedEarthquake={selectedEarthquake} />
      </div>

      {/* List Container */}
      <div className="flex items-center justify-center md:block w-full md:w-1/3 sm:max-w-xs p-4 bg-white shadow-lg md:border-l overflow-y-auto h-[50vh] md:h-full m-auto">
        <EarthquakeList earthquakes={earthquakes} onSelectEarthquake={setSelectedEarthquake} />
      </div>
    </div>
    </>
  );
};

export default Home;
