import axios from "axios";
import { useEffect, useState } from "react";
import './Card.css'
import thunderstorm from '../assets/videos/thunderstormgif.gif'
import drizzle from '../assets/videos/drizzlegif.gif'
import rain from '../assets/videos/raingif.gif'
import snow from '../assets/videos/snowgif.gif'
import sun from '../assets/videos/sungif.gif'
import clouds from '../assets/videos/cloudsgif.gif'
import  nocase from '../assets/videos/nocasegif.gif'





import { setIsLoading } from "../store/slices/isLoading.slice";


function Card() {
  const [weather, setWeather] = useState({});
  const [isCelsius, setIsCelsius] = useState(true);
  const [isFarenheit, setIsFarenheit] = useState(true);
  const [background, setBackground] = useState(nocase)
  
  let apiKey = "953649b7d1a1947b183b4d9462971683"

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
    function success(pos) {
      const coords = pos.coords;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric`)
      .then((res) => {setWeather(res.data)})
      manageBackground(weather.weather?.[0].id)
    }
 
}, [])


const manageBackground = (data) => {
    if (data === 200 && data <= 232){
      setBackground(thunderstorm)
    }else if (data===300 && data <=321) {
      setBackground(drizzle)
    }else if (data===500 && data <=531) {
      setBackground(rain)
    }
    else if (data===600 && data <=622) {
      setBackground(snow)
    }else if (data===800) {
      setBackground(sun)
    }else{
      setBackground(clouds)
    }
}


function changeUnits(){
  setIsCelsius(!isCelsius)
  setIsFarenheit(!isFarenheit)
}



  return (
    <div> 
      <img src={background} alt="" className="video"/>
    <div className="card">
    <h1>Weather App</h1>
    <h2>{weather.name}, {weather?.sys?.country}</h2>
    <div className="element-1">
      <img className="icon-img" src={`http://openweathermap.org/img/wn/${weather?.weather?.[0].icon}@2x.png`} />

    </div>

    <div className="degrees" >
            {isCelsius ? weather.main?.temp : weather.main?.temp * 1.8}{" "}
            {isCelsius ? "C°" : "F°"}
        </div>


    <div className="element-2">
      <ul className="list">
        <li>Wind Speed: {weather.wind?.speed}</li>
        <li>Clouds: {weather.clouds?.all}%</li>
        <li>Pressure: {weather.main?.pressure} mb</li>
      </ul>
    </div>
    <button onClick={changeUnits}>°F / °C</button>

    </div>
    </div>
  )
}

export default Card;
