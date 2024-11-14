import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Mapa de distritos de Perú (en formato GeoJSON)
import peruGeoJSON from './peruGeoJSON.json';  // Asegúrate de tener un archivo GeoJSON de los distritos de Perú

const DistrictMap = () => {
  const [studentData, setStudentData] = useState({});

  // Simulación de datos de estudiantes por distrito
  useEffect(() => {
    // Ejemplo de distribución de estudiantes por distrito
    setStudentData({
      'Distrito1': 120,
      'Distrito2': 80,
      'Distrito3': 50,
      // Agrega más distritos con sus datos
    });
  }, []);

  // Función para definir el comportamiento del mapa (tooltip y estilos)
  const onEachDistrict = (district, layer) => {
    const districtName = district.properties.NOMBDIST; // Nombre del distrito en el GeoJSON

    // Añadir tooltip con la cantidad de estudiantes en el distrito
    layer.bindTooltip(`${districtName}: ${studentData[districtName] || 0} estudiantes`, { permanent: true, direction: 'center' });

    // Estilos del distrito (puedes personalizarlos)
    layer.setStyle({
      fillColor: 'blue',
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.6,
    });

    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          color: '#666',
          fillColor: 'orange',
        });
      },
      mouseout: (e) => {
        e.target.setStyle({
          weight: 1,
          color: 'white',
          fillColor: 'blue',
        });
      },
    });
  };

  return (
    <div style={{ height: '500px' }}>
      <MapContainer center={[-9.19, -75.0152]} zoom={5} scrollWheelZoom={false}>
        {/* Capa base del mapa */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Capa GeoJSON para distritos de Perú */}
        <GeoJSON data={peruGeoJSON} onEachFeature={onEachDistrict} />
      </MapContainer>
    </div>
  );
};

export default DistrictMap;