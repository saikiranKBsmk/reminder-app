import { BASE_URL } from "./config";
import apiUrls from "./urls";
import {postApiCall} from "./utils"

console.log(BASE_URL)
export const createReminder = (request) => {
  const url = BASE_URL + apiUrls["CREATE_REMINDER"];
  return postApiCall(url, request);
};