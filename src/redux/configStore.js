import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from "./reducers/ToDoListReducer";
import reduxThunk from "redux-thunk";
import LoadingReducer from "./reducers/LoadingReducer";

// Middleware saga
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./saga/rootSaga";
import { HistoryReducer } from "./reducers/HistoryReducer";
import { UserLoginCyberBugsReducer } from "./reducers/UserCyberBugsReducer";
const middleWareSaga = createSagaMiddleware();

const rootReducer = combineReducers({
    // Reducer khai báo tại đây
    ToDoListReducer,
    LoadingReducer,
    HistoryReducer,
    UserLoginCyberBugsReducer
})

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));

// Gọi Saga
middleWareSaga.run(rootSaga);

export default store;
