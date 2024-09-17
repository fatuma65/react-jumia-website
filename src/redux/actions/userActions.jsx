import { userTypes } from "./types";
export const handleLogin = (UserId) => {
  return {
    type: userTypes.HANDLE_LOGIN,
    payload: UserId
  };
};
export const handleUserName = (username) => {
  console.log('////////////////////////',username)
  return {
    type: userTypes.HANDLE_USERNAME,
    payload: username
  };
};

export const handleLogout = () => {
  return {
    type: userTypes.HANDLE_LOGOUT
  };
};
export const fetchUserRequest = () => {
  return {
    type: userTypes.FETCH_USER_REQUEST
  };
};

export const fetchUserSuccess = (userData) => {
  return {
    type: userTypes.FETCH_USER_SUCCESS,
    payload: userData
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: userTypes.FETCH_USER_FAILURE,
    payload: error
  };
};
