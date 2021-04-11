window.addEventListener('load', ()=>{
	let long; //longitude
	let lat; //latitude
	let tempDecrip = document.querySelector(".temp-description");
	let tempDeg = document.querySelector(".temp-degree");
	let LocCity = document.querySelector(".location-city");
	let LocLabel = document.querySelector(".location-label");
	let maxTemp = document.querySelector(".temp-high");
	let minTemp = document.querySelector(".temp-low");
	let iconImg = document.querySelector("#icon");

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat =position.coords.latitude; 

			const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}8&lon=${long}&appid={appid}`
		
			fetch(api) //getsinforfromtheapi
				.then(response => { 
					return response.json();
			})
			.then(data => {
				let fahren = "F"; 
				//console.log(data); //  to access data 
				const {icon} = data.weather[0];
				const {temp, temp_min, temp_max} = data.main;

				const iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
				iconImg.src = iconURL;

				//SET DOM Elements from the API
				//LocLabel.textContent = icon; //gets the icon 

				LocCity.textContent = data.name;  //gets city name 
				
				let kelvinTemp = temp; //gets temperature 
				let convertedTemp = (kelvinTemp -273.15)*(9/5)+32;
				tempDeg.textContent = Math.floor(convertedTemp);
		

				let kelvinMaxTemp = temp_max; //gets max temp 
				let convertedMaxTemp = (kelvinMaxTemp -273.15)*(9/5)+32;
				maxTemp.textContent = Math.floor(convertedMaxTemp)+ "\u00B0"+fahren; 


				let kelvinMinTemp = temp_min; //gets min temp 
				let convertedMinTemp = (kelvinMinTemp -273.15)*(9/5)+32;
				minTemp.textContent = Math.floor(convertedMinTemp)+"\u00B0"+fahren; 

				

	


				//get description and link it to pic 

			}); 

		});

		 
	}
	else{
		h1.textContent = "Make sure geolocation is on, or make sure browser uses this"
	}

});