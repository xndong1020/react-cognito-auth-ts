import axios from "axios";

const instance = axios.create({
  baseURL: "https://w01ymhfc78.execute-api.ap-southeast-2.amazonaws.com/dev",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
