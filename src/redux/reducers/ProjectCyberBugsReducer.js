const stateDefault = {
  projectList: [
    {
      id: "1",
      projectName: "abc",
      description: '<p style="color: red">abc</p>',
    },
  ],

  arrProject: [],  // Get All Project cho Dropdown
};

export const ProjecCyberBugstReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_LIST_PROJECT": {
      state.projectList = action.projectList;
      console.log("projectList", action.projectList);
      return { ...state };
    }
    case "GET_ALL_PROJECT": {
      // state.arrProject = action.arrProject;
      return {...state, arrProject: action.arrProject};
    }
    default:
      return { ...state };
  }
};
