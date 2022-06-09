import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { taskURL } from '../utils/constants';
import useFetch from '../customHooks/useFetch';

function NewTask() {
  const [inputInfo, setInputInfo] = useState('');
  const [inputError, setInputError] = useState('');
  const { makeApiCall, error } = useFetch();
  const navigate = useNavigate();

  const handleAddTask = async (url, body) => {
    let data = await makeApiCall(url, 'POST', 'auth', body);
    if (data) {
      navigate('/');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputInfo) {
      setInputError('Task is required');
      return;
    }
    handleAddTask(taskURL, JSON.stringify({ task: { body: inputInfo } }));
    setInputInfo('');
    setInputError('');
  };

  const handleChange = (event) => {
    setInputInfo(event.target.value);
    if (event.target.value === '') {
      setInputError("Can't be empty");
    } else if (event.target.value.length < 5) {
      setInputError('Length should be more than 5 charachter');
    } else {
      setInputError('');
    }
  };

  return (
    <div className='container'>
      <div className='form-floating row text-center'>
        <form
          className='col col-sm-10 col-md-8 col-6 mx-auto'
          onSubmit={handleSubmit}
        >
          <h2 className='text-center my-5'>Add Task</h2>
          <p className='my-2 text-danger text-center'>
            {error && !inputInfo ? 'Could not add task try again!' : ''}
          </p>
          <textarea
            name='body'
            className='form-control h-50'
            placeholder='Add task body'
            id='floatingTextarea'
            onChange={handleChange}
            value={inputInfo}
          ></textarea>
          <p className='err-msg my-2 text-danger'>{inputError}</p>
          <button className='btn btn-primary my-4 col-3'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default NewTask;
