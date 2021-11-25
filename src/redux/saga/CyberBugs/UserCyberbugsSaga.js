import Axios from "axios";
import { fork, take, put, call, takeLatest, delay, select } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { TOKEN, USER_LOGIN } from "../../../util/constants/settingSystem";
import { USER_SIGNIN_API, USLOGIN } from "../../constants/CyberBugs/Cyberbugs";
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
    const {data, status} = yield call (() => cyberbugsService.signInCyberBugs(action.userLogin)); 
    
    // Lưu vào localstorage khi đăng nhập thành công
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    console.log(data);

    yield put({
      type: USLOGIN,
      userLogin: data.content
    })
    
    // History
    let history = yield select(state => state.HistoryReducer.history);
    history.push('/home');
    

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
