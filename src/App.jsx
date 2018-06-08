import React, { Component } from 'react';

import './App.css';
import WeatherIcon from './components/WeatherIcon';
import WeatherDetails from './components/WeatherDetails';

class App extends Component {
  state = {
    icon: '',
    time: 1,
    city: '',
    temperature: '',
    weatherCode: '',
    fetching: true
  }

  componentDidMount() {
    this.fetchIp();
  }

  fetchWeatherData = city => {
    const baseUrl = `http://api.openweathermap.org`;
    const path = `/data/2.5/weather`;
    const appId = `dfaac986c4b6b2f4e669e75a8f9ade22`;
    const query = `units=metric&lang=ru&appid=${appId}`;

    fetch(`${baseUrl}${path}?q=${city}&${query}`)
      .then(response => response.json())
      .then(data => {
        const date = new Date();
        const time = date.getHours();

        this.setState({
          time,
          city,
          temperature: Math.rount(data.main.temp),
          weatherCode: data.weather[0].id,
          fetching: false
        });
      })
      .catch(error => console.log(error));
  };

  fetchIp() {
    fetch('//fregeoip.net/json/')
      .then(response => response.json())
      .then(({ city }) => this.fetchWeatherData(city))
      .catch(error => console.log(error))
  }

    render() {
        const { fetching, icon, time, city, temperature, weatherCode } = this.state;

        return fetching ?
            <div className="app">Загрузка...</div>
            :
            <div className="app" data-hours={time}>
              <WeatherIcon
                icon = {icon}
                weatherCode = {weatherCode}
                time = {time} />

              <WeatherDetails
                city = {city}
                temperature = {temperature} />
            </div>;
    }
}

export default App;
