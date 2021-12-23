import client from "./client";

const endpoint = "/api/v1";

const getUser = () => {
  return client.get(`${endpoint}/user/61c2bd4e32999716185b7560`);
};

const getBonos = () => {
  return client.get(`${endpoint}/bonos`);
};

const getBono = (id) => {
    return client.get(`${endpoint}/bonos/${id}`);
  };

export default {
  getUser,
  getBonos,
  getBono
};
