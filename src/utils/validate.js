export const checkValidationData = ({ fullName, email, password }) => {
  const isValidFullName =
    /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/.test(
      fullName
    );
  const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  if (!isEmailValid) {
    return "Please Enter valid email Address";
  }
  if (!isValidFullName) {
    return "Please Enter valid Full Name";
  }
  if (!isPasswordValid) {
    return "Please enter a valid Password";
  }
  return null;
};
