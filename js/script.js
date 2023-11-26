let data = {
  weather: {
    cityName: "Minsk",
    id: "",
  },
  quote: {
    data: [],
    quote: "",
    author: "",
  },
};

// weather section

let inputCity = document.querySelector(".weather__city");
inputCity.value = data.weather.cityName;

const setLocalStorageCity = () => {
  localStorage.setItem("inputCity", inputCity.value);
};
inputCity.addEventListener("keyup", setLocalStorageCity);

const getLocalStorageCity = () => {
  if (localStorage.getItem("inputCity")) {
    inputCity.value = localStorage.getItem("inputCity");
  }
};
window.addEventListener("load", getLocalStorageCity);

inputCity.addEventListener("input", (e) => {
  data.weather.cityName = e.target.value;
});

document.addEventListener("click", (e) => {
  if (!inputCity.contains(e.target)) {
    weatherData();
    return;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    weatherData();
    return;
  }
});

const API_KEY = "f8d561866b001d4796fa6ed1b3dae7d2";
const baseUrlWeather = `https://api.openweathermap.org/data/2.5/weather?`;

const weatherWrite = (objWeather) => {
  let error = document.querySelector(".weather__error");
  let temperature = document.querySelector(".weather__temperature");
  let description = document.querySelector(".weather-description");
  let wind = document.querySelector(".weather__wind");
  let humidity = document.querySelector(".weather__humidity");
  let icon = document.querySelector(".weather__icon");

  if (objWeather.erorr) {
    error.innerHTML = objWeather.erorr;
    temperature.innerHTML = "";
    description.innerHTML = "";
    wind.innerHTML = "";
    humidity.innerHTML = "";
    icon.classList.remove(`owf-${data.weather.id}`);
    return;
  }
  error.innerHTML = "";
  temperature.innerHTML = `${Math.floor(objWeather.main.temp)}&degC`;
  description.innerHTML = `${objWeather.weather[0].description}`;
  wind.innerHTML = `Wind speed: ${Math.floor(objWeather.wind.speed)} m/s`;
  humidity.innerHTML = `Humidity: ${Math.floor(objWeather.main.humidity)} %`;
  icon.classList.add(`owf-${objWeather.weather[0].id}`);
  data.weather.id = objWeather.weather[0].id;
};

const weatherData = async () => {
  try {
    if (!data.weather.cityName) {
      let error = new Error("no value");
      throw error;
    }
    const result = await fetch(
      `${baseUrlWeather}q=${
        localStorage.getItem("inputCity") || data.weather.cityName
      }&lang=en&appid=${API_KEY}&units=metric`
    );
    if (result.status >= 200 && result.status < 300) {
      const dataWeather = await result.json();
      weatherWrite(dataWeather);
    } else {
      let error = new Error(result.statusText);
      throw error;
    }
  } catch (e) {
    weatherWrite({ erorr: `City${e}` });
  }
};

weatherData();

// quote section

const baseUrlQuote = "https://type.fit/api/quotes";

const quoteRandom = () => {
  return Math.floor(Math.random() * 1643);
};

const quoteWrite = (obj) => {
  data.quote.quote = obj.text;
  data.quote.author = obj.author;
  document.querySelector(".footer__quote").innerHTML = data.quote.quote;
  document.querySelector(".footer__author").innerHTML = data.quote.author;
};

const quoteData = async () => {
  const result = await fetch(baseUrlQuote);
  const dataQuote = await result.json();
  data.quote.data = dataQuote;
  const objQuote = data.quote.data[quoteRandom()];
  quoteWrite(objQuote);
};

quoteData();

const footerBtn = document.querySelector(".footer__change-quote");
let rotate = 0;

footerBtn.addEventListener("click", () => {
  rotate = rotate + 180;
  const objQuote = data.quote.data[quoteRandom()];
  quoteWrite(objQuote);
  footerBtn.style.transform = `rotate(${rotate}deg)`;
});

//clock section

const daysWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthDate = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let inputClock = document.querySelector(".clock__name");

const setLocalStorageClock = () => {
  localStorage.setItem("inputClock", inputClock.value);
};
inputClock.addEventListener("keyup", setLocalStorageClock);

const getLocalStorageClock = () => {
  if (localStorage.getItem("inputClock")) {
    inputClock.value = localStorage.getItem("inputClock");
  }
};
window.addEventListener("load", getLocalStorageClock);

const getDateHours = () => {
  let date = new Date();
  let hours = date.getHours();
  return hours;
};

const makeTimeGreeting = () => {
  let hours = getDateHours();

  if (hours >= 6 && hours < 12) {
    return "morning";
  }
  if (hours >= 12 && hours < 18) {
    return "afternoon";
  }
  if (hours >= 18 && hours < 24) {
    return "evening";
  }
  if (hours >= 0 && hours < 6) {
    return "night";
  }
};

