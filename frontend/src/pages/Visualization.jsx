import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Header from '../components/Header';
import WeatherConditions from '../components/WeatherConditions';
import axios from 'axios';
import List from '../components/List';
import * as d3 from 'd3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faTint, faCloud } from '@fortawesome/free-solid-svg-icons';
import TemperatureChart from '../components/TemperatureChart';
import HumidityChart from '../components/HumidityChart';
import WeatherComponent from '../components/WeatherComponent';

const Visualization = () => {
  const { lat, lng } = useParams();
 
  return (
    <main className="flex-shrink-0 bg-plant">
      <Nav />
      <Header />
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6">
          <div className='py-3'>
          <WeatherConditions lat={lat}  lng={lng}  />
          </div>

          </div>
          <div className="col-12 col-md-6">
          <div className='py-3'>
            <List  lat={lat}  lng={lng} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <div className='py-3'>
            <TemperatureChart  lat={lat}  lng={lng} />
            </div>
          </div>
          <div className="col-10">
          <div className='py-3'>
              <HumidityChart  lat={lat}  lng={lng} />
              </div>
          </div>
        <div className='col-12'>
        <div className='py-3'>
          <WeatherComponent />
          </div>
        </div>
        </div>
      </div>
    </main>
  );
};

export default Visualization;
