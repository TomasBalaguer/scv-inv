import { create } from "apisauce";

const apiClient = create({
    baseURL: "http://192.168.0.17:3000/"
  });

  export default apiClient;
