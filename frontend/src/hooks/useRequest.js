import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useMessage from "./useMessage";
import axios from "../api/axios";

const useRequest = (url) => {
  const { auth } = useAuth();
  const { createMessage } = useMessage();

  const [data, setData] = useState([]); // data can be an object or an array

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(url, {
        headers: { "Content-Type": "application/json", Authorization: "JWT " + auth.accessToken },
        // withCredentials: true,
      });
      console.log("###***data", response.data);
      setData(response.data.drivers);
      console.log("$$", data);
    } catch (err) {
      createMessage({ type: "danger", content: err.message });
    }
  };
  return { data };
};

export default useRequest;
