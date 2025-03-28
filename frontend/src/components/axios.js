import axios from "axios";

const instance = axios.create({
  //baseURL: "https://my-messaging-app-dfa81ccc53e6.herokuapp.com/",
  baseURL: "http://localhost:9000",
});

export default instance;