window.onload = () =>
  window.setInterval(() => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let days = date.getDay();
    let month = date.getMonth();
    let numberMonth = date.getDate();
    let greeting = makeTimeGreeting();

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    let clockTime = `${hours}:${minutes}:${seconds}`;
    let clockDate = `${daysWeek[days]}, ${monthDate[month]} ${numberMonth}`;

    document.querySelector(".clock__time").innerHTML = clockTime;
    document.querySelector(".clock__date").innerHTML = clockDate;
    document.querySelector(".clock__greeting").innerHTML = `Good ${greeting}`;
  }, 1000);

// bg

const getRundomNumber = () => {
  let number = Math.floor(Math.random() * 20);
  if (number === 0) {
    return getRundomNumber();
  }
  return number.toString().padStart(2, "0");
};

const styleBgChange = (image) => {
  const img = new Image();
  img.src = image;
  img.addEventListener("load", () => {
    document.body.style.backgroundImage = `url(${image})`;
  });
};

let bgNumber = getRundomNumber();
let timeDay = makeTimeGreeting();

const getBg = (timeDay, bgNumber) => {
  const bgUrlGit = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeDay}/${bgNumber}.jpg`;
  styleBgChange(bgUrlGit);
};

const arrowLeft = document.querySelector(".slider__icon-prev");
const arrowRight = document.querySelector(".slider__icon-next");

arrowLeft.addEventListener("click", () => {
  bgNumber = bgNumber - 1;
  if (bgNumber < 1) {
    bgNumber = 20;
  }
  getBg(timeDay, bgNumber.toString().padStart(2, "0"));
});

arrowRight.addEventListener("click", () => {
  bgNumber = bgNumber + 1;
  if (bgNumber > 20) {
    bgNumber = 1;
  }
  getBg(timeDay, bgNumber.toString().padStart(2, "0"));
});

getBg(timeDay, bgNumber);

// audio playeer

const player = document.querySelector(".player");
const leftBtn = document.querySelector(".player__play-prev");
const rightBtn = document.querySelector(".player__play-next");
const play = document.querySelector(".player__play");
const progressContainer = document.querySelector(".player__progress-container");
const audio = document.querySelector(".player__audio");
const progress = document.querySelector(".player__progress");
const timeSound = document.querySelector(".player__progress-time");
const fulltimeSound = document.querySelector(".player__progress-fulltime");
const title = document.querySelector(".player__progress-name");
const turnNote = document.querySelector(".player__turn-note");
const offNote = document.querySelector(".player__off-note");
const songs = document.querySelectorAll(".player__song");
const playMini = document.querySelectorAll(".player__play-mini");

const songsArr = [
  {
    title: "Aqua Caelestis",
    src: "./assets/sounds/Aqua Caelestis.mp3",
    duration: "0:39",
  },
  {
    title: "Ennio Morricone",
    src: "./assets/sounds/Ennio Morricone.mp3",
    duration: "1:37",
  },
  {
    title: "River Flows In You",
    src: "./assets/sounds/River Flows In You.mp3",
    duration: "1:37",
  },
  {
    title: "Summer Wind",
    src: "./assets/sounds/Summer Wind.mp3",
    duration: "1:50",
  },
];

let sondIndex = 0;

const loadSong = (song) => {
  title.innerHTML = song.title;
  audio.src = song.src;
  fulltimeSound.innerHTML = `/${song.duration}`;
};

loadSong(songsArr[sondIndex]);

const playSong = () => {
  player.classList.add("play");
  play.classList.remove(".player__play");
  play.classList.add("player__pause");
  audio.play();
};

const pauseSong = () => {
  player.classList.remove("play");
  play.classList.remove("player__pause");
  play.classList.add(".player__play");
  audio.pause();
};

const addSongActiveClass = () => {
  songs.forEach((el) => {
    if (el.innerHTML.split("<")[0] === songsArr[sondIndex].title) {
      el.classList.add("item__active");
      el.style.opacity = "1";
      title.style.opacity = "1";
    }
  });
};
const removeSongActiveClass = () => {
  songs.forEach((el) => {
    el.classList.remove("item__active");
    el.style.opacity = "0.8";
    title.style.opacity = "0.8";
  });
};

const startPlaying = () => {
  const isPlaying = player.classList.contains("play");
  if (isPlaying) {
    pauseSong();
    removeSongActiveClass();
    return;
  }
  if (!isPlaying) {
    playSong();
    addSongActiveClass();
    return;
  }
};

play.addEventListener("click", startPlaying);

const addSongMiniActiveClass = (song) => {
  songs.forEach((el) => {
    if (el.innerHTML.split("<")[0] === song.title) {
      el.childNodes[1].classList.add("player__pause-mini");
      el.classList.add("item__active");
      el.style.opacity = "1";
      title.style.opacity = "1";
    }
  });
};
const removeSongMiniActiveClass = () => {
  songs.forEach((el) => {
    el.childNodes[1].classList.remove("player__pause-mini");
    el.classList.remove("item__active");
    el.style.opacity = "0.8";
    title.style.opacity = "0.8";
  });
};

const startPlayingMini = (newSoundMini) => {
  const isPlaying = player.classList.contains("play");
  if (isPlaying) {
    removeSongMiniActiveClass();
    pauseSong();
    return;
  }
  if (!isPlaying) {
    playSong();
    addSongMiniActiveClass(newSoundMini);
    return;
  }
};

playMini.forEach((el) =>
  el.addEventListener("click", () => {
    const clickPlayNameMini = el.parentNode.innerHTML.split("<")[0];
    const newSoundMini = songsArr.find((el) => el.title === clickPlayNameMini);
    sondIndex = songsArr.indexOf(newSoundMini);
    loadSong(newSoundMini);
    startPlayingMini(newSoundMini);
  })
);

const nextSong = () => {
  songs.forEach((el) => {
    el.childNodes[1].classList.remove("player__pause-mini");
  });
  sondIndex++;
  if (sondIndex > songs.length - 1) {
    sondIndex = 0;
  }
  loadSong(songsArr[sondIndex]);
  playSong();
  removeSongActiveClass();
  addSongActiveClass();
};
rightBtn.addEventListener("click", nextSong);

const prevSong = () => {
  songs.forEach((el) => {
    el.childNodes[1].classList.remove("player__pause-mini");
  });
  sondIndex--;
  if (sondIndex < 0) {
    sondIndex = songs.length - 1;
  }
  loadSong(songsArr[sondIndex]);
  playSong();
  removeSongActiveClass();
  addSongActiveClass();
};

leftBtn.addEventListener("click", prevSong);

audio.addEventListener("ended", () => {
  nextSong();
  removeSongActiveClass();
  addSongActiveClass();
});

const getUpDate = (e) => {
  console.log(e);
  const { duration, currentTime } = e.srcElement;
  const progressValue = (currentTime / duration) * 100;
  progress.style.width = `${progressValue}%`;
  timeSound.innerHTML = Math.floor(currentTime);
};

audio.addEventListener("timeupdate", getUpDate);

const setProgress = (e) => {
  console.log(e);
  const widthProgress = progressContainer.clientWidth;
  const clickx = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickx / widthProgress) * duration;
};

progressContainer.addEventListener("click", setProgress);

const range = document.querySelector(".player__turn-note");

const propelRange = () => {
  let rangeValue = range.value;
  range.style.background = `-webkit-linear-gradient(left, #a7a7a7d9 0%, #a7a7a7d9 ${rangeValue}%, #fff ${rangeValue}%, #fff 100%)`;
};

