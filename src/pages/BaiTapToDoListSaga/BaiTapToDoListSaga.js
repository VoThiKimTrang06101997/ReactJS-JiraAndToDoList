import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASKLIST_API, REJECT_TASK_API } from "../../redux/constants/ToDoListConst";
import style from "../Todolist/Todolist.css";
import backgroundImg from "./bg.png";

export default function BaiTapToDoListSaga(props) {
  const dispatch = useDispatch();
  const { taskList } = useSelector((state) => state.ToDoListReducer);

  let [state, setState] = useState({
    taskList: [],
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
    // Dispatch Action Saga
    dispatch({
      type: GET_TASKLIST_API,
    });
  };

  const addTask = (e) => {
    e.preventDefault();
    dispatch({
      type: ADD_TASK_API,
      taskName: state.values.taskName
    })
  };

  useEffect(() => {
    // Gọi hàm getTaskList
    getTaskList();
    return () => {};
  }, []);

  // Xử lý Reject Task
  const rejectTask = (taskName) => {
    dispatch({
      type: REJECT_TASK_API,
      taskName
    })
  };

  // Xử lý Done Task
  const checkTask = (taskName) => {
    dispatch({
      type: CHECK_TASK_API,
      taskName
    })
  };

  // Hàm xử lý xóa Task
  const deleteTask = (taskName) => {
    dispatch({
      type: DELETE_TASK_API,
      taskName: taskName
    })
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
      <button
        className="btn btn-success"
        onClick={() => {
          dispatch({
            type: "getTaskApiAction",
          });
        }}
      >
        Dispatch action saga getTaskAPI
      </button>
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
