import axios from "axios";

let API_WRAPPER;
let baseUrl;
// Create an instance of Axios

  API_WRAPPER = axios.create({
    baseURL: "http://localhost:3001/",
  });
  baseUrl = "http://localhost:3001/uploads";

export { baseUrl };

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; 
};

// Request interceptor
API_WRAPPER.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // If the token exists, add it to the request headers
    if (token) {
      config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
    }

    // You can add other custom logic here, such as adding additional headers or modifying the request

    return config;
  },
  (error) => {
    // Handle request error
    console.log(error);
    return Promise.reject(error);
  }
);

// Response interceptor
API_WRAPPER.interceptors.response.use(
  (response) => {
    // You can modify the response before returning it to the calling function
    return response;
  },
  (error) => {
    // Handle response error
    if (error.response && error.response.status === 401) {
      handleLogout(); // Call the handleLogout function to log out the user
    }
    return Promise.reject(error);
  }
);

export default API_WRAPPER;
