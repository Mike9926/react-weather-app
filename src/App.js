import React, { useState } from "react";
import './App.css'
import 'animate.css/animate.min.css'; //animation library
import { WiThermometer, WiHumidity, WiWindy, WiCloudy, WiSnow, WiThunderstorm, WiRain, WiDaySunny } from 'weather-icons-react'; //weather icons library
import Modal from 'react-modal'; //modal library
import History from './History';
import { Nav } from "react-bootstrap";




function App() {
  const apiKey = "e3ec1d75f48ff05a127798e1bfb2f333" //API key for OpenWeatherMap
  const [weatherData, setWeatherData] = useState([{}]) //state to hold weather data
  const [weatherCondition, setWeatherCondition] = useState("")

  const [city, setCity] = useState("") //state to hold city input
  const [modalIsOpen, setModalIsOpen] = useState(false); //state to handle modal visibility

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)', //overlay background color
      zIndex: '1000'

    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)', //positioning for modal
      padding: '0',
      borderRadius: '10px',
      width: '80%',
      maxWidth: '600px',
      height: '60%%',

    }
  };

  // allowing user to chose units//
  const [unit, setUnit] = useState("imperial");

  //function to get weather data

  //function to open modal
  const openModal = () => {
    setModalIsOpen(true);
  }
  // function to close modal
  const closeModal = () => {
    setModalIsOpen(false);
  }
  //state variable to hold search history
  const [cityHistory, setCityHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(true);

  const getWeather = () => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&APPID=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data)
        setWeatherCondition(data.weather[0].main)
        openModal()
        setCityHistory([...cityHistory, city])
      }
      )
  }



  //component to display history

  return (
    <div>
      <button onClick={() => setShowHistory(!showHistory)}>View/Hide history</button>
      <nav />

      {typeof weatherData.name === "undefined" ? (
        <div className="welcome">
          <h2>Any-City-Weather</h2>
          <h4>Enter city below to see its weather!</h4>
        </div>
      ) : (

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => closeModal()}
          style={customStyles}
          contentLabel="Weather Data Modal"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2>Weather in {weatherData.name}</h2>
              <button onClick={() => closeModal()}>X</button>
            </div>
            <hr />
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-6">
                  <p>
                    <WiThermometer size={50} /> Temperature: {weatherData.main.temp}
                    {unit === "imperial" ? "℉" : unit === "metric" ? "°C" : "K"}
                  </p>
                  <p><WiHumidity size={50} /> Humidity: {weatherData.main.humidity}%</p>
                </div>
                <div className="col-lg-6">
                  <p><WiWindy size={50} /> Wind: {weatherData.wind.speed}mph</p>
                  <div>
                    {(() => {
                      switch (weatherCondition) {
                        case "Clouds":
                          return <p><WiCloudy size={50} /> Clouds</p>;
                        case "Rain":
                          return <p><WiRain size={50} /> Rain</p>;
                        case "Clear":
                          return <p><WiDaySunny size={50} /> Clear</p>;
                        case "Snow":
                          return <p><WiSnow size={50} /> Snow</p>;
                        case "Thunderstorm":
                          return <p><WiThunderstorm size={50} /> Thunderstorm</p>;
                        default:
                          return null;
                      }
                    })()}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Modal>
      )}
      <div className="container" >
        <div className="search-container">
          <input className="input"
            placeholder="Enter city..."
            onChange={e => setCity(e.target.value)}
            value={city}
            autoFocus
          />
          <button className="search-button" onClick={getWeather}>Search</button>
        </div>
        <select value={unit} onChange={e => setUnit(e.target.value)}>
          <option value="imperial">Fahrenheit</option>
          <option value="metric">Celsius</option>
          <option value="kelvin">Kelvin</option>
        </select>

      </div>

      <div className="history-container">
        {showHistory && <History cityHistory={cityHistory} />}


        <Nav />
      </div>
    </div>

  );
}

export default App;
