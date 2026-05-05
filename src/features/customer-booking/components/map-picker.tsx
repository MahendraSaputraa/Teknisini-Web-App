"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapPickerProps {
  position: { lat: number; lng: number };
  onPositionChange: (pos: { lat: number; lng: number }) => void;
}

export default function MapPicker({
  position,
  onPositionChange,
}: MapPickerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        onPositionChange({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  };

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          onPositionChange({ lat, lng });
        }
      },
    }),
    [onPositionChange],
  );

  if (!isMounted) {
    return (
      <div className="h-[300px] w-full rounded-md border border-slate-200 bg-slate-100 animate-pulse flex items-center justify-center text-slate-400">
        Menyiapkan Peta...
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full rounded-md overflow-hidden border border-slate-200 relative z-0">
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents />
        <Marker
          draggable={true}
          eventHandlers={eventHandlers}
          position={[position.lat, position.lng]}
          ref={markerRef}
          icon={markerIcon}
        />
      </MapContainer>
    </div>
  );
}
