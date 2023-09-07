const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer =  document.querySelector(".weather-container")

const grantAccessContainer = document.querySelector(".grant-location-container")
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
console.log(userTab);
console.log(searchTab);
console.log(userContainer);
console.log(grantAccessContainer);
console.log(searchForm);
console.log(loadingScreen);
console.log(userInfoContainer);
const clearBtn = document.querySelector('.clear');



let currentTab = userTab;

const API_KEY = 'd33d0621a530495aad661430230109';
currentTab.classList.add("current-tab");
getfromSessionStorage();



function switchTab(clickedTab) {
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab");
        
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            // if search tab was invisible then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");

        }

        else{
            // current tab was search tab but now it is your weather tab so make it visible and invisible previous tab
            searchForm.classList.remove("active");
            userInfoContainer.classList.add("active");
            grantAccessContainer.classList.remove("active");
            // now current tab is  your weather tab now have to display weather so let's check local storage first for coordinates , if //////////have /////aved them there
            getfromSessionStorage();
        }
    }
}


userTab.addEventListener('click',()=>{
    //pass clicked tab as input parameter
    switchTab(userTab);
})

searchTab.addEventListener('click',()=>{
    // pass clicked tab as input parameter
    switchTab(searchTab);
})

// check if coordinates are already present in session storage
function getfromSessionStorage(){
   const localCoordinates = sessionStorage.getItem("user-coordinates")
   console.log(localCoordinates);

   if(!localCoordinates){
    // if not there
    grantAccessContainer.classList.add("active")
    console.log('oho');

   }
   else{
    const coordinates = JSON.parse(localCoordinates);
    fetchUserWeatherInfo(coordinates);
   }
}

 async function fetchUserWeatherInfo(coordinates){
    const {lat,lon} = coordinates;
    //  make grancontainer invisible

    grantAccessContainer.classList.remove("active")
    // make loading visible

    loadingScreen.classList.add("active");

    // API call

    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`);
        console.log(response);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (error) {
        loadingScreen.classList.remove("active")
        console.log(error);
    }
}

 async function renderWeatherInfo(data){

    // fetching the elements
    const cityName = document.querySelector("[data-cityName]")
    const countryIcon = document.querySelector("[data-countryIcon]")
    const desc = document.querySelector("[data-weatherDesc]")
    const weatherIcon = document.querySelector("[data-weatherIcon]")
    const temp = document.querySelector("[data-temp]")
    const windspeed = document.querySelector("[data-windspeed]")
    const humidity = document.querySelector("[data-humidity]")
    const cloudiness = document.querySelector("[data-cloudiness]")


    // fetch values from weatherINfo object and put it uI elements
    cityName.innerText = data?.location?.name;
    console.log(cityName);
    const allData = await fetch(`https://restcountries.com/v3.1/name/${data?.location?.country}`);
    const countryData = await allData.json();
    console.log( "mycountry data" ,countryData);
    const countryN = await countryData?.[0].cca2.toLowerCase();
    console.log( "my data " + countryN);
    
    
    countryIcon.src = `https://flagcdn.com/144x108/${countryN}.png`;
    desc.innerText = data?.current?.condition?.text;
    // weatherIcon.src = `https://cdn.weatherapi.com/${data?.current?.condition?.text}/64x64/day/302.png`;
    temp.innerText = `${data?.current?.temp_c} °C`;
    windspeed.innerText = `${data?.current?.wind_kph} kph`;
    humidity.innerText = `${data?.current?.humidity} %`;
    cloudiness.innerText = `${data?.current?.cloud} %`;
}


const grantAccessButton = document.querySelector("[data-grantAccess]");
console.log(grantAccessButton);
grantAccessButton.addEventListener('click',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert('no geo location available')
    }

})

function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon:position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}




searchForm.addEventListener('click',()=>{

})


const searchInput = document.querySelector("[data-searchInput]");

clearBtn.addEventListener('click',()=>{
    searchInput.value = "";
})

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === ""){
        return;
    }
    else{
        fetchSearchWeatherInfo(cityName);
    }
})


async function fetchSearchWeatherInfo(cityName){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active")
    grantAccessContainer.classList.remove("active");

    try {
        
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`)
        
        const data = await response.json();
        // if (!data.sys) {
        //     throw data;
        // }
        loadingScreen.classList.remove("active")
        userInfoContainer.classList.add("active")
        renderWeatherInfo(data);
    } catch (error) {
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.remove("active");
        console.log("Invalid city");
    }


}



