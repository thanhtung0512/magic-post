import React, { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PixiOverlay from "react-leaflet-pixi-overlay";

const LeafletMap = ({ customerAddress, orderStatus }) => {
  // Set initial map center and radius
  const markers = useMemo(() => {
    const result = [];

    // Add a marker for the customer's address
    if (customerAddress) {
      result.push({
        id: "customer",
        iconColor: "green",
        position: [customerAddress.latitude, customerAddress.longitude],
        popup: "Your Location",
        popupOpen: true,
      });
    }

    // Add a marker for the order status
    if (orderStatus) {
      result.push({
        id: "order",
        iconColor: "red",
        position: [orderStatus.latitude, orderStatus.longitude],
        popup: "Order Location",
        popupOpen: true,
      });
    }

    return result;
  }, [customerAddress, orderStatus]);

  const mapStyle = {
    height: "550px",
    width: "1120px",
    border: "4px solid teal",
    borderRadius: "10px",
    position: "relative",
  };
  const center = customerAddress
    ? [customerAddress.latitude, customerAddress.longitude]
    : [21.038251509565974, 105.78267832984561];
  const radius = 1000;
  const zoom = 13;
  const shouldDrawPath = customerAddress && orderStatus;
  return (
    <div style={mapStyle}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Circle
          center={center}
          pathOptions={{ color: "teal" }}
          radius={radius}
        />
        {shouldDrawPath && (
          <Polyline
            positions={[
              [customerAddress.latitude, customerAddress.longitude],
              [orderStatus.latitude, orderStatus.longitude],
            ]}
          />
        )}

        <PixiOverlay markers={markers} />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
