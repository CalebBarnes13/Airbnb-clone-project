import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { useState } from "react";
import { getCenter } from "geolib";

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  // transforming search results into objects
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  // the latitude and longitude of the center of locations
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/calebbarnes13/clcotgz1l001y15pnoat2zjlx"
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <Marker
          key={result.long}
          longitude={result.long}
          latitude={result.lat}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <p
            role="img"
            onClick={() => setSelectedLocation(result)}
            className="cursor-pointer text-2xl animate-bounce"
            aria-label="push-pin"
          >
            📌
          </p>
        </Marker>
      ))}
    </ReactMapGL>
  );
}

export default Map;
