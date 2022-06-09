import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import validate from '../utils/validateUser';
import { signUpURL } from '../utils/constants';
import useFetch from '../customHooks/useFetch';
import userContext from '../contextAPI/userAPI';

function RegisterNewUser(props) {
  const [inputInfo, setInputInfo] = useState({
    username: '',
    email: '',
    password: '',
    err: '',
  });
  const [inputError, setInputError] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { makeApiCall, error } = useFetch();
  const contextInfo = useContext(userContext);
  let navigate = useNavigate();

  const handleLogin = async (url, method, body) => {
    let data = await makeApiCall(url, method, 'nonAuth', body);
    if (data) {
      contextInfo.updateUser(data.user);
      navigate('/');
    }
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    validate(inputError, name, value);
    setInputError({ ...inputError });
    setInputInfo({ ...inputInfo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let { username, email, password } = inputInfo;
    if (username && email && password) {
      handleLogin(
        signUpURL,
        'POST',
        JSON.stringify({ user: { username, email, password } })
      );
      setInputInfo({ username: '', email: '', password: '' });
    }
    if (!username && !email && !password) {
      setInputError({
        ...inputError,
        username: 'Username is Required',
        password: 'Password is Requird',
        email: 'Email is requird',
      });
      return;
    }
    if (!username) {
      setInputError({ ...inputError, username: 'Username is Required' });
    }
    if (!password) {
      setInputError({ ...inputError, password: 'Password is Required' });
    }
    if (!email) {
      setInputError({ ...inputError, email: 'Email is Required' });
    }
  };

  return (
    <div className='container'>
      <div className='form-floating row'>
        <form
          className='col col-sm-10 col-md-8 col-6 mx-auto text-center'
          onSubmit={handleSubmit}
        >
          <h2 className='text-center my-5'>Register New User</h2>
          <p className='my-2 text-danger text-center'>
            {error &&
            !inputInfo.email &&
            !inputInfo.password &&
            !inputInfo.username
              ? error
              : ''}
          </p>
          <div className='mb-3 text-start col-sm-10'>
            <label htmlFor='inputUsername' className='col-sm-2 col-form-label'>
              Username
            </label>
            <input
              type='text'
              name='username'
              className='form-control'
              id='inputUsername'
              value={inputInfo.username}
              autoComplete={'current-username'}
              onChange={handleChange}
            />
            <p className='my-2 text-danger'>{inputError.username}</p>
          </div>
          <div className='mb-3 col-sm-10 text-start'>
            <label htmlFor='inputEmail' className='col-sm-2 col-form-label'>
              Email
            </label>
            <input
              type='text'
              name='email'
              className='form-control'
              id='inputEmail'
              autoComplete={'current-email'}
              value={inputInfo.email}
              onChange={handleChange}
            />
            <p className='my-2 text-danger'>{inputError.email}</p>
          </div>
          <div className='mb-3 col-sm-10 text-start'>
            <label htmlFor='inputPassword' className='col-sm-2 col-form-label'>
              Password
            </label>
            <input
              type='password'
              name='password'
              className='form-control'
              id='inputPassword'
              autoComplete={'current-password'}
              value={inputInfo.password}
              onChange={handleChange}
            />
            <p className='err-msg my-2 text-danger'>{inputError.password}</p>
          </div>
          <button className='btn btn-primary my-4 col-4'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterNewUser;