range.addEventListener("input", propelRange);

const changeVolume = () => {
  audio.volume = range.value / 100;
};

range.addEventListener("input", changeVolume);

const changeNote = () => {
  audio.muted = !audio.muted;
  offNote.classList.toggle("player__off-note--active");
};

offNote.addEventListener("click", changeNote);

// setting

const btnSetting = document.querySelector(".footer__settings-btn");
const allSetting = document.querySelector(".footer__settings-container");

const toggleSetting = () => {
  allSetting.classList.toggle("footer__settings-container--active");
};

btnSetting.addEventListener("click", toggleSetting);

/*
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  */

// todolist

const noteArr = [];

const inputNote = document.querySelector(".dragndrop__caption");
const textareaNote = document.querySelector(".dragndrop__text");
const inputColorNote = document.querySelector(".dragndrop__color");
const btnNote = document.querySelector(".dragndrop__btn");
const sectionNote = document.querySelector(".dragndrop");

const getNote = (el) => {
  let div = document.createElement("div");
  div.className = "dragndrop__note";
  div.draggable = "true";
  div.innerHTML = `<h2 class="dragndrop__note-title">${el.caption}</h2>
      <p class="dragndrop__note-text">${el.text}</p>`;
  div.style.backgroundColor = el.color;
  sectionNote.append(div);
};

const cleanValueInputNote = () => {
  inputNote.value = "";
  textareaNote.value = "";
};

const makeNewNote = () => {
  const note = {};
  note.caption = inputNote.value;
  note.text = textareaNote.value;
  note.color = inputColorNote.value;
  noteArr.push(note);
  getNote(note);
  cleanValueInputNote();
};

btnNote.addEventListener("click", makeNewNote);

const allowDrop = (event) => {
  event.preventDefault();
};

sectionNote.ondragover = allowDrop;
