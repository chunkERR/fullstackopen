import axios from "axios";

const baseURL = "/api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.
  then((response) => response.data)
  .catch((error) => {
    if (error.response) {
      console.log(error.response.data)
    }
    throw error
  });
};

const create = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then((response) => response.data);
};

const remove = (id, newObject) => {
  const request = axios.delete(`${baseURL}/${id}`, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  remove,
  update,
};
