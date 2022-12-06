import { environments } from "src/environments";

const apiUrl = environments.API_URL;

export const URLS = {
  REGISTER_USER: apiUrl + "/users/",
  LOGIN_USER: apiUrl + "/users/login/",
  USER_FEED: (id: string) => apiUrl + "/tweets/feed/" + id,
  POST_TWEET: apiUrl + "/tweets/",
  GET_ALL_USERS: apiUrl + "/users/",
  FOLLOW_USER: apiUrl + '/users/follow/',
  UNFOLLOW_USER: apiUrl + '/users/unfollow/',
};