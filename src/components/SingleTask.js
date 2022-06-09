import React, { useContext } from 'react';
import userContext from '../contextAPI/userAPI';

function SingleTask(props) {
  const contextInfo = useContext(userContext);

  return (
    <>
      <div className='w-75 row mb-3 border-bottom bg-light p-3 mx-auto'>
        <div className='col-lg-10 col-md-8 col-sm-8 '>
          <h6 className=''>{props.task.body}</h6>
        </div>
        {contextInfo.isUserLoggedIn ? (
          <div className='d-flex gap-3 col-lg-2 col-md-4 col-sm-4 align-self-center'>
            <button
              onClick={() => props.handleEdit(props.task.id)}
              className='btn btn-success'
            >
              Edit
            </button>
            <button
              onClick={() => props.handleDelete(props.task.id)}
              className='btn btn-danger'
            >
              Delete
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default SingleTask;
