const button = document.querySelector(".button");
const inputValue = document.querySelector(".city");
const checkbox = document.querySelector(".checkbox");
const display = document.querySelector(".display");
let cities = JSON.parse(localStorage.getItem("cities")) || [];

const createCards = () => {
  display.innerText = "";
  for (let i = 0; i < cities.length; i++) {
    let div = document.createElement("div");
    div.classList.add("card");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "X";
    deleteButton.setAttribute("onclick", `removeCard(${i})`);

    const refetchButton = document.createElement("button");
    refetchButton.classList.add("delete-button");
    refetchButton.innerText = "Update";
    refetchButton.onclick = () => {
      submit(cities[i].name);
    };

    const timeStamp = document.createElement("p");
    timeStamp.innerText = cities[i].timeStamp;
    timeStamp.classList.add("mt-3");

    const HR = document.createElement("HR");

    const icon = document.createElement("img");
    const name = document.createElement("h2");
    const desc = document.createElement("p");
    const temp = document.createElement("p");

    name.innerText = cities[i]["name"];
    desc.innerText = cities[i]["weather"][0]["description"];
    temp.innerHTML =
      Math.round(cities[i]["main"]["temp"]) +
      (cities[i].metric ? " &deg;C" : " &deg;F");
    icon.src = [
      "http://openweathermap.org/img/wn/" +
        cities[i]["weather"][0]["icon"] +
        ".png",
    ];

    div.append(
      HR,
      name,
      desc,
      icon,
      temp,
      timeStamp,
      refetchButton,
      deleteButton
    );
    display.prepend(div);
  }
};

createCards();

const submit = async (name) => {
  const isCity = name || isNaN(inputValue.value);

  const unit = checkbox.checked ? "metric" : "imperial";

  let path = "https://api.openweathermap.org/data/2.5/weather?";
  if (isCity) {
    path += "q=";
  } else {
    path += "zip=";
  }
  path += `${
    name || inputValue.value
  }&appid=188d895134c8507cd1dacc245888d46e&units=${unit}`;
  //`https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=188d895134c8507cd1dacc245888d46e&units=${unit}`
  try {
    let response = await fetch(path);
    let data = await response.json();

    if (data.cod === 200) {
      data.timeStamp = new Date().toLocaleTimeString();
      data.metric = checkbox.checked;
      if (name) {
        cities = cities.map((city) => {
          if (city.name == name) {
            return data;
          } else {
            return city;
          }
        });
      } else {
        cities.push(data);
      }
    } else {
      throw new Error("Status Code not 200.");
    }

    createCards();

    localStorage.setItem("cities", JSON.stringify(cities));
  } catch (err) {
    alert("Something went wrong!");
  }
};

const removeCard = (index) => {
  cities.splice(index, 1);
  createCards();
  localStorage.setItem("cities", JSON.stringify(cities));
};

const toggleUnit = () => {
  const unitDisplay = document.getElementById("unit");
  if (checkbox.checked) {
    unitDisplay.innerHTML = "&deg;C";
  } else {
    unitDisplay.innerHTML = "&deg;F";
  }
};

button.addEventListener("click", () => submit(""));

inputValue.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    submit("");
  }
});
