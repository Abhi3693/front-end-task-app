import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

import userContext from '../contextAPI/userAPI';

function Header(props) {
  const contextInfo = useContext(userContext);

  return (
    <header className='navbar-dark'>
      <nav className='navbar navbar-dark navbar-expand-lg bg-dark'>
        <div className='container'>
          <Link className='navbar-brand fw-bold fs-3' to='/'>
            Task
          </Link>
          <div>
            <button
              className='btn border border-secondary navbar-toggler '
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarNav'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse my-2' id='navbarNav'>
              {contextInfo.isUserLoggedIn ? (
                <div className='navbar-nav gap-1'>
                  <Link
                    className='btn btn-secondary '
                    aria-current='page'
                    to='/newTask'
                  >
                    Add task
                  </Link>
                  <span
                    className='btn btn-danger'
                    aria-current='page'
                    onClick={props.logoutUser}
                  >
                    Logout
                  </span>
                  <span
                    className='nav-link d-flex align-items-center text-light'
                    href='#price'
                  >
                    <FaUser className='mx-1' />
                    {contextInfo.user.username}
                  </span>
                </div>
              ) : (
                <div className='navbar-nav gap-1'>
                  <Link
                    className='btn btn-success '
                    aria-current='page'
                    to='/login'
                  >
                    Login
                  </Link>
                  <Link
                    className='btn btn-success'
                    aria-current='page'
                    to='/Register'
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
