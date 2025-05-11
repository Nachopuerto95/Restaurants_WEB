import axios from "axios";


const http = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

http.interceptors.request.use(function (config) {
  config.headers.authorization = `BEARER ${localStorage.getItem("token")}`;
  return config;
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response.status === 401 &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      // navigate refreshing page
      localStorage.removeItem("token");
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

  export function createUser(data) {
    return http.post("/users", data)
      .catch(error => {
        if (error.response.status === 400) {
          const errorMessage = error.response.data.message || "Error occurred"; 
          throw new Error(errorMessage); 
        } else {
          throw error; 
        }
      });
}

export function doLogin(data) {
    return http.post("/login", data).then((response) => {
      localStorage.setItem("token", response.data.accessToken);

      return response;
    })
      .catch(error => {
        if (error.response.status === 400) {
          const errorMessage = error.response.data.message || "Error occurred"; 
          throw new Error(errorMessage); 
        } else {
          throw error; 
        }
      });
}

export function getProfile() {
  return http.get("/profile")
}

export function logout() {
  localStorage.removeItem("token");
}

export function getFormattedAddress(lat, lng) {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  return axios.get(url).then((response) => {
    return response.data; 
  });
}

export function getRestaurants(params) {
  return http.get("/restaurants", { params });
}
