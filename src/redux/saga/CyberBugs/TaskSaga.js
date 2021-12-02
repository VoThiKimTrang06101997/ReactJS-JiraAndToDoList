import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notifiFunction } from "../../../util/Notification/NotificationCyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

function* createTaskSaga(action) {
  // Hiển thị Loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      taskService.createTask(action.taskObject)
    );
    // Gọi API thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log("data", data);
    }
    yield put({
      type: "CLOSE_DRAWER",
    });
    notifiFunction("success", "Create Task successfully !");
  } catch (error) {
    console.log(error.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateTaskSaga() {
  yield takeLatest("CREATE_TASK_SAGA", createTaskSaga);
}
