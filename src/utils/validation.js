export const validatePhoneNumber = (value) => {
  const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  return value.match(regexPhoneNumber) ? true : false;
};

export const validateEmail = (value) => {
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return value.match(regexEmail) ? true : false;
};

export const validatePassword = (value) => {
  const regexPassword =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/g;
  return value.match(regexPassword) ? true : false;
};

export const validateUsername = (value) => {
  if (value.length < 4 || value.length > 30) {
    return false;
  }
  return true;
};
