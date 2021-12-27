import { call, delay, put, takeLatest, select } from "@redux-saga/core/effects";
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notifiFunction } from "../../../util/Notification/NotificationCyberbugs";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGN,
  UPDATE_STATUS_TASK_SAGA,
  UPDATE_TASK_SAGA,
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

// Update Status Saga
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
        taskId: taskUpdateStatus.taskId,
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
  }
}
export function* theoDoiupdateTaskStatusSaga(action) {
  yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga);
}

// Update Task
function* updateTaskSaga(action) {}

export function* theoDoiUpdateTask() {
  yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga);
}

export function* handleChangePostApi(action) {
  // Gọi action làm thay đổi taskDetailModal
  switch (action.actionType) {
    case CHANGE_TASK_MODAL:
      {
        const { name, value } = action;
        yield put({ type: CHANGE_TASK_MODAL, name, value });
      }
      break;

    case CHANGE_ASSIGNESS:
      {
        const { userSelected } = action;
        yield put({
          type: CHANGE_ASSIGNESS,
          userSelected,
        });
      }
      break;

    case REMOVE_USER_ASSIGN:
      {
        const { userId } = action;
        yield put({
          type: REMOVE_USER_ASSIGN,
          userId,
        });
      }
      break;
  }
  // Save qua API updateTaskSaga
  // Lấy dữ liệu từ state.taskDetailModal
  let { taskDetailModal } = yield select((state) => state.TaskReducer);
  console.log("taskDetailModal sau khi thay đổi", taskDetailModal);
  // Biển đổi dữ liệu state.taskDetailModal thành dữ liệu API cần
  const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
    return user.id;
  });

  const taskUpdateApi = { ...taskDetailModal, listUserAsign };
  try {
    const { data, status } = yield call(() =>
      taskService.updateTask(taskUpdateApi)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_PROJECT_DETAIL",
        projectId: taskUpdateApi.projectId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateApi.taskId,
      });
    }
  } catch (error) {
    console.log(error?.response.data);
    console.log(error);
  }
}

export function* theoDoiHandleChangePostApi() {
  yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApi);
}
