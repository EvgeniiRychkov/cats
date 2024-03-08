const breedId = new URLSearchParams(window.location.search).get('id');
const API_BREED_URL = `https://api.thecatapi.com/v1/breeds/${breedId}`;
const API_BREED_IMAGES_URL =`https://api.thecatapi.com/v1/images/search?limit=25&breed_ids=${breedId}`;
const API_KEY = "live_hLN72JeeHHUm1N7rJHNfJws4rr52Jpo1vsvtOuW4nE8FKquXLP4zc5q6HwCvdkf7"

const requestOptions = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
    } 
};

fetchAndRenderBreed();

async function fetchAndRenderBreed() {
    const breed = await requestBreed();
    renderBreedInformation(breed);
    const images = await requestImages();
    renderImages(images);
}

async function requestBreed() {
    try {
        let response = await fetch(API_BREED_URL, requestOptions);

        if (!response.ok) { 
            throw new Error('Network response was not ok'); 
        } 

        return response.json();
    } catch (error) {
        console.log(error); 
    }
}

async function renderBreedInformation(breed) {
    let html = '';

    if (breed) {
        html = `<h2>${breed.name} <span class="breed-origin">(${breed.origin})</span></h2>
                <div>${breed.description}</div>
                <br>
                <div>${breed.temperament}</div>
                <br>
                <a href="${breed.wikipedia_url}" target="_blank">WIKIPEDIA</a>`
    } else {
        html = '<h1>Error. Please try again later.</h1>'
    }

    let container = document.querySelector('.container');
    container.innerHTML = html;
}

async function requestImages() {
    try {
        let response = await fetch(API_BREED_IMAGES_URL, requestOptions);

        if (!response.ok) { 
            throw new Error('Network response was not ok'); 
        } 

        return await response.json();
    } catch (error) {
        console.log(error); 
        return [];     
    }    
}

async function renderImages(images) {
    let html = '<br><div class="row">';

    images.forEach(image => {
        html += `<div class="breed">
                    <img src="${image.url}" class="breed-image" onclick="openImage(this)">
                </div>`;
    });

    html += '</div>'

    document.querySelector('.images-container').innerHTML = html;;
}

function openImage(image) {
    const modalImage = document.createElement('img');
    modalImage.src = image.src;
    modalImage.style.maxWidth = '95%';
    modalImage.style.maxHeight = '95%';

    const modalContainer = document.createElement('div');
    modalContainer.style.position = 'fixed';
    modalContainer.style.top = '0';
    modalContainer.style.left = '0';
    modalContainer.style.width = '100%';
    modalContainer.style.height = '100%';
    modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modalContainer.style.display = 'flex';
    modalContainer.style.justifyContent = 'center';
    modalContainer.style.alignItems = 'center';

    modalContainer.appendChild(modalImage);
    document.body.appendChild(modalContainer);

    modalContainer.addEventListener('click', function() {
        document.body.removeChild(modalContainer);
    });
}