import React, { useState } from 'react';

const WeatherComponent = () => {
    const [weather, setWeather] = useState('Ensoleillé');

    const changeWeather = () => {
        setWeather(weather === 'Ensoleillé' ? 'Pluvieux' : 'Ensoleillé');
    };

    return (
        <div className="background">
            <div className="container">
                <div id="weatherapp">
                    <div className="current-weather">
                        <h2>Météo actuelle : {weather}</h2>
                    </div>
                    <div className="upcoming-weather">
                        {/* Contenu de la section météo à venir */}
                    </div>
                    <button onClick={changeWeather}>Changer la météo</button>
                </div>
            </div>
        </div>
    );
};

export default WeatherComponent;
