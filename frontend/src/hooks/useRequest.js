import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import useMessage from "./useMessage";
import axios from "../api/axios";

const useRequest = (url) => {
  const { auth } = useAuth();
  const { createMessage } = useMessage();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   getData();
  // }, []);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + auth.accessToken,
        },
        // withCredentials: true,
      });
      setIsLoading(false);
      setData(response.data);
      console.log("response data: ", response.data);
    } catch (err) {
      setIsLoading(false);
      if (!err?.response) {
        createMessage({ type: "danger", content: "No Server Response" });
      } else if (err.response.status === 401) {
        navigate("/login");
      } else if (err.response.status === 403) {
        createMessage({ type: "danger", content: err.response.data.detail });
      } else {
        createMessage({ type: "danger", content: err.message });
      }
    }
  };

  const postPutData = async (method, log, closeForm) => {
    setErrors({});
    setIsLoading(true);

    try {
      let response;
      if (method === "POST") {
        response = await axios.post(url, JSON.stringify(log), {
          headers: {
            "Content-Type": "application/json",
            Authorization: "JWT " + auth.accessToken,
          },
          // withCredentials: true,
        });
      } else if (method === "PUT") {
        response = await axios.put(url + "?id=" + log.id, JSON.stringify(log), {
          headers: {
            "Content-Type": "application/json",
            Authorization: "JWT " + auth.accessToken,
          },
          // withCredentials: true,
        });
      }

      setIsLoading(false);
      console.log("response###", response);
      if (response.status === 201 || response.status === 200) {
        if (response.data) {
          createMessage({ type: "success", content: response.data.success });
        }
        closeForm({ reload: true });
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      if (!err?.response) {
        createMessage({ type: "danger", content: "No Server Response" });
      } else if (err.response?.status === 400) {
        if (err.response.data) {
          const newErrors = {};
          Object.keys(err.response.data).forEach((s) => {
            newErrors[s] = err.response.data[s];
          });
          setErrors(newErrors);
        }
      } else if (err.response.status === 401) {
        navigate("/login");
      } else if (err.response.status === 403) {
        createMessage({ type: "danger", content: err.response.data.detail });
      } else {
        createMessage({ type: "danger", content: err.message });
      }
    }
  };

  return { data, errors, isLoading, getData, postPutData };
};

export default useRequest;
