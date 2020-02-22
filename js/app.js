const select = document.getElementById("breeds");
const card = document.querySelector(".card");
const form = document.querySelector("form");
const breedUrl = "https://dog.ceo/api/breed/${breed}/images";

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetchData("https://dog.ceo/api/breeds/image/random").then(data =>
    generateImage(data)
);

fetchData("https://dog.ceo/api/breeds/list/all").then(data => {
    const dataMessage = data.message;
    const messageKeys = Object.keys(dataMessage);
    generationOptions(messageKeys);
});

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.error("Looks like there was an error", error));
}

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

// ------------------------------------------
//  POST DATA
// ------------------------------------------
