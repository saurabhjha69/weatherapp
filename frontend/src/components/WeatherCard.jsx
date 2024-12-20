import React from 'react';

function WeatherCard({data}) {
  return (
    <div className="weather-card">
      <h2>Weather In <b>{data.location.name}</b>, {data.location.country}</h2>
      <div className="info">
        <img src={data.current.weather_icons[0]} alt={data.current.weather_descriptions[0]} />
        <h3>{data.current.weather_descriptions[0]}</h3>
        <p>Observed At: <b>{data.current.observation_time}</b> </p>
      </div>
      <div className="foot-info">
        <p>
            Temp
            <b>{data.current.temperature}°C</b>
        </p>
        <p>
            Humid
            <b>{data.current.humidity}%</b>
        </p>
        <p>
            Wind
            <b>{data.current.wind_speed}</b>
        </p>
        <p>
            Pres
            <b>{data.current.pressure}</b>
        </p>
      </div>
    </div>
  );
}

export default WeatherCard;