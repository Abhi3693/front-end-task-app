import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import validate from '../utils/validateUser';
import { loginURL } from '../utils/constants';
import useFetch from '../customHooks/useFetch';
import userContext from '../contextAPI/userAPI';

function Login() {
  const [inputInfo, setInputInfo] = useState({
    email: '',
    password: '',
    err: '',
  });

  const [inputError, setInputError] = useState({ email: '', password: '' });
  const { makeApiCall, error } = useFetch();
  const contextInfo = useContext(userContext);
  const navigate = useNavigate();

  const handleLogin = async (url, method, body) => {
    let data = await makeApiCall(url, method, 'nonAuth', body);
    if (data) {
      contextInfo.updateUser(data.user);
      navigate('/');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let { email, password } = inputInfo;
    if (!inputError.email && !inputError.password) {
      if (email && password) {
        handleLogin(
          loginURL,
          'POST',
          JSON.stringify({ user: { email, password } })
        );
        setInputInfo({ email: '', password: '' });
      }
    }
    if (!email && !password) {
      setInputError({
        ...inputError,
        password: 'Password is requird',
        email: 'Email is requird',
      });
      return;
    }
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    validate(inputError, name, value);
    setInputError({ ...inputError });
    setInputInfo({ ...inputInfo, [name]: value });
  };

  return (
    <div className='container'>
      <div className='form-floating row'>
        <form
          className='col col-lg-6 col-sm-10 col-md-8 mx-auto text-center'
          onSubmit={handleSubmit}
        >
          <h2 className='text-center my-5'>Login User</h2>
          <p className='my-2 text-danger text-center'>
            {error && !inputInfo.email && !inputInfo.password ? error : ''}
          </p>
          <div className='mb-3 col-sm-10'>
            <div className=' text-start'>
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
          </div>
          <div className='mb-3 col-sm-10'>
            <div className='text-start'>
              <label
                htmlFor='inputPassword'
                className='col-sm-2 col-form-label'
              >
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
          </div>
          <button className='btn btn-primary my-4 text-center col-3'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
