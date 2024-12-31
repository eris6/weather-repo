import {processWeather} from './weather.js';
import rainPath from './images/rain.svg'

const searchBar = document.getElementById(`fname`);
const searchBtn = document.getElementById(`search-button`);
const cityLocation = document.getElementById(`city-display`);
const currTemp = document.getElementById(`curr-temp`);
const changeTempHeader = document.getElementById(`change-temp`);
const changeTemp = document.getElementById(`change-temp-img`);
const weatherIcon = document.getElementById(`weather-icon`);
let celsiusBool = true;

function changeIcon(condition){
    const weatherImg = document.createElement(`img`);

    switch (condition){
        case 'rain':
            weatherImg.src = rainPath;
        
        default:
            weatherImg.src = rainPath;
    }
    weatherImg.style.height = '10vh';
    weatherIcon.appendChild(weatherImg);
}


async function defaultWeather(){
    const processedData = await processWeather('edinburgh');
    console.log(processedData); 
    cityLocation.innerHTML = processedData[0];
    console.log(processedData[1]);
    currTemp.innerHTML = processedData[1][3] + `&#176;C`;

    console.log(processedData[1][6])
    changeIcon(processedData[1][6]);

}



searchBtn.addEventListener('click', async () => {
    weatherIcon.innerHTML = "";
    let weatherResults;

    if (searchBar.value){
        weatherResults = await processWeather(searchBar.value);
        if (weatherResults){
            cityLocation.innerHTML = weatherResults[0];
            let currentWeather = weatherResults[1];
            currTemp.innerHTML = currentWeather[3] + `&#176;C`;
            changeTempHeader.appendChild(changeTemp);
            console.log(currentWeather[6])
            changeIcon(weatherResults[6]);
            console.log('booba');
        }
        else{
            cityLocation.innerHTML = `Trouble retrieving ${searchBar.value}'s value!`;
            currTemp.innerHTML = "";
            changeTempHeader.innerHTML = '';

        }
    }
    else{
        weatherResults = await processWeather('edinburgh');
    }
    console.log(weatherResults);
    
})

changeTemp.addEventListener('click', async () => {
    let weatherResults;
    if (searchBar.value){
        weatherResults = await processWeather(searchBar.value);
    }
    else{
        weatherResults = await processWeather(`edinburgh`);
    }

    let currentWeather = weatherResults[1][3];
    let newTemp;

    if (celsiusBool){
        newTemp = ((currentWeather * 9/5) + 32).toFixed(1);
        currTemp.innerHTML = newTemp + `&#176;F`;
    }
    else{
        currentWeather = (currentWeather * 9/5) + 32;
        newTemp = ((currentWeather - 32) * 5/9).toFixed(1);
        currTemp.innerHTML = newTemp + `&#176;C`;
    }
    celsiusBool = !celsiusBool;
})

defaultWeather();

