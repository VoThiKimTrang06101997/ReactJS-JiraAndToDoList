const stateDefault = {
  projectList: [
    {
      id: "1",
      projectName: "abc",
      description: '<p style="color: red">abc</p>',
    },
  ],
};

export const ProjecCyberBugstReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_LIST_PROJECT": {
      state.projectList = action.projectList;
      console.log("projectList", action.projectList);
      return { ...state };
    }
    default:
      return { ...state };
  }
};
