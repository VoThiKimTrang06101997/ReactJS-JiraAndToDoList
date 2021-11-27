import Axios from "axios";
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/settingSystem";

export const cyberbugsService = {
  signInCyberBugs: (userLogin) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Users/signin`,
      method: "POST",
      data: userLogin,
    });
  },
  getAllProjectCategory: () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/ProjectCategory`,
      method: "GET",
    });
  },
  createProject: (newProject) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/createProject`,
      method: "POST",
      data: newProject,
    });
  },
  createProjectAuthorization: (newProject) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/createProjectAuthorize`,
      method: "POST",
      data: newProject,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, // JWT
    });
  },
};
