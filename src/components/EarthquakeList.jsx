import React from 'react';

const EarthquakeList = ({ earthquakes, onSelectEarthquake }) => {
  return (
    <div className="h-full overflow-y-auto scrollbar-custom ">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 sticky top-0 bg-white z-10 border-gray-200">
        Recent Earthquakes
      </h2>
      <ul className="space-y-2 mx-1">
        {earthquakes.map((quake) => (
          <li
            key={quake.id}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors duration-200"
            onClick={() => onSelectEarthquake(quake)} // Trigger selection when clicked
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
