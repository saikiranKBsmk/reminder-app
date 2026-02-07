import axios from "axios";

export const postApiCall = (endpoint, request) => {
  return axios
    .post(endpoint, request, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return Promise.reject({
          status: error.response.status,
          message:
            error.response.data?.detail ||
            error.response.data?.message ||
            "Request failed",
        });
      }

      // NETWORK / TIMEOUT ERROR
      if (error.request) {
        return Promise.reject({
          status: 0,
          message: "Server not reachable",
        });
      }

      // UNKNOWN ERROR
      return Promise.reject({
        status: 0,
        message: "Unexpected error occurred",
      });
    });
};
