const Root_url = 'https://task-app-node-web.herokuapp.com/api/';
const taskURL = Root_url + 'tasks/';
const loginURL = Root_url + 'users/login';
const signUpURL = Root_url + 'users/register';
const localStorageTokenKey = 'task_app_user_token';
const userVerifyURL = Root_url + 'users';

export {
  Root_url,
  taskURL,
  localStorageTokenKey,
  loginURL,
  signUpURL,
  userVerifyURL,
};
