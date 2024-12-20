import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import WeatherCard from "../components/WeatherCard";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState();
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userHistory, setUserHistory] = useState([]);
  const navigate = useNavigate()

  useEffect(()=>{
    const email = localStorage.getItem(user)
    setUser(email)
    const fetchUserHistory = async()=>{
    
      try {
        const response = await axios.get("/history")
        setUserHistory(response.data.history)
        console.log(response.data.history)
        setError(null)
        
      } catch (error) {
      console.error(error)
        setError(error.message || "Failed to fetch Your History")
        
      }
    }
    fetchUserHistory()
  },[user])
  
  

  const fetchWeatherData = async () => {
    if(city=== "") return
    try {
      setIsLoading(true);
      const response = await axios.post(`/get-weather`, {
        city: city,
      });
      setWeatherData(response.data.data);
      setUserHistory((userHistory) => [...userHistory, response.data.data]);
      setError(null);
      setIsLoading(false);
    } catch (err) {
      console.log(response.data.message || "failed to fetch");
      setError("Error fetching weather data");
      setIsLoading(false);
    }
  };
  return (
    <>
      <Header user={user} />
      <div className="dashboard">
        <div>
          <input
            type="search"
            name="city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value.trim())}
          />
          {isLoading ? (
            <button disabled={isLoading}>Fetching...</button>
          ) : (
            <button onClick={fetchWeatherData} disabled={isLoading}>
              Get Weather
            </button>
          )}
        </div>
        {error && <p>{error}</p>}
        {weatherData && <WeatherCard data={weatherData} />}
        {userHistory.length === 0 ? (
          <p className="no-history">No History</p>
        ) : ( 
          <div className="history-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>City</th>
                  <th>Temperature (°C)</th>
                  <th>Weather</th>
                </tr>
              </thead>
              <tbody>
                { userHistory && userHistory.map((hist, index) => (
                  <tr key={index}>
                    <td>{hist.location.name}</td>
                    <td>{hist.current.temperature}</td>
                    <td>{hist.current.weather_descriptions[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
