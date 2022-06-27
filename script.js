// Array of objects

let weather = {
  //storing api key into an array element
  //API KEY GOES HERE...
  apiKey: 'bf7f41a91264a2494c334818ec809ba5',

  //function to fetch the data from the open weather api

  fetchWeather: function (city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&appid=' +
        this.apiKey +
        '&units=metric'
    )
      .then((response) => {
        if (!response.ok) {
          alert('No Weather found.');
          throw new Error('No weather found.');
        }
        return response.json();
      })

      .then((data) => this.displayWeather(data));
  },

  //   function to display the fetched data :: Also fetching the desired data from the api only

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    //   Populating the UI with the data from the API
    document.querySelector('.city').innerText = `Weather in ${name}`;
    document.querySelector(
      '.icon'
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector('.description').innerText = description;

    document.querySelector('.temp').innerText = `${temp} °C'`;
    document.querySelector('.humidity').innerText = `Humidity : ${humidity} %`;

    document.querySelector('.wind').innerText = `Wind Speed : ${speed} km/h`;
    document.querySelector('.weather').classList.remove('loading');
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },

  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value);
  },
};

document.querySelector('.search button').addEventListener('click', function () {
  weather.search();
});

document
  .querySelector('.search-bar')
  .addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
      weather.search();
    }
  });

weather.fetchWeather('New Delhi');
