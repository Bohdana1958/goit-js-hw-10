import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_EpI2AskpjZzqbKW98a5jHFm0nA93wyK3gOJynaFbNtCzvLqwZ5bLdT6rWOxQXJn0';


function fetchBreeds() {
    return axios.get('https://api.thecatapi.com/v1/breeds')
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
};


function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => response.data[0]);

}

export { fetchBreeds, fetchCatByBreed };


