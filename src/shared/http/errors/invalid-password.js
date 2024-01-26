function InvalidPassword() {
  return new Error('the password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number and 1 special char');
}

export default InvalidPassword;
