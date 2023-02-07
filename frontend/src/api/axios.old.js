import axios from "axios";

export const api = axios.create({
  baseURL: "http://dragons.uz",
});

export const getPostsPage = async (pageParam = 1, code = "", options = {}) => {
  const response = await api.get(`/ping/data/${code}?page=${pageParam}`, options);

  return response.data;
};

export const deleteLog = async (id, options = {}) => {
  const response = await api.delete(`/ping/delete/${id}`, options);
  console.log("response", response);
  return response;
};
