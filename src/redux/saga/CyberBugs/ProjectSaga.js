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
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { history } from "../../../util/libs/history";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

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
      history.push("projectmanagement");
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

// Saga dùng để get all project từ API
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
