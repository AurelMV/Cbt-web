import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Mapa = () => {

  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <MapContainer 
      center={[-10.4074729, -75.3347043]} 
      zoom={5} 
      style={{ height: '500px', width: '100%' }} 
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      zoomControl={false}
      boxZoom={false}
      keyboard={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Marker 
        position={[-9.5333, -77.5333]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Ancash</Popup>
        )}
      </Marker>
      <Marker 
        position={[-13.6342, -72.8782]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Apurimac</Popup>
        )}
      </Marker>
      <Marker 
        position={[-16.4090, -71.5375]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Arequipa</Popup>
        )}
      </Marker>
      <Marker 
        position={[-13.1580, -74.2230]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Ayacucho</Popup>
        )}
      </Marker>
      <Marker 
        position={[-7.1565, -78.5072]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Cajamarca</Popup>
        )}
      </Marker>
      <Marker 
        position={[-13.5310, -71.9675]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Cusco</Popup>
        )}
      </Marker>
      <Marker 
        position={[-12.7750, -74.9925]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Huancavelica</Popup>
        )}
      </Marker>
      <Marker 
        position={[-9.9700, -76.2425]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Huanuco</Popup>
        )}
      </Marker>
      <Marker 
        position={[-13.3710, -75.7939]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Ica</Popup>
        )}
      </Marker>
      <Marker 
        position={[-12.0684, -75.2028]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Junin</Popup>
        )}
      </Marker>
      <Marker 
        position={[-8.1163, -79.0301]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>La libertad</Popup>
        )}
      </Marker>
      <Marker 
        position={[-6.7740, -79.9560]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Lanbayeque</Popup>
        )}
      </Marker>
      <Marker 
        position={[-12.0464, -77.0428]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Lima</Popup>
        )}
      </Marker>
      <Marker 
        position={[-3.7480, -73.2531]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Loreto</Popup>
        )}
      </Marker>
      <Marker 
        position={[-12.5932, -69.1897]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Madre de Dios</Popup>
        )}
      </Marker>
      <Marker 
        position={[-17.1865, -70.9330]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Moquegua</Popup>
        )}
      </Marker>
      <Marker 
        position={[-10.6869, -76.2022]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Pasco</Popup>
        )}
      </Marker>
      <Marker 
        position={[-5.1945, -80.6328]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Piura</Popup>
        )}
      </Marker>
      <Marker 
        position={[-15.8404, -69.2222]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Puno</Popup>
        )}
      </Marker>
      <Marker 
        position={[-6.9500, -76.9667]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>San Martin</Popup>
        )}
      </Marker>
      <Marker 
        position={[-18.0150, -70.2480]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Tacna</Popup>
        )}
      </Marker>
      <Marker 
        position={[-3.5669, -80.4520]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Tumbes</Popup>
        )}
      </Marker>
      <Marker 
        position={[-8.3736, -74.5467]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Ucayali</Popup>
        )}
      </Marker>
      <Marker 
        position={[-12.0430, -77.1181]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Callao</Popup>
        )}
      </Marker>
      <Marker 
        position={[-6.2301, -77.8689]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Chachapoyas</Popup>
        )}
      </Marker>
      <Marker 
        position={[-7.1565, -78.5072]}
        eventHandlers={{
          mouseover: () => {
            setPopupVisible(true);
          },
          mouseout: () => {
            setPopupVisible(false);
          },
        }}
      >
        {popupVisible && (
          <Popup>Cajamarca</Popup>
        )}
      </Marker>



    </MapContainer>
    
  );
};

export default Mapa;
