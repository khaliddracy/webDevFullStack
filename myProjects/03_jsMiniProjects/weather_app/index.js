
// const API_KEY = 'd33d0621a530495aad661430230109';



// // function goSearch(){
// //     const cityName = document.querySelector('input').value;
// // console.log(cityName);
// // }


// function renderWeatherInfo(data){
  
//     let newPara = document.createElement('p');
//     newPara.textContent = data + 'c';
//     document.body.appendChild(newPara)
// }


// async function fetchWeatherData(){
       
//     try {
//         const city = 'goa';
//     const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
//     const data = await response.json();

//     console.log(data);
   
//     let temp = data.current.temp_c;
//     renderWeatherInfo(temp)
    
  
//     } catch (error) {
        
//     }
   

// }
// fetchWeatherData()

// async function getCustomWeatherData(lati,long){
//    try {
//     const lat = lati;
//     const lon = long;

//     let result = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`);
//     const data = await result.json();
//     console.log(data);
//     const temp1 = data.current.temp_c;
//     renderWeatherInfo(temp1)

    
//    } catch (error) {
//     console.log("Error found" ,error);
//    }
  

   

// }

// // getCustomWeatherData();


// getLocation()
// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         console.log('No location');
//     }


// }

// function showPosition(position){
//     let lat = position.coords.latitude;
//     let lon = position.coords.longitude;
//     console.log(lat);
//     console.log(lon);
//     getCustomWeatherData(lat,lon)
// }

const API_KEY = 'd33d0621a530495aad661430230109';



async function fetchWeatherData(cityName){
       
    try {
        const city = cityName;
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
    const data = await response.json();

    console.log(data);
   
    let temp = data.current.temp_c;
    renderWeatherInfo(temp)
    
  
    } catch (error) {
        
    }
   

}


function goSearch(){
    const cityValue = document.querySelector('input').value;
   fetchWeatherData(cityValue);
}



function renderWeatherInfo(data){
  
    let newPara = document.createElement('p');
    newPara.textContent = data + 'c';
    document.body.appendChild(newPara)
}
