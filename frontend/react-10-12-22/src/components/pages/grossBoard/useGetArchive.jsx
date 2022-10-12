import { useEffect, useState } from "react";
import axios from "axios";

const useGetArchive = (date) => {
  axios.defaults.headers.common["Authorization"] = `JWT ${
    JSON.parse(localStorage.getItem("authentication")).access
  }`;
  //
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [archives, setArchives] = useState([]);
  //
  useEffect(() => {
    setLoading(true);
    setError(false);
    console.log("get sent *********");
    axios({
      method: "GET",
      url: "/api/archive/" + date,
    })
      .then((res) => {
        console.log(res);
        setArchives(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
      });
  }, [date]);
  return { loading, error, archives };
};

export default useGetArchive;
