import Notiflix from "notiflix";
import SlimSelect from "slim-select";
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const container = document.querySelector('.breed-select');
console.log(container);
const load = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');


container.style.visibility = 'hidden';

fetchBreeds()
    .then(breeds =>{
        container.style.visibility = 'visible';
        load.style.display = 'none';

        const cat = breeds.map(breed =>
            `<option value="${breed.id}">${breed.name}</option>`).join('');

        container.insertAdjacentHTML('beforeend', cat);
    })
    .catch(error =>{
        console.log(error);
        load.style.display = 'none';
        Notiflix.Report.failure('Oops! Something went wrong! Try reloading the page!');
    });

    container.addEventListener('change', handleChange);

    function handleChange() {
        catInfo.innerHTML = '';
        const  selectedBreed = this.value;

        load.style.display = 'none';

        fetchCatByBreed(selectedBreed)
        .then(breeds => {
            load.style.display = 'none';
            const catData = breeds[0];

            catInfo.innerHTML = `
        <div><img src="${catData.url}" alt="${catData.breeds[0].name}" width="400"></div>
        <div>
        <h3>${catData.breeds[0].name}</h3>
        <p>Description: ${catData.breeds[0].description}</p>
        <p>Temperament: ${catData.breeds[0].temperament}</p>
        </div>
            `;
            
        })
        .catch(error => {
            console.log(error);
            Notiflix.Report.failure('Oops! Something went wrong! Try reloading the page!');
        });
    }

    