import React from "react";

const initialState = {
  visible: false,
  ComponentContentDrawer: <p>Default Content</p>,
  callBackSubmit: (propsValue) => {alert("Click Demo !")}
};

export const drawerReducer =  (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_DRAWER":
      return { ...state, visible: true };
    case "CLOSE_DRAWER":
      return { ...state, visible: false };
    case "OPEN_FORM_EDIT_PROJECT": {
        state.visible = true;
        state.ComponentContentDrawer = action.Component;
        return {...state}

        // return {...state, visible: true, ComponentContentDrawer: action.Component}
    }
    case "SET_SUBMIT_EDIT_PROJECT": {
        state.callBackSubmit = action.submitFunction;
        return {...state}
    }
    default:
      return state;
  }
};
