const API_URL = 'https://api.thecatapi.com/v1/breeds'
const API_KEY = "live_hLN72JeeHHUm1N7rJHNfJws4rr52Jpo1vsvtOuW4nE8FKquXLP4zc5q6HwCvdkf7"

const requestOptions = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
    } 
};

fetchAndRenderBreeds();

async function fetchAndRenderBreeds() {
    const breeds = await requestBreeds();
    renderBreeds(breeds);
}

async function requestBreeds() {
    try {
        let response = await fetch(API_URL, requestOptions);

        if (!response.ok) { 
            throw new Error('Network response was not ok'); 
        } 

        return response.json();
    } catch (error) {
        console.log(error); 
    }
}

async function renderBreeds(breeds) {
    let html = '';
    
    if (breeds) {
        html = '<div class="row">';
        breeds.forEach(breed => { html += createBreedElement(breed); });
        html += '</div>';
    } else {
        html = '<h1>Error. Please try again later.</h1>'
    }

    document.querySelector('.container').innerHTML = html;
}

function createBreedElement(breed) {
    if (!breed.image) { return '' }

    return `<div class="breed">
                <div class="breed-name">${breed.name}</div>
                <a href="breed.html?id=${breed.id}">
                    <img src="${breed.image.url}" class="breed-image">
                </a>
            </div>`;
}