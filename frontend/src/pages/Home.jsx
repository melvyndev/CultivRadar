import React, { useState, useEffect, useRef } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import pins from '../assets/images/pins.png';
import { Link } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: pins,
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [position, setPosition] = useState([-20.882057, 55.450675]); // Position par défaut pour Saint-Denis, Réunion
  const [markerPosition, setMarkerPosition] = useState(null);
  const [markerWeather, setMarkerWeather] = useState(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: 'Saint-Denis,RE',
            APPID: 'dd7584b646c78afd9d36be8a7a8ec511',
            units: 'metric'
          }
        });
        setWeather(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données météo', error);
      }
    };

    fetchWeather();
  }, []);

  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);

        try {
          const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
              lat,
              lon: lng,
              APPID: 'dd7584b646c78afd9d36be8a7a8ec511',
              units: 'metric'
            }
          });
          setMarkerWeather(response.data);
console.log(response.data);
          // Ouvrir la popup après avoir reçu les données météo
          if (markerRef.current) {
            markerRef.current.openPopup();
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données météo', error);
          setMarkerWeather(null);
        }
      }
    });
    return null;
  };

  return (
    <main className="flex-shrink-0">
      <Nav />
      <Header />
      <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <GeoJSON style={{ color: '#3388ff', weight: 1 }} />
        {markerPosition && (
          <Marker position={markerPosition} ref={markerRef}>
            <Popup>
              {markerWeather ? (
                <div>
                  <h2>Météo à la position cliquée</h2>
                  <p>Température : {markerWeather.main.temp}°C</p>
                  <p>Humidité : {markerWeather.main.humidity}%</p>
                  <p>Conditions : {markerWeather.weather[0].description}</p>
                  <p>Pression : {markerWeather.main.pressure}hPa</p>
                  <Link to={'/visualisation'}>Commencer à cultivé</Link>
                </div>
              ) : (
                <p>Chargement des données météo...</p>
              )}
            </Popup>
          </Marker>
        )}
        <MapClickHandler />
      </MapContainer>
    </main>
  );
};

export default Home;
