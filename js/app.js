const select = document.getElementById("breeds");
const card = document.querySelector(".card");
const form = document.querySelector("form");
const breedUrl = "https://dog.ceo/api/breed/${breed}/images";

// ------------------------------------------
//  FETCH FUNCTIONS -
//  HERE WE HAVE SEPERATE FETCH FUNCTIONS BUT
//  WE HAVE USED PROMISE ALL AND USED ALL TOGEHTER IN ONE CALL
// ------------------------------------------
// fetchData("https://dog.ceo/api/breeds/image/random").then(data =>
//     generateImage(data)
// );

// fetchData("https://dog.ceo/api/breeds/list/all").then(data => {
//     const dataMessage = data.message;
//     const messageKeys = Object.keys(dataMessage);
//     generationOptions(messageKeys);
// });

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.error("Looks like there was an error", error));
}

//PROMISE.ALL RESOLVES ALL THE FETCH PROMISES TOGHETHER.
//ITS ONE OR NONE METHOD. IF ONE FAILS ALL FAILS
Promise.all([
    fetchData("https://dog.ceo/api/breeds/image/random"),
    fetchData("https://dog.ceo/api/breeds/list/all")
]).then(data => {
    const breedsList = data[1].message;
    const breeds = Object.keys(breedsList);
    const images = data[0];
    generationOptions(breeds);
    generateImage(images);
});
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
    if (response.ok == true) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}
function generationOptions(data) {
    let options = "";
    data.map(item => {
        options += `
        <option value='${item}'>${item}</option>`;
    });
    select.innerHTML = options;
}

function generateImage(data) {
    const html = `
        <img src='${data.message}' alt=''>
        <p>Click to view images of ${select.value}s</p>`;
    card.innerHTML = html;
}

function fetchBreedImage() {
    const breed = select.value;
    const img = card.querySelector("img");
    const p = card.querySelector("p");
    fetchData(`https://dog.ceo/api/breed/${breed}/images/random`).then(data => {
        img.src = data.message;
        img.alt = breed;
        p.textContent = `Click to view more ${breed}s`;
    });
}
// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener("change", fetchBreedImage);
card.addEventListener("click", fetchBreedImage);
form.addEventListener("submit", postData);

// ------------------------------------------
//  POST DATA
// ------------------------------------------

function postData(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const comment = document.getElementById("comment").value;
    const config = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, comment })
    };

    fetch("https://jsonplaceholder.typicode.com/comments", config)
        .then(checkStatus)
        .then(response => response.json())
        .then(data => console.log(data));
}
