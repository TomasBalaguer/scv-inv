import { create } from "apisauce";

const apiClient = create({
    baseURL: "http://192.168.0.17:3081/"
  });

  export default apiClient;
