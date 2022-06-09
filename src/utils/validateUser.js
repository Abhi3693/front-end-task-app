export default function validate(errors, name, value) {
  let errorMsg = '';

  switch (name) {
    case 'email':
      if (value.indexOf('@') === -1) {
        errorMsg = 'Email should contain @';
      }
      if (!value) {
        errorMsg = 'Email cant be empty';
      }
      errors.email = errorMsg;
      break;

    case 'username':
      if (value.length < 5) {
        errorMsg = 'Username should contain 5 charachter';
      }
      if (!value) {
        errorMsg = "UserName can't be empty";
      }
      errors.username = errorMsg;
      break;

    case 'password':
      var numeric_alpha = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
      if (!value) {
        errorMsg = "Password can't be empty";
      } else if (!numeric_alpha.test(value)) {
        errorMsg = 'Password should contain one alphabet and one number';
      } else if (value.length < 5) {
        errorMsg = 'Password should contain atleast 5 character';
      }
      errors.password = errorMsg;
      break;

    default:
      break;
  }
}
