import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burgerbuilder-33c98.firebaseio.com/"
});

export default instance;
