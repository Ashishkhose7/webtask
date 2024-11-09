import React, { useState, useEffect } from 'react';
import EarthquakeMap from '../components/EarthquakeMap';
import EarthquakeList from '../components/EarthquakeList';

const Home = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [selectedEarthquake, setSelectedEarthquake] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setEarthquakes(data.features);
        setError(null);  // Clear any previous error on success
      } catch (err) {
        setError(err.message); // Set the error message
      }
    };

    fetchData();
  }, []);

  if (error) {
    // Display error message and hide other content
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-500 text-white p-4 rounded shadow-lg text-center">
          <p className="text-xl font-bold">Failed to load earthquake data</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="text-center my-6">
        <h1 className="text-4xl font-bold">Recent Earthquake Activity Visualization</h1>
        <p className="text-lg mt-2">
          Explore and analyze the recent earthquake activity around the world to understand seismic patterns.
        </p>
      </div>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Earthquake Map */}
        <div className="md:flex-grow h-[50vh] md:h-full">
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
