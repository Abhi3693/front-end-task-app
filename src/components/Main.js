import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import SingleTask from './SingleTask';
import useFetch from '../customHooks/useFetch';
import { taskURL } from '../utils/constants';

function Main() {
  let [allTasks, setAllTasks] = useState([]);

  let { makeApiCall, isLoading, error } = useFetch();
  const navigate = useNavigate();
  let timeId = null;

  useEffect(() => {
    fetchTasks();
    return () => {
      if (timeId) {
        clearInterval(timeId);
      }
    };
  }, []);

  const fetchTasks = async () => {
    let response = await makeApiCall(taskURL);
    setAllTasks(response.tasks);
  };

  const handleEdit = (id) => {
    navigate(`/editTask/${id}`);
  };

  const handleDelete = async (id) => {
    let data = await makeApiCall(taskURL + id, 'DELETE', 'auth');
    if (data) {
      fetchTasks();
    }
  };

  if (error) {
    timeId = setInterval(fetchTasks, 2000);
  }

  if (isLoading) {
    return <h4 className='text-center text-success my-5'>Loading...</h4>;
  }

  return (
    <div className='container'>
      <h2 className='text-center my-5'>Tasks List</h2>
      <p className='my-2 text-danger text-center'>{error ? error : ''}</p>
      {allTasks.map((elm) => {
        return (
          <SingleTask
            key={elm.id}
            task={elm}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
}

export default Main;
