import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:2000/',
    // withCredentials: true,  // Uncomment this if you want to send cookies with requests
    headers: {
        'Content-Type': 'application/json', // Ensure that we are sending JSON data
        'Accept': 'application/json',        // Ensure that we expect a JSON response
    }
});

export default api