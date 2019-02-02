import { create } from 'apisauce';

// define the api
const swapi = create({
    baseURL: 'https://swapi.co/api',
});

export default swapi;
