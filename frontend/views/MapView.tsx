import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export function MapView() {
  return (
    <MapContainer
      center={[33.7591776, -84.3982603]}
      zoom={10}
      scrollWheelZoom={false}
      className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[33.7591776, -84.3982603]}>
        <Popup>DevNexus Atlanta</Popup>
      </Marker>
    </MapContainer>
  );
}
