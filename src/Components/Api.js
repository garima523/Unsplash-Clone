import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ErrorPage from '../pages/error';

function isNetworkError(error) {
  if (error.message === 'Network Error') {
    return true;
  }

  return false;
}

function LoadImages(page) {
  const [state, setState] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api.unsplash.com/photos?page=${page}&client_id=XEdRpeuOBqnt8TVEJahXCMqHzzfIq6MFN0P0TIyFqTk`)
      .then((data) => {
        setState([...state, ...data.data]);
      })
      .catch((err) => {
        if (isNetworkError(err)) {
          localStorage.setItem('errorResolved', 'false');
          navigate('/error');
        } else {
          localStorage.setItem('errorResolved', 'true');
          navigate('/home');
        }
      });
  }, [page]);

  return state;
}

function SearchImages(query, page) {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [previousQuery, setPreviousQuery] = useState('');

  useEffect(() => {
    if (query !== previousQuery) {
      setResults([]);
      setCurrentPage(1);
    }

    if (page === 1) {
      setResults([]);
      setCurrentPage(1);
    }

    axios
      .get(`https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=XEdRpeuOBqnt8TVEJahXCMqHzzfIq6MFN0P0TIyFqTk`)
      .then((data) => {
        setResults((prevResults) => [...prevResults, ...data.data.results]);
        setCurrentPage(page);
        setPreviousQuery(query);
      })
      .catch((err) => {
        if (isNetworkError(err)) {
          localStorage.setItem('errorResolved', 'false');
          navigate('/error');
        } else {
          localStorage.setItem('errorResolved', 'true');
          navigate('/home');
        }
      });
  }, [query, page]);

  return results;
}
export {LoadImages, SearchImages};