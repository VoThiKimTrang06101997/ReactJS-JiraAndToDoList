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
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../constants/CyberBugs/Cyberbugs";

function* getAllProjectCategorySaga(action) {
  console.log("actionSaga", action);
  try {
    // Gọi API lấy dữ liệu về
    const { data, status } = yield call(() =>
      cyberbugsService.getAllProjectCategory()
    );
    // Gọi API thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_CATEGORY,
        data: data.content,
      });
      console.log("data", data);
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* theoDoiGetAllProjectCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}
