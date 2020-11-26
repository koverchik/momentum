const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name');
  arrowRight = document.getElementById('arrow-right'),
  focus = document.querySelector('.focus'),
  quote = document.querySelector('.quote');


function showTime(){
  let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  let months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    day = today.getDate(),
    month = months[today.getMonth()],
    dayWeek = days[today.getDay()];
    timePeriod = "";

    time.innerHTML = `${dayWeek}, ${day} ${month} <br/> ${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
    setTimeout(showTime, 1000);
    if(min == 00){
      setBgGreet();
    }
}
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Введите имя]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

let arrayForIMGMorning = new Set();
let arrayForIMGDay = new Set();
let arrayForIMGEvening = new Set();
let arrayForIMGNight = new Set();

function createNamberIMG(array) {

  if(array.size < 6){
    array.add(getRandom(1, 20));
    createNamberIMG(array);
  }
  return array;
}
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const morning = Array.from(createNamberIMG(arrayForIMGMorning));
const imgDay = Array.from(createNamberIMG(arrayForIMGDay));
const evening = Array.from(createNamberIMG(arrayForIMGEvening));
const night = Array.from(createNamberIMG(arrayForIMGNight));
const allArray = morning.concat(imgDay, evening,night);

function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
    if(hour >= 6  && hour < 12){
      document.body.style.backgroundImage =
        `url('assets/images/morning/${addZero(allArray[hour])}.jpg')`;
      timePeriod = "Доброе утро";
    }else if(hour >= 12  && hour < 18){
      timePeriod =  "Добрый день";
      document.body.style.backgroundImage =
        `url('assets/images/day/${addZero(allArray[hour])}.jpg')`;
    }else if(hour >= 18  && hour < 24){
      timePeriod = "Добрый вечер";
      document.body.style.backgroundImage =
        `url('assets/images/evening/${addZero(allArray[hour])}.jpg')`;
    }else if(hour >= 0 && hour < 6){
      timePeriod = "Доброй ночи";
      document.body.style.backgroundImage =
        `url('assets/images/night/${addZero(allArray[hour])}.jpg')`;
    }
    greeting.innerHTML =  `${timePeriod},`;
}

function clickChangeBG(e) {
if(e.target.getAttribute("id") == "arrow-right" ){
    this.hour = this.hour + 1;
    if(this.hour == 24){
      this.hour = 0;
    }
    let imgEvening = arrayForIMGEvening.values();
    if(this.hour >= 6  && this.hour < 12){
      document.body.style.backgroundImage =
      `url('assets/images/morning/${addZero(allArray[this.hour])}.jpg')`;
      }else if(this.hour >= 12  && this.hour < 18){
        document.body.style.backgroundImage =
        `url('assets/images/day/${addZero(allArray[this.hour])}.jpg')`;
      }else if(this.hour >= 18  && this.hour <= 24 ){
        document.body.style.backgroundImage =
        `url('assets/images/evening/${addZero(allArray[this.hour])}.jpg')`;
      }else if(this.hour >= 0 && this.hour < 6){
        document.body.style.backgroundImage =
        `url('assets/images/night/${addZero(allArray[this.hour])}.jpg')`;
      }

    }

}
let today = new Date(),
hour = today.getHours();
arrowRight.addEventListener('click', {handleEvent: clickChangeBG, hour: hour});

//Добавление имени
function setName(e) {
   localStorage.setItem(this.field, e.target.innerText);

   if (e.type === 'blur') {
     if (localStorage.getItem(this.field) === "") {
       if(e.target.className == "name"){
            e.target.textContent = '[Введите имя]';
          }else if(e.target.className == "focus"){
            e.target.textContent = '[Введите цель]';
          }
       }

     }
  if(e.keyCode == 13){
    localStorage.setItem(this.field, e.target.innerText);
    e.target.blur();
  }

}

function nameFocus(e) {
    if (name.textContent == "[Введите имя]") {
            name.textContent = '';
            }

}

function searchName() {

  if (localStorage.getItem('name') === ""|| localStorage.getItem('name') == null) {
    name.textContent = '[Введите имя]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

function searchTargetDay(){
  if(localStorage.getItem('focus') === "" || localStorage.getItem('focus') == null) {
    focus.textContent = '[Введите цель]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}
function dayFocus(e) {
    if (focus.textContent == "[Введите цель]") {
            focus.textContent = '';
            }

}

name.addEventListener('keypress',{handleEvent: setName, field: "name"});
name.addEventListener('blur', {handleEvent: setName, field: "name"});
name.addEventListener('click',  nameFocus);

focus.addEventListener('keypress',{handleEvent: setName, field: "focus"});
focus.addEventListener('blur', {handleEvent: setName, field: "focus"});
focus.addEventListener('click', dayFocus);


showTime();
getName();
setBgGreet();
searchName();
searchTargetDay();
//получение цитаты
const blockquote = document.querySelector('.quote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.zing');
const autor = document.querySelector('.autor');
let textQuete = "";

async function getQuote() {
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
  const res = await fetch(url);
  const data = await res.json();

  blockquote.textContent = data.quoteText;
  autor.textContent = data.quoteAuthor;
}

document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

//Погода иконку погоды, данные о температуре, относительной влажности воздуха, скорости ветра.
const weatherIcon = document.querySelector('.weather-icon'),
temperature  = document.querySelector('.temperature'),
wet  = document.querySelector('.wet'),
wind = document.querySelector('.wind'),
city = document.querySelector('.city') ;



function cityFocus(e) {
    if (city.textContent == "[Ваш город]") {
            city.textContent = '';
            }

}

function searchCity(){
  if(localStorage.getItem('city') === "" || localStorage.getItem('city') === null) {
    city.textContent = '[Ваш город]';
  } else {
    city.textContent = localStorage.getItem('city');
  }
}

city.addEventListener('click',  cityFocus);
city.addEventListener('keypress',{handleEvent: getСityName, field: "city"});
city.addEventListener('blur', {handleEvent: getСityName, field: "city"});

searchCity();

async function getWeather(cityUser) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityUser}&lang=ru&appid=35e2aa7cbf44e898e6c1e52261dd50b1&units=metric`;
  const res = await fetch(url);
  if (res.ok) {
    const data = await res.json();
     weatherIcon.classList.add(`owf-${data.weather[0].id}`);
     temperature.textContent = `${data.main.temp}°C, ${data.weather[0].description}`;
     wet.textContent = `${data.main.humidity}% `;
     wind.textContent = ` ${data.wind.speed} м/с`;
} else {
  alert("Не можем найти такой город, попробуйте ввеси название ещё раз.");
  city.textContent= "";
  city.textContent = '[Ваш город]';
  localStorage.setItem("city", "");
  }
}

function getСityName(e) {
  localStorage.setItem(this.field, e.target.innerText);

  if (e.type === 'blur') {
      if(localStorage.getItem('city') != "" && this.field == "city"){
        let cityUser = localStorage.getItem('city');
        getWeather(cityUser);
      }
    if (localStorage.getItem(this.field) === "") {
      if(e.target.className == "city"){
           e.target.textContent = '[Ваш город]';
         }
      }

    }
 if(e.keyCode == 13){
   localStorage.setItem(this.field, e.target.innerText);
   e.target.blur();
 }
}

if(localStorage.getItem('city') != null){
  if(localStorage.getItem('city') != ""){
    let cityUser = localStorage.getItem('city');
    getWeather(cityUser);
  }
}
