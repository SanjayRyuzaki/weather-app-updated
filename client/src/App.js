import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://weather-backend-o983.onrender.com/api/weather?city=${city}`);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      } else {
        setWeather(null);
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch weather.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather} disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.city}</h2>
          <img src={weather.icon} alt={weather.description} />
          <p><strong>Temperature:</strong> {weather.temperature} °C</p>
          <p><strong>Feels Like:</strong> {weather.feels_like} °C</p>
          <p><strong>Humidity:</strong> {weather.humidity} %</p>
          <p><strong>Pressure:</strong> {weather.pressure} hPa</p>
          <p><strong>Wind Speed:</strong> {weather.wind_speed} m/s</p>
          <p><strong>Cloud Coverage:</strong> {weather.clouds} %</p>
          <p><strong>Dew Point:</strong> {weather.dew_point} °C</p>
          <p><strong>Weather:</strong> {weather.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
