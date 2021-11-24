import Axios from "axios";
import { fork, take, put, call, takeLatest, delay } from "redux-saga/effects";
import { toDoListService } from "../../services/ToDoListService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { deleteTaskApi } from "../actions/ToDoListAction";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";
import {
  ADD_TASK_API,
  CHECK_TASK_API,
  DELETE_TASK_API,
  GET_TASKLIST_API,
  GET_TASK_API,
  REJECT_TASK_API,
} from "../constants/ToDoListConst";

/**
 * Redux có 2 loại Action:
 *  + Loại 1: Action => Object (Action thường).
 *  + Loại 2: Action => Function (Thường dùng để xử lý Api hoặc gọi các Action khác).
 */

// Action Saga lấy danh sách Task từ API
function* getTaskApiAction(action) {
  // Put giống dispatch action
  yield put({
    type: DISPLAY_LOADING,
  });

  try {
    let { data, status } = yield call(toDoListService.getTaskApi);
    yield delay(300);

    if (status === STATUS_CODE.SUCCESS) {
      // Sau khi lấy giá trị thành công => Dùng Put (giống dispatch bên thunk)
      yield put({
        type: GET_TASK_API,
        taskList: data,
      });
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log("error");
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiActionGetTaskApi() {
  yield takeLatest(GET_TASKLIST_API, getTaskApiAction);
}

// Action Saga Add Task (Thêm Task)
function* addTaskApiAction(action) {
  const { taskName } = action;
  // Gọi API
  try {
    const { data, status } = yield call(() => {
      return toDoListService.addTaskApi(taskName);
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (error) {
    console.log(error);
  }

  // Hiển thị Loading
  // Thành công thì Load lại task bằng cách gọi lại action saga load lại taskList
}

export function* theoDoiActionAddTaskApi() {
  yield takeLatest(ADD_TASK_API, addTaskApiAction);
}

// Action Saga Delete Task (Xóa Task)
function* deleteTaskApiAction(action) {
  const { taskName } = action;

  try {
    const { data, status } = yield call(() => {
      return toDoListService.deleteTaskApi(taskName);
    });
    if ((status = STATUS_CODE.SUCCESS)) {
      // Nếu thành công thì gọi lại Action GET_TASKLIST_API (Action Saga)
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* theoDoiActionDeleteTaskApi() {
  yield takeLatest(DELETE_TASK_API, deleteTaskApiAction);
}

// Action Saga CheckDone Task (Thực hiện Task)
function* CheckDoneTaskApiAction(action) {
  const { taskName } = action;

  try {
    const { data, status } = yield call(() => {
      return toDoListService.checkDoneTaskApi(taskName);
    });
    if ((status = STATUS_CODE.SUCCESS)) {
      // Nếu thành công thì gọi lại Action GET_TASKLIST_API (Action Saga)
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* theoDoiActionCheckDoneTaskApi() {
  yield takeLatest(CHECK_TASK_API, CheckDoneTaskApiAction);
}

// Action Saga Reject Task (Từ chối thực hiện Task)
function* rejectTaskApiAction(action) {
  const { taskName } = action;

  try {
    const { data, status } = yield call(() => {
      return toDoListService.rejectTaskApi(taskName);
    });
    if ((status = STATUS_CODE.SUCCESS)) {
      // Nếu thành công thì gọi lại Action GET_TASKLIST_API (Action Saga)
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* theoDoiActionRejectTaskApi() {
  yield takeLatest(REJECT_TASK_API, rejectTaskApiAction);
}
