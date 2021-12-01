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
import { projectService } from "../../../services/ProjectService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { history } from "../../../util/libs/history";
import { notifiFunction } from "../../../util/Notification/NotificationCyberbugs";
import { GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA } from "../../constants/CyberBugs/ProjectCyberBugsConstant";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

// Create Project Saga
function* createProjectSaga(action) {
  console.log("actionCreateProject", action);
  // Hiển thị Loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    // Gọi API lấy dữ liệu về
    const { data, status } = yield call(() =>
      cyberbugsService.createProjectAuthorization(action.newProject)
    );
    // Gọi API thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log("data", data);
      history.push("/projectmanagement");
    }
    
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateProjectSaga() {
  yield takeLatest("CREATE_PROJECT_SAGA", createProjectSaga);
}

// Saga dùng để get all project từ API: Get List Project
function* getListProjectSaga(action) {
  try {
    const {data, status} = yield call(() => cyberbugsService.getListProject());
    // Sau khi lấy dữ liệu từ API về thành công
    if(status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_LIST_PROJECT",
        projectList: data.content
      })
    }
  } catch (error) {
    console.log(error)
  }
  
}
export function* theoDoiGetListProjectSaga() {
  yield takeLatest("GET_LIST_PROJECT_SAGA", getListProjectSaga);
}

// Update Project
function* updateProjectSaga(action) {
  console.log("actionUpdateProject", action);
  // Hiển thị Loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    // Gọi API lấy dữ liệu về
    const { data, status } = yield call(() =>
      cyberbugsService.updateProject(action.projectUpdate)
    );
    // Gọi API thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log("data", data);
      // history.push("/projectmanagement");
    }
    // yield put({
    //   type: "GET_LIST_PROJECT_SAGA"
    // })
    yield call(getListProjectSaga)
    yield put({
      type: "CLOSE_DRAWER"
    })
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiUpdateProjectSaga() {
  yield takeLatest("UPDATE_PROJECT_SAGA", updateProjectSaga);
}

// Delete Project
function* deleteProjectSaga(action) {
  console.log("actionUpdateProject", action);
  // Hiển thị Loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    // Gọi API lấy dữ liệu về
    const { data, status } = yield call(() =>
      projectService.deleteProject(action.idProject)
    );
    // Gọi API thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log("data", data);
      notifiFunction("success", "Delete Project successfully !");
      // history.push("/projectmanagement");
    } else {
      notifiFunction("error", "Delete Project fails !");
    }
    // yield put({
    //   type: "GET_LIST_PROJECT_SAGA"
    // })
    yield call(getListProjectSaga)
    yield put({
      type: "CLOSE_DRAWER"
    })
  } catch (error) {
    notifiFunction("error", "Delete Project fails !");
    console.log(error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiDeleteProjectSaga() {
  yield takeLatest("DELETE_PROJECT_SAGA", deleteProjectSaga);
}

// Get Project Detail
function* getProjectDetailSaga(action) {
  console.log("actionUpdateProject", action);
  // Hiển thị Loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    // Gọi API lấy dữ liệu về
    const { data, status } = yield call(() =>
      projectService.getProjectDetail(action.projectId)
    );
    console.log("data", data);
    
    // Lấy dữ liệu thành công thì đưa dữ liệu lên Redux
    yield put({
      type: "PUT_PROJECT_DETAIL",
      projectDetail: data.content
    })

  } catch (error) {
    // console.log("404 Not Found");
    console.log(error)
    history.push("/projectmanagement")
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiGetProjectDetail() {
  yield takeLatest("GET_PROJECT_DETAIL", getProjectDetailSaga);
}

// Get All Project
function* getAllProjectSaga(action) {
  // Hiển thị Loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    // Gọi API lấy dữ liệu về
    const { data, status } = yield call(() =>
      projectService.getAllProject()
    );
    
    // Lấy dữ liệu thành công thì đưa dữ liệu lên Redux
    yield put({
      type: GET_ALL_PROJECT,
      arrProject: data.content
    })

  } catch (error) {
    // console.log("404 Not Found");
    console.log(error)
    history.push("/projectmanagement")
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}
