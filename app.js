const button = document.querySelector(".button");
const inputValue = document.querySelector(".city");
const checkbox = document.querySelector(".checkbox");
const display = document.querySelector(".display");
const cities = JSON.parse(localStorage.getItem("cities")) || [];

createCards();

const submit = () => {
  const isCity = isNaN(inputValue.value);
  console.log(isCity ? "It's a city!" : "It's a zip code!");

  const unit = checkbox.checked ? "metric" : "imperial";

  let path = "https://api.openweathermap.org/data/2.5/weather?";
  if (isCity) {
    path += "q=";
  } else {
    path += "zip=";
  }
  path += `${inputValue.value}&appid=188d895134c8507cd1dacc245888d46e&units=${unit}`;
  //`https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=188d895134c8507cd1dacc245888d46e&units=${unit}`
  fetch(path)
    .then((response) => response.json())
    .then((data) => {
      data.metric = checkbox.checked;

      if (data.cod === 200) {
        data.timeStamp = new Date().toLocaleTimeString(); 
        cities.push(data);
      } else {
        throw Error;
      }

      display.innerHTML = "";
      createCards();

      localStorage.setItem("cities", JSON.stringify(cities));
      console.log(data);
    })
    .catch(() => alert("Something went wrong!"));
};

function createCards() {
  for (let i = 0; i < cities.length; i++) {
    let div = document.createElement("div");
    div.classList.add("card");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "X";

    const timeStamp = document.createElement("p");
    timeStamp.innerText = cities[i].timeStamp;

    const HR = document.createElement("HR");

    const icon = document.createElement("img");
    const name = document.createElement("h2");
    const desc = document.createElement("p");
    const temp = document.createElement("p");

    name.innerHTML = cities[i]["name"];
    desc.innerHTML = cities[i]["weather"][0]["description"];
    temp.innerHTML =
      Math.round(cities[i]["main"]["temp"]) +
      (cities[i].metric ? " &deg;C" : " &deg;F");
    icon.src = [
      "http://openweathermap.org/img/wn/" +
        cities[i]["weather"][0]["icon"] +
        ".png",
    ];

    div.append(HR, name, desc, icon, temp, timeStamp, deleteButton);
    display.prepend(div);

    const removeCard = (e) => {
      let display = document.querySelector(".display");
      display.removeChild(div);

      cities.splice(i, 1);
      localStorage.setItem("cities", JSON.stringify(cities));
    };
    deleteButton.addEventListener("click", removeCard);
  }
}

const toggleUnit = () => {
  const unit = document.getElementById("unit");
  if (checkbox.checked) {
    unit.innerHTML = "&deg;C";
  } else {
    unit.innerHTML = "&deg;F";
  }
};

button.addEventListener("click", submit);

inputValue.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    submit();
  }
});
