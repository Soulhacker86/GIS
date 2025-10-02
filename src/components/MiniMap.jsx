import React, { useEffect, useState } from "react";

export default function MiniMap({ center = [27.5, 36.5], markers = [] }) {
  const [leaflet, setLeaflet] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const mod = await import("react-leaflet");
        if (mounted) {
          setLeaflet(mod);
        }
      } catch (error) {
        console.warn("Leaflet not installed", error);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (!leaflet) {
    return (
      <div className="card" style={{ height: 300 }}>
        <div className="small">Map unavailable (install react-leaflet + leaflet to enable)</div>
        <code className="mono">npm i react-leaflet leaflet</code>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = leaflet;

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <MapContainer center={center} zoom={8} style={{ height: 300 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker) => (
          <Marker key={marker.id} position={[marker.lat, marker.lon]}>
            <Popup>
              <div>
                <strong>{marker.name}</strong>
                <div className="small">{marker.stage}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
