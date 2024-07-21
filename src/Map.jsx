import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = ({ location }) => {
  const UpdateMapView = ({ location }) => {
    const map = useMap();
    useEffect(() => {
      if (location) {
        map.setView([location.lat, location.lon], 13);
      }
    }, [location, map]);

    return null;
  };
  return (
    <div>
      {" "}
      <MapContainer
        center={[location.lat, location.lon]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />{" "}
        <UpdateMapView location={location} />
        <Marker position={[location.lat, location.lon]}>
          <Popup>
            <div>
              <strong>City:</strong> {location.city}
              <br />
              <strong>Country:</strong> {location.country}
              <br />
              <strong>ISP:</strong> {location.isp}
              <br />
              <strong>Timezone:</strong> {location.timezone}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
