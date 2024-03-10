import React, { useState, useEffect } from "react";

const HourlyForecast = () => {
  const [forecast, setForecast] = useState([]);

  const fetchHourlyForecast = () => {
    const apiKey = "YOUR_API_KEY_HERE";
    const lat = "YOUR_LATITUDE";
    const lon = "YOUR_LONGITUDE";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setForecast(data.hourly);
      })
      .catch((error) => console.error("Fetching error: ", error));
  };

  useEffect(() => {
    fetchHourlyForecast();
  }, []);

  return (
    <div>
      <h2>Hourly Forecast</h2>
      <ul>
        {forecast.map((hour, index) => (
          <li key={index}>
            Time: {new Date(hour.dt * 1000).toLocaleTimeString()}, Temperature:{" "}
            {hour.temp}°C
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HourlyForecast;
