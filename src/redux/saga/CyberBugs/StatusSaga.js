import { statusService } from "../../../services/StatusService";
import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import {
  GET_ALL_STATUS,
  GET_ALL_STATUS_SAGA,
} from "../../constants/CyberBugs/StatusConstant";

function* getAllStatusSaga(action) {
  const { data, status } = yield call(() => statusService.getAllStatus());
  yield put({
    type: GET_ALL_STATUS,
    arrStatus: data.content,
  });
  try {
  } catch (error) {
    console.log(error.repsonse?.data);
  }
}

export function* theoDoiGetAllStatusSaga() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga);
}
