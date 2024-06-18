// climateSoilData.js
import axios from 'axios';

class ClimateData {
  constructor() {}

  async fetchAverageClimateData(latitude, longitude) {
    const year = new Date().getFullYear() - 1;
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;
    const url = "https://archive-api.open-meteo.com/v1/archive";

    const params = {
      latitude: latitude,
      longitude: longitude,
      start_date: startDate,
      end_date: endDate,
      hourly: ["temperature_2m", "relative_humidity_2m"]
    };

    try {
      const response = await axios.get(url, { params });
      const { hourly } = response.data;
      const temperatures = hourly.temperature_2m;
      const humidities = hourly.relative_humidity_2m;

      const sumTemp = temperatures.reduce((acc, temp) => acc + temp, 0);
      const averageTemperature = sumTemp / temperatures.length;

      const sumHumidity = humidities.reduce((acc, humidity) => acc + humidity, 0);
      const averageHumidity = sumHumidity / humidities.length;

      return { averageTemperature, averageHumidity };
    } catch (error) {
      console.error('Error fetching climate data:', error);
      return { averageTemperature: null, averageHumidity: null };
    }
  }

  async fetchSoilData(latitude, longitude) {
    const url = `https://soil.narc.gov.np/api/soildata?lat=${latitude}&lon=${longitude}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching soil data:', error);
      return null;
    }
  }
}

export default ClimateData;
