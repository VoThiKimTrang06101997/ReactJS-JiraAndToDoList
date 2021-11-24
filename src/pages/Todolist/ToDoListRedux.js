import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskApi,
  checkTaskApi,
  deleteTaskApi,
  getTaskListApi,
  rejectTaskApi,
} from "../../redux/actions/ToDoListAction";
import style from "../Todolist/Todolist.css";
import backgroundImg from "./bg.png";

export default function ToDoListRedux(props) {
  // Lấy taskList từ Redux về
  const { taskList } = useSelector((state) => state.ToDoListReducer);
  const dispatch = useDispatch();

  let [state, setState] = useState({
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  });

  const handleChange = (e) => {
    let { value, name } = e.target;
    console.log(value, name);

    let newValues = { ...state.values };
    newValues = { ...newValues, [name]: value };

    let newErrors = { ...state.errors };

    let regexString = /^[a-z A-Z]+$/;

    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " " + " is invalid !";
    } else {
      newErrors[name] = "";
    }

    setState({
      ...state,
      values: newValues,
      errors: newErrors,
    });
  };

  const getTaskList = () => {
    dispatch(getTaskListApi());
  };

  const addTask = (e) => {
    e.preventDefault(); // Chặn sự kiện reload lại trang
    console.log(state.values.taskName);

    // Xử lý nhận dữ liệu từ người dùng nhập => Gọi action addTaskApi
    dispatch(addTaskApi(state.values.taskName));
  };

  useEffect(() => {
    getTaskList();
    return () => {};
  }, []);

  // Xử lý Reject Task
  const rejectTask = (taskName) => {
    dispatch(rejectTaskApi(taskName));
  };

  // Xử lý Done Task
  const checkTask = (taskName) => {
    dispatch(checkTaskApi(taskName));
  };

  // Hàm xử lý xóa Task
  const deleteTask = (taskName) => {
    dispatch(deleteTaskApi(taskName));
  };

  const renderTaskToDo = () => {
    return taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  deleteTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => {
                  checkTask(item.taskName);
                }}
              >
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };

  const renderTaskToDoDone = () => {
    return taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  deleteTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => {
                  rejectTask(item.taskName);
                }}
              >
                <i className="far fa-undo" />
                <i className="fas fa-undo" />
              </button>
            </div>
          </li>
        );
      });
  };

  return (
    <div className="card">
      <div className="card__header">
        <img src={backgroundImg} alt="" />
      </div>
      {/* <h2>hello!</h2> */}
      <div className="card__body" onSubmit={addTask}>
        <div className="card__content">
          <div className="card__title">
            <h2>My Tasks</h2>
            <p>September 9,2020</p>
          </div>
          <div className="card__add">
            <input
              name="taskName"
              id="newTask"
              type="text"
              placeholder="Enter an activity..."
              onChange={handleChange}
            />
            <button id="addItem" type="submit" onClick={addTask}>
              <i className="fa fa-plus" />
            </button>
          </div>
          <div className="card__todo">
            {/* Uncompleted tasks */}
            <ul className="todo" id="todo">
              {renderTaskToDo()}
            </ul>
            {/* Completed tasks */}
            <ul className="todo" id="completed">
              {renderTaskToDoDone()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
