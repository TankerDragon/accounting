import { useState, useEffect } from "react";
import { getPostsPage } from "../api/axios";

const usePosts = (pageNum = 1, code = "") => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    getPostsPage(pageNum, code, { signal })
      .then((data) => {
        setResults((prev) => [...prev, ...data]);
        // setHasNextPage(Boolean(data.length));
        setHasNextPage(true);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (signal.aborted) return;
        if (e.response.status === 404) {
          setHasNextPage(false);
        } else {
          setIsError(true);
          setError({ message: e.message });
        }
      });

    return () => controller.abort();
  }, [pageNum, code]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default usePosts;
