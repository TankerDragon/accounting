import axios from "axios";

export const api = axios.create({
  baseURL: "http://dragons.uz",
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //   },
});

export const getPostsPage = async (pageParam = 1, code = "", options = {}) => {
  //   axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  const response = await api.get(
    `/ping/data/${code}?page=${pageParam}`,
    options
  );

  return response.data;
};

export const deleteLog = async (id, options = {}) => {
  const response = await api.delete(`/ping/delete/${id}`, options);
  console.log("response", response);
  return response;
};
