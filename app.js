const button = document.querySelector(".button");
const inputValue = document.querySelector(".inputValue");
const checkbox = document.querySelector(".checkbox");
const display = document.querySelector(".display");
const cities = [];

const submit = () => {
    const unit = checkbox.checked ? "metric" : "imperial";
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        inputValue.value +
        "&appid=188d895134c8507cd1dacc245888d46e&units=" + unit
    )
      .then((response) => response.json())
      .then((data) => {
        data.metric = checkbox.checked;
        cities.push(data)
        console.log(cities);
        display.innerHTML = "";

        for (let i = 0; i < cities.length; i++) {
            
            let div = document.createElement("div");
            div.classList.add("card");
            
            const icon = document.createElement("img"); 
            const name = document.createElement("h2");
            const desc = document.createElement("p");
            const temp = document.createElement("p");
            
            name.innerHTML = cities[i]["name"];
            desc.innerHTML = cities[i]["weather"][0]["description"];
            temp.innerHTML = cities[i]["main"]["temp"] + (cities[i].metric ? " C" : " F");
            icon.src = [
                "http://openweathermap.org/img/wn/" + cities[i]["weather"] [0] ["icon"] + ".png"];

            div.append(name, desc, temp, icon);
            display.prepend(div);
        }
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

button.addEventListener("click", submit)

inputValue.addEventListener("keyup", function enter(e) {
  if (e.keyCode == 13) {
    submit();
  }
});
