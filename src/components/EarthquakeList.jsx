// components/EarthquakeList.js
import React from 'react';

const EarthquakeList = ({ earthquakes, onSelectEarthquake }) => {
  return (
    <div className="h-full overflow-y-auto">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 sticky top-0 bg-white z-10 border-b border-gray-200">
        Recent Earthquakes
      </h2>
      <ul className="space-y-2">
        {earthquakes.map((quake) => (
          <li
            key={quake.id}
            className="p-2 md:p-3 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors duration-200 mr-1"
            onClick={() => onSelectEarthquake(quake)} // Pass the entire earthquake data
          >
            <p className="font-medium text-gray-700">{quake.properties.place}</p>
            <p className="text-sm text-gray-500">Magnitude: {quake.properties.mag}</p>
            <p className="text-xs text-gray-400">
              {new Date(quake.properties.time).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EarthquakeList;
