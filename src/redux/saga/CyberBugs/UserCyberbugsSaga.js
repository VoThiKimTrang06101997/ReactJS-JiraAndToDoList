import Axios from "axios";
import {
  fork,
  take,
  put,
  call,
  takeLatest,
  delay,
  select,
} from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { userService } from "../../../services/UserService";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../../util/constants/settingSystem";
import { history } from "../../../util/libs/history";
import { USER_SIGNIN_API, USLOGIN } from "../../constants/CyberBugs/Cyberbugs";
import {
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_SAGA,
} from "../../constants/CyberBugs/UserConstant";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

// Quản lý các Action Saga
function* signinSaga(action) {
  console.log(action);
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  // Gọi API
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.signInCyberBugs(action.userLogin)
    );

    // Lưu vào localstorage khi đăng nhập thành công
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    console.log(data);

    yield put({
      type: USLOGIN,
      userLogin: data.content,
    });

    // History
    // let history = yield select(state => state.HistoryReducer.history);
    history.push("/home");
  } catch (error) {
    console.log(error.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSignIn() {
  yield takeLatest(USER_SIGNIN_API, signinSaga);
}

// Lấy thông tin người dùng members
function* getUserSaga(action) {
  // Gọi API
  try {
    const { data, status } = yield call(() =>
      userService.getUser(action.keyWord)
    );
    console.log("data", data);

    yield put({
      type: "GET_USER_SEARCH",
      listUserSearch: data.content,
    });
  } catch (error) {
    console.log(error.response.data);
  }
}
export function* theoDoiGetUser() {
  yield takeLatest("GET_USER_API", getUserSaga);
}

// Thêm người dùng vào Project
function* addUserProjectSaga(action) {
  // Gọi API
  try {
    const { data, status } = yield call(() =>
      userService.assignUserProject(action.userProject)
    );
    // Lưu vào localstorage khi đăng nhập thành công
    // localStorage.setItem(TOKEN, data.content.accessToken);
    // localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
  } catch (error) {
    console.log(error.response.data);
  }
}
export function* theoDoiAddUserProject() {
  yield takeLatest("ADD_USER_PROJECT_API", addUserProjectSaga);
}

// Remove người dùng ra khỏi Project
function* removeUserProjectSaga(action) {
  // Gọi API
  try {
    const { data, status } = yield call(() =>
      userService.deleteUserFromProject(action.userProject)
    );
    // Lưu vào localstorage khi đăng nhập thành công
    // localStorage.setItem(TOKEN, data.content.accessToken);
    // localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
  } catch (error) {
    console.log(error.response.data);
  }
}
export function* theoDoiRemoveUserProject() {
  yield takeLatest("REMOVE_USER_PROJECT_API", removeUserProjectSaga);
}

// Get User By Project
function* getUserByProjectIdSaga(action) {
  const { idProject } = action;

  try {
    // Gọi API
    const { data, status } = yield call(() =>
      userService.getUserByProjectId(idProject)
    );
    console.log("checkData", data);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: data.content,
      });
    }
  } catch (error) {
    console.log(error.response?.data);
    if(error.response.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: [],
      });
    }
  }
}
export function* theoDoigetUserByProjectIdSaga() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}
