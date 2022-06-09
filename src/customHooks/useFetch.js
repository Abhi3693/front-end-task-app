import { useState } from 'react';

import { localStorageTokenKey } from '../utils/constants';

function useFetch() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage[localStorageTokenKey];
  const nonAuthHeaders = {
    'Content-Type': 'application/json',
  };
  const authHeaders = {
    authorization: token,
    'Content-Type': 'application/json',
  };

  function makeApiCall(url, method = 'GET', headers = 'nonAuth', body = null) {
    return fetch(url, {
      method: method,
      headers: headers === 'auth' ? authHeaders : nonAuthHeaders,
      body: body,
    })
      .then((res) => {
        if (res.status >= 400 && res.status < 500) {
          return res.json().then((json) => {
            setError(json.error);
            throw new Error(json.error);
          });
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setError('');
        return data;
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }

  return {
    error,
    makeApiCall,
    isLoading,
  };
}

export default useFetch;
