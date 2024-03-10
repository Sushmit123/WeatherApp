import React, { useState, useEffect } from "react";
import logo from "./img/weatherify1.png";
import img from "./img/immg.png";
import profile from "./img/profile-pic (1).png";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { IoLocationSharp } from "react-icons/io5";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { WiSunrise } from "react-icons/wi";
import { TbSunset2 } from "react-icons/tb";
import { FaSearchLocation } from "react-icons/fa";
// import { Link } from "react-router-dom";
import moment from "moment";

const Weather = () => {
  const [city, setCity] = useState("Mumbai");

  useEffect(() => {
    demo(city);
  }, [demo, city]);

  let APIKey = "ad1e7188d667d6ebeb6d2535c93680d6";

  // Function to convert Unix timestamp to formatted time
  function convertUnixTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${formattedHours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}`;
    return formattedTime;
  }
  // Function to convert Unix timestamp to formatted time finish

  // let handleClick = (e) => {
  //   let city = document.getElementById("city").value;
  //   demo(city);
  // };

  // let handleClick1 = (e) => {
  //   let newCity = document.getElementById("city").value;
  //   setCity(newCity);
  // };

  async function demo(city_name) {
    try {
      let data = await window.fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${APIKey}`
      );

      let forecastData = await window.fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${APIKey}`
      );

      let finalData = await data.json();
      console.log(finalData);

      let forecastWeather = await forecastData.json();
      displayForecast(forecastWeather);

      let { main, weather, wind, name, sys } = finalData;

      let c = document.getElementsByClassName("display_city")[0];
      let country = document.getElementsByClassName("display_country")[0];
      let descp = document.getElementsByClassName("display_descp")[0];
      let t = document.getElementsByClassName("display_temp")[0];
      let h = document.getElementsByClassName("hd")[0];
      let w = document.getElementsByClassName("wd")[0];
      let max = document.getElementsByClassName("max_temp")[0];
      let min = document.getElementsByClassName("min_temp")[0];
      let rise = document.getElementsByClassName("sun_rise")[0];
      let set = document.getElementsByClassName("sun_set")[0];

      let feel = document.getElementsByClassName("fl");
      let img = document.getElementById("weather_img");
      img.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png `;

      c.innerHTML = ` ${name} , `;
      country.innerHTML = `  ${sys.country}`;
      descp.innerHTML = `Description :  ${weather[0].description}`;
      t.innerHTML = `${parseInt(main.temp - 273.15)}°C`;
      max.innerHTML = `Max : ${parseInt(main.temp_max - 273.15)}°c`;
      min.innerHTML = `Min : ${parseInt(main.temp_min - 273.15)}°c`;
      feel.innerHTML = `Feel like  : ${parseInt(main.feels_like - 273.15)}°c`;

      h.innerHTML = `Humidity </br> <h1 style="font-size : 40px;font-weight: 100;position: relative; top : 100px;left:70px">${main.humidity}%</h1> `;

      w.innerHTML = `Wind Status  </br> <h1 style="font-size : 40px;font-weight: 100;position: relative;
      top: 100px;
      left: 15px;">${wind.speed}km/hr</h1> `;

      rise.innerHTML = `Sunrise: ${convertUnixTimestamp(sys.sunrise)}`;
      set.innerHTML = `Sunset: ${convertUnixTimestamp(sys.sunset)}`;
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  function displayForecast(forecastWeather) {
    // Assuming forecastWeather.list contains an array of forecasts for each 3-hour interval
    // Extracting the temperatures and icons for each day
    let dailyData = {};
    forecastWeather.list.forEach((forecast) => {
      let date = forecast.dt_txt.split(" ")[0];
      if (!dailyData[date]) {
        dailyData[date] = { temps: [], icons: [] };
      }
      dailyData[date].temps.push(forecast.main.temp);
      dailyData[date].icons.push(forecast.weather[0].icon);
    });

    // Calculating average temperature for each day
    let averageData = {};
    Object.keys(dailyData).forEach((date) => {
      let temps = dailyData[date].temps;
      let averageTemp =
        temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
      let icons = dailyData[date].icons;
      let mostFrequentIcon = getMostFrequentElement(icons);
      averageData[date] = { averageTemp, icon: mostFrequentIcon };
    });

    // Displaying 5-day forecast
    let forecastContainer = document.getElementsByClassName("forecast")[0];
    forecastContainer.innerHTML = ""; // Clear previous forecast

    Object.keys(averageData).forEach((date) => {
      let dayElement = document.createElement("div");
      dayElement.className = "forecast-day";

      let dateElement = document.createElement("h3");
      dateElement.textContent = date;

      let tempElement = document.createElement("p");
      tempElement.textContent = ` ${parseInt(
        averageData[date].averageTemp - 273.15
      )}°C`;

      let iconElement = document.createElement("img");
      iconElement.src = `https://openweathermap.org/img/wn/${averageData[date].icon}.png`;
      iconElement.alt = "Weather Icon";

      dayElement.appendChild(dateElement);
      dayElement.appendChild(tempElement);
      dayElement.appendChild(iconElement);
      forecastContainer.appendChild(dayElement);
    });
  }

  // Helper function to find the most frequent element in an array
  function getMostFrequentElement(array) {
    let counts = {};
    let maxCount = 0;
    let mostFrequentElement = null;

    array.forEach((element) => {
      counts[element] = (counts[element] || 0) + 1;
      if (counts[element] > maxCount) {
        maxCount = counts[element];
        mostFrequentElement = element;
      }
    });

    return mostFrequentElement;
  }

  return (
    <section className="container">
      <div class="vertical-bar">
        <div id="logo">
          <img src={logo} alt="weatherify" class="logo-img" />
          <h1 className="name">weatherify</h1>
        </div>
      </div>

      <article>
        {/* <div className="display_weather"> */}
        <aside className="first aside">
          <div id="search-container">
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Search for place ..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <FaSearchLocation id="search" />
          </div>

          <img src={img} alt="weather_img" id="weather_img" />

          <h2 id="time">{moment().format("LLL")}</h2>

          <h1 className="display_temp">24°C</h1>
          <h5 className="display_descp">Description : Clear</h5>

          <selection className="feels_like">
            <h2 className="fl"> Feels like : 35 °c</h2>
          </selection>

          <div className="loc">
            <IoLocationSharp id="location" />

            <h2 className="display_city">Mumbai , </h2>
            <h2 className="display_country">IN</h2>
          </div>
        </aside>

        <aside className="second aside">
          <div className="profilee">
            <a
              href="https://github.com/Sushmit123"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                id="profile"
                src={profile}
                alt="Sushmit123's GitHub"
                srcSet=""
              />
              <h3 style={{}}>Sushmit Pathare</h3>
            </a>
          </div>

          <h2 className="th">Today's Highlights</h2>
          <section className="display_wind">
            <FaWind
              style={{
                fontSize: "3em",
                color: "gray",
                position: "relative",
                top: "90px",
                left: "95px",
              }}
            />
            <h2 className="wd">
              Wind Status <br></br> <h1 className="wind">2.3km/hr</h1>
            </h2>
          </section>
          <section className="display_humidity">
            <WiHumidity
              style={{
                fontSize: "3em",
                color: "gray",
                position: "relative",
                top: "90px",
                left: "95px",
              }}
            />
            <h2 className="hd">
              Humidity <br></br> <h1 className="humidity">57%</h1>
            </h2>
          </section>

          <section className="maxmin">
            Max & Min
            <section className="max">
              <FaTemperatureArrowUp
                style={{
                  fontSize: "1em",
                  color: "gray",
                  position: "relative",
                  top: "55px",
                  left: "10px",
                }}
              />
              <h4 className="max_temp">Max : 34°c</h4>
            </section>
            <section className="min">
              <FaTemperatureArrowDown
                style={{
                  fontSize: "1em",
                  display: "inline",
                  color: "gray",
                  position: "relative",
                  top: "90px",
                  left: "10px",
                }}
              />
              <h4 className="min_temp"> Min : 14°c</h4>
            </section>
          </section>
          <section className="sun">
            Sunrise & Sunset
            <section className="sunrise">
              <WiSunrise
                style={{
                  fontSize: "2em",

                  color: "gray",
                  position: "relative",
                  top: "61px",
                  left: "-15px",
                }}
              />
              <h4 className="sun_rise"> Sunrise : 6:15 AM</h4>
            </section>
            <section className="sunset">
              <TbSunset2
                style={{
                  fontSize: "2em",
                  color: "gray",
                  position: "relative",
                  top: "90px",
                  left: "-15px",
                }}
              />
              <h4 className="sun_set"> Sunset : 6:15 PM</h4>
            </section>
          </section>
          {/*  Forecast weather  */}
          <section id="daysfive">
            <h2 className="day">Weather Pediction week Forecast</h2>
            <aside className="fifth aside">
              <div className="forecast"></div>
            </aside>
          </section>
        </aside>

        {/* </div> */}
      </article>
    </section>
  );
};

export default Weather;
