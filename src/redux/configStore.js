import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from "./reducers/ToDoListReducer";
import reduxThunk from "redux-thunk";
import LoadingReducer from "./reducers/LoadingReducer";

// Middleware saga
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./sagas/rootSaga";
const middleWareSaga = createSagaMiddleware();

const rootReducer = combineReducers({
    // Reducer khai báo tại đây
    ToDoListReducer,
    LoadingReducer
})

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));

// Gọi Saga
middleWareSaga.run(rootSaga);

export default store;
