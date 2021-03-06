import axios from "axios";

const API_BASE_URL = "https://young-beyond-38132.herokuapp.com/";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  mode: 'cors',

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  headers: { "X-Requested-With": "XMLHttpRequest", 'Accept': 'application/json' }
});


export default client;