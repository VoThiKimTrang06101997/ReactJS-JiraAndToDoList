import { USER_LOGIN } from "../../util/constants/settingSystem";
import { USLOGIN } from "../constants/CyberBugs/Cyberbugs";

let UserLogin = {};

if(localStorage.getItem(USER_LOGIN)) {
    UserLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}


const stateDefault = {
    userLogin : UserLogin,
    userSearch: [],
    arrUser: []   // Array User cho thẻ Select Create Task
}

export const UserLoginCyberBugsReducer = (state = stateDefault, action) => {
    switch(action.type) {
        case USLOGIN: {
            state.userLogin = action.userLogin;
            return {...state}
        }
        case "GET_USER_SEARCH": {
            state.userSearch = action.listUserSearch;
            return {...state}
        }
        default: return {...state}
    }
}

