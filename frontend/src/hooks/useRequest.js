import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useMessage from "./useMessage";
import axios from "../api/axios";

const useRequest = (url) => {
  const { auth } = useAuth();
  const { createMessage } = useMessage();

  const [drivers, setDrivers] = useState([]);
  const [dispatchers, setDispatchers] = useState([]);

  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    try {
      const response = await axios.get(url, {
        headers: { "Content-Type": "application/json", Authorization: "JWT " + auth.accessToken },
        // withCredentials: true,
      });
      console.log("***data", response);
      setDrivers(response.data.drivers);
      setDispatchers(response.data.dispatchers);
    } catch (err) {
      createMessage({ type: "danger", content: err.message });
    }
  };

  return { drivers, dispatchers, getDrivers };
};

export default useRequest;
