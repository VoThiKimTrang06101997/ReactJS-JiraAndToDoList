import { USER_SIGNIN_API } from "../constants/CyberBugs/Cyberbugs";

export const signInCyberbugsAction = (email, password) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      password: password
    },
  };
};
