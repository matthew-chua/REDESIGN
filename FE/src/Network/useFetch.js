import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const useFetch = (method, route, body, callOnLoad = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = "https://stormy-stream-68782.herokuapp.com";

  const refetch = useCallback( async () => {
    setLoading(true);
    let res;
    try {
      if (method === "GET") {
        res = await axios.get(`${baseURL}/${route}`);
      } else if (method === "POST") {
        res = await axios.post(`${baseURL}/${route}`, body);
      } else if (method === "PUT") {
        res = await axios.put(`${baseURL}/${route}`, body);
      }
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data)
      setError(err.response.data);
      setLoading(false);
    }
  }, [body, method, route]);
  useEffect(() => {
    if (callOnLoad) {
      refetch();
    }
  }, [callOnLoad, refetch, method, body, route]);
  return [data, loading, error, setError, refetch];
};

export default useFetch;
