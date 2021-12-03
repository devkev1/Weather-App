const button = document.querySelector('.button');
const inputValue = document.querySelector('.inputValue');
const name = document.querySelector('.name');
const desc = document.querySelector('.desc');
const temp = document.querySelector('.temp');

button.addEventListener('click', submit = () => {
fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=188d895134c8507cd1dacc245888d46e')
    .then(response => response.json())
    .then(data => {
        const nameValue = data['name'];
        const tempValue = data['main']['temp'];
        const descValue = data['weather'][0]['description'];
        
        name.innerHTML = nameValue;
        temp.innerHTML = tempValue;
        desc.innerHTML = descValue;
    })
    .catch(err => alert("Wrong city name!"))
})

inputValue.addEventListener("keyup", function enter(e) {
    if (e.keyCode == 13) {
        submit();
    }
})
