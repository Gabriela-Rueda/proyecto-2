import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Climate = () => {

    const [climate, setClimate]= useState({})
    const [tempUnit, setTempUnit]=useState(true)

    useEffect( () =>{
        navigator.geolocation.getCurrentPosition(success, error)

        function success(pos) {
            const crd = pos.coords;
          
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=c4ce4f67380711130fc5f744d86d51b7&units=metric`)
            .then(res=>{
                setClimate(res.data)
            }
                )
        }

          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
    }, [])
  
    console.log(climate)

    return (
        <div className='weather'>
            <div className='weather2'>
            <h1>Wheather App</h1>
            <h2>{climate.name} , {climate.sys?.country}</h2>
            </div>
            <div className='info'>
            <img src={`http://openweathermap.org/img/wn/${climate.weather?.[0].icon}@2x.png`} alt="" style={{height: "10rem"}} />
            <ul> 
            <h3>{climate.weather?.[0].description}</h3>
            <li className='tips'> <i class="fa-solid fa-droplet"></i> Humidity:<b> {climate.main?.humidity}%</b></li>
            <li  className='tips'><i class="fa-solid fa-temperature-half"></i> Pressure:<b> {climate.main?.pressure}hPa</b></li>
            <li  className='tips'><i class="fa-solid fa-cloud"></i> Clouds: <b> {climate.clouds?.all}% </b></li>
            <li> <i class="fa-solid fa-location-arrow"></i> Latitude: <b>{climate.coord?.lat}</b></li>
            <li> <i class="fa-solid fa-location-arrow"></i>Longitude: <b>{climate.coord?.lon}</b></li>
            </ul>
            </div>

    
            <p>Temperature:  {tempUnit ? climate.main?.temp : climate.main?.temp*9/5+32}{tempUnit ? '°C' : '°F'}</p>

            <button onClick={()=> setTempUnit(!tempUnit)}>Change temp units to {tempUnit ? 'Farenheit' : 'Celsius'}  </button>
        </div>
    );
};

export default Climate;