import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notifiFunction } from "../../../util/Notification/NotificationCyberbugs";
import {
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  UPDATE_STATUS_TASK_SAGA,
} from "../../constants/CyberBugs/TaskConstant";
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

// GetTaskDetail
function* getTaskDetailSaga(action) {
  const { taskId } = action;
  try {
    const { data, status } = yield call(() =>
      taskService.getTaskDetail(taskId)
    );
    yield put({
      type: GET_TASK_DETAIL,
      taskDetailModal: data.content,
    });
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
  }
}

export function* theoDoiGetTaskDetailSaga(action) {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

// Update Task
function* updateTaskStatusSaga(action) {
  const { taskUpdateStatus } = action;
  try {
    // Cập nhật API Status cho Task hiện tại (Task đang mở Modal)
    const { data, status } = yield call(() => {
      taskService.updateStatusTask(taskUpdateStatus);
    });
    console.log(data);
    // Sau khi thành công gọi lại getProjectDetailSaga để sắp xếp lại thông tin các Task
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_PROJECT_DETAIL",
        projectId: taskUpdateStatus.projectId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateStatus.taskId
      })
    }
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
  }
}
export function* theoDoiupdateTaskStatusSaga(action) {
  yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga);
}
