window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperature = document.querySelector('.temp-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let locationCity = document.querySelector('.location-city');
  let temperatureDescription = document.querySelector('.temp-description');
  let ddmmyyyy = new Date().toLocaleDateString()

  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const d = new Date();
  let day = weekday[d.getDay()];



  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      // api key = 844bc26e5abd48b3b5ebc852fce4a98f
      const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=844bc26e5abd48b3b5ebc852fce4a98f&include=minutely&units=[M]`

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const {temp, ob_time, city_name, sunrise, sunset, pod} = data.data[0];
          locationCity.textContent = city_name;
          temperature.textContent = temp+'\u00B0' + 'C';
          temperatureDescription.textContent = data.data[0].weather.description;

        })
    });
  }
  locationTimezone.textContent = day + '  ' + ddmmyyyy;

});
