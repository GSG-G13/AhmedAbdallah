// Here we created the Api request to METEO Weather API
const url = 'https://api.codetabs.com/v1/proxy/?quest=https://api.codetabs.com/v1/proxy/?quest=https://api.open-meteo.com/v1/forecast?latitude=31.50&longitude=34.47&hourly=temperature_2m,rain,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto';
const xhr = new XMLHttpRequest();
const weatherCon = document.getElementById('weather')
xhr.open('GEt',`${url}`)
xhr.onload = function() {
  const response = JSON.parse(xhr.responseText);
  if (xhr.status >= 200 && xhr.status < 300) {
    
    let currentDayHour = new Date().getHours()
    let mainTemp = document.getElementById('mainTemp');
    mainTemp.innerText =  response.daily.temperature_2m_max[0];
    let cityName = document.getElementById('cityName')
    cityName.innerText = 'Palestine - GazaStrip - Gaza';
    let mainDataTime = document.getElementById('mainDataTime')
    let generalDate = new Date();
   

    // this code turens the day number into a day name
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date();
    const dayName = days[d.getDay()];
    
    //  this code will display time live as this 06:59 - Sunday, 6 Oct 23
    mainDataTime.innerText =  `${generalDate.getHours()}:${generalDate.getMinutes()} - ${dayName}, ${generalDate.getDate()} ${generalDate.getMonth()} ${generalDate.getFullYear()}`; 
    
    // this function will make change the weather icon(sun/clouds) based on the weather
    function mainIcon(parDef) {
      let cuurentWeekHour = ((d.getDay()-1)*24) + currentDayHour
      let mainImage =document.getElementById('mainImage')
      if (response.hourly.rain[cuurentWeekHour]>2.5) {
        mainImage.setAttribute('src','/images/sun-cloudy-fill.png')
      }
    }
    mainIcon();
    // here is a link for the details divs (max and min timpreture, sunrise and sunset time, wind,rain)
    let maxTemp = document.getElementById('maxTemp');
    maxTemp.innerText = response.daily.temperature_2m_max[0];
    let minTemp = document.getElementById('minTemp');
    minTemp.innerText = response.daily.temperature_2m_min[0];

    let sunriseTime = document.getElementById('sunriseTime');
    let fullSunRiseTime = response.daily.sunrise[0];
    let trimmedSunRiseTime = fullSunRiseTime.slice(11,16);
    sunriseTime.innerText = trimmedSunRiseTime;
    let sunsetTime = document.getElementById('sunsetTime');
    let fullSunSetTime = response.daily.sunset[0];
    let trimmedSunSetTime = fullSunSetTime.slice(11,16);
    sunsetTime.innerText = trimmedSunSetTime;

    // the startring and ending indeces of the reduce loop to get the avarage rain percaenge and wind speed throught the day;
    let today = new Date().getDay();
    let firstIndex = 24*(today-1);
    let lastIndex = 24*(today)


    let windSpeed = document.getElementById('windSpeed');
    let  windValue = response.hourly.windspeed_10m.slice(firstIndex,lastIndex+1).reduce((acc,current) => acc+current);
    windValue = windValue/24;
    windValue = windValue.toFixed(2);
    windSpeed.innerText = windValue;
    

    let rain = document.getElementById('rain');
    let  rainValue = response.hourly.rain.slice(firstIndex,lastIndex+1).reduce((acc,current) => acc+current);
    rainValue = rainValue/24;
    rain.innerText = rainValue;
    



  } else {
    console.log('Request failed!');
  } 
};  
xhr.send();
