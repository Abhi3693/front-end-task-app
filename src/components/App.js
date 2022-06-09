import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import NewTask from './NewTask';
import UpdateTask from './UpdateTask';
import RegisterNewUser from './Register';
import Login from './Login';
import userContext from '../contextAPI/userAPI';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import useFetch from '../customHooks/useFetch';
import { localStorageTokenKey, userVerifyURL } from '../utils/constants';

function App() {
  const initialInfo = {
    isUserLoggedIn: false,
    user: null,
    isVerifying: true,
    error: '',
  };

  const [userInfo, setUserInfo] = useState(initialInfo);
  const { makeApiCall, isLoading } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    let response = await makeApiCall(userVerifyURL, 'GET', 'auth', null);
    if (response && response.user) {
      setUserInfo({
        ...userInfo,
        isUserLoggedIn: true,
        isVerifying: false,
        user: response.user,
      });
    } else {
      setUserInfo({
        ...userInfo,
        isUserLoggedIn: false,
        isVerifying: false,
        user: null,
      });
    }
  };

  const updateUser = (user) => {
    setUserInfo({
      ...userInfo,
      isUserLoggedIn: true,
      user,
      isVerifying: false,
    });
    localStorage.setItem(localStorageTokenKey, user.token);
  };

  const logoutUser = () => {
    setUserInfo({
      ...userInfo,
      isUserLoggedIn: false,
      user: null,
      isVerifying: false,
    });
    localStorage.removeItem(localStorageTokenKey);
    navigate('/');
  };

  if (isLoading) {
    return <h1 className='text-center text-success my-5'>Loading...</h1>;
  }

  let { isUserLoggedIn, user } = userInfo;
  let contextInfo = { isUserLoggedIn, user, updateUser: updateUser };

  return (
    <div>
      <userContext.Provider value={contextInfo}>
        <ErrorBoundary>
          <Header logoutUser={logoutUser} />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/newTask' element={<NewTask />} />
            <Route path='/editTask/:id' element={<UpdateTask />} />
            <Route path='/register' element={<RegisterNewUser />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </ErrorBoundary>
      </userContext.Provider>
    </div>
  );
}

export default App;
