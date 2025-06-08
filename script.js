// Home Button
function getCurrentPage() {
  return window.location.href;
}

// Refresh Page
function refreshPage() {
  window.location.reload();
}

// For Input Search
function setupGoogleSearch(inputId, buttonId) {
  const input = document.getElementById(inputId);
  const button = document.getElementById(buttonId);

  button.addEventListener("click", () => {
    const query = input.value.trim();
    if (query) {
      const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.open(url, "_blank");
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      button.click();
    }
  });
}
// Use in both places search boxes
setupGoogleSearch("input-top", "search-top");
setupGoogleSearch("input", "search");


// Digtal Clock 
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  const date = now.toLocaleDateString('en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  document.getElementById('time').textContent = time;
  document.getElementById('date').textContent = date;
}  
setInterval(updateClock, 1000);
updateClock(); // Initial call
  


//   For Images SlideShow
const imagePaths = [
  "images/A1.jpg",
  "images/A2.jpg",
  "images/A3.jpg",
  "images/A6.jpg",
  "images/A8.jpg",
  "images/A9.jpg",
  "images/A10.jpg",
  "images/A15.jpg",
  "images/A20.jpg",
  "images/A21.jpg",
  "images/A22.jpg"    
];
  
let currentIndex = 0;
const slideshowImg = document.getElementById("slideshow");
  
function showNextImage() {
  // Fade out
  slideshowImg.style.opacity = 0;
  
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % imagePaths.length;
    slideshowImg.src = imagePaths[currentIndex];
  
    // Fade in
    slideshowImg.style.opacity = 1;
  }, 1000); // Wait for fade-out to finish
}
  
// Initial setup
slideshowImg.src = imagePaths[currentIndex];
setInterval(showNextImage, 5000);



// For Weather Updates
const apiKey = "5e1cc00e2583b47327a65974bb6773a6";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weather-icon");

// Search by clicking the button
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") return;
  getWeather(city);
});

// Search by pressing Enter key
cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission if inside a form
    const city = cityInput.value.trim();
    if (city === "") return;
    getWeather(city);
  }
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod === "404") {
        alert("City not found!");
        return;
      }

      cityName.textContent = data.name;
      temperature.textContent = `${Math.round(data.main.temp)} °C`;
      humidity.textContent = `${data.main.humidity}%`;
      wind.textContent = `${data.wind.speed} Km/h`;
      weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    })
    .catch(error => {
      alert("Error fetching weather data.");
      console.error(error);
    });
}
