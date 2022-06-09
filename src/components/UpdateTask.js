import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { taskURL } from '../utils/constants';
import useFetch from '../customHooks/useFetch';

function UpdateTask() {
  const [inputInfo, setInputInfo] = useState('');
  const [inputError, setInputError] = useState('');
  const { makeApiCall, error, isLoading } = useFetch();

  useEffect(() => {
    fetchTask();

    return () => {
      if (timeId) {
        clearInterval(timeId);
      }
    };
  }, []);

  const navigate = useNavigate();
  let { id } = useParams();
  let timeId = null;

  const fetchTask = async () => {
    let data = await makeApiCall(taskURL + id);
    if (data && data.task) {
      setInputInfo(data.task.body);
    }
  };

  const handleAddTask = async (url, body) => {
    let data = await makeApiCall(url + id, 'PUT', 'auth', body);
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

  if (error) {
    timeId = setInterval(fetchTask, 2000);
  }

  if (isLoading) {
    return <h4 className='text-center text-success my-5'>Loading...</h4>;
  }

  return (
    <div className='container'>
      <div className='form-floating row text-center'>
        <form
          className='col col-sm-10 col-md-8 col-6 mx-auto'
          onSubmit={handleSubmit}
        >
          <h2 className='text-center my-5'>Update Task</h2>
          <p className='my-2 text-danger text-center'>
            {error && !inputInfo ? error : ''}
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

export default UpdateTask;
