import { useState } from "react";

const api = {
  key: "56f5b64564dee901db7f70c2f19c29be",
  base: "https://api.openweathermap.org/data/2.5/"
}




function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const dateBuilder = (d) => {
    let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  
    let day = days[d.getDay()]
    let month = months[d.getMonth()]
    let date = d.getDate()
    let year = d.getFullYear()
  
    return `${day} ${date} ${month} ${year}`
  }

  const search = (evt) =>{
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result =>{
        setWeather(result);
        setQuery('');
        console.log(result);
      })
    }
  }




  return (
    <div className={ (typeof weather.main !="undefined") ? ((weather.main.temp>16) ? "App Warm" : "App") : "App"}>
      <main>

        <div className='Search-Box'>
        <input type='text' className='Search-Bar' placeholder='Search...' onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && search(e)} />
        </div>

        {(typeof weather.main != "undefined") ? (<div>
          <div className="Location-Box">
          <div className="Location">
            {weather.name}, {weather.sys.country}
          </div>
          <div className="Date">
            {dateBuilder(new Date())}
          </div>
        </div>


        <div className="Weather-Box">
          <div className="Tempt">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="Weather">
            {weather.weather[0].main}
          </div>
        </div>

        </div>):('')}


      </main>
    </div>



  )
}

export default App
