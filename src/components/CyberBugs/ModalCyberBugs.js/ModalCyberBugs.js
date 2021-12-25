import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";

import Img1 from "../../../assets/img/download (1).png";
import { GET_ALL_STATUS_SAGA } from "../../../redux/constants/CyberBugs/StatusConstant";
import { useDispatch } from "react-redux";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/constants/CyberBugs/PriorityConstant";
import {
  CHANGE_TASK_MODAL,
  UPDATE_STATUS_TASK_SAGA,
} from "../../../redux/constants/CyberBugs/TaskConstant";
import { GET_ALL_TASK_TYPE_SAGA } from "../../../redux/constants/CyberBugs/TaskTypeConstant";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";

export default function ModalCyberBugs(props) {
  const { taskDetailModal } = useSelector((state) => state.TaskReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const [visibleEditor, setVisibleEditor] = useState(false);
  const [historyContent, setHistoryContent] = useState(taskDetailModal.description);
  const [content, setContent] = useState(taskDetailModal.description);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
  }, []);

  console.log("taskDetailModal", taskDetailModal);

  const renderDescription = () => {
    const jsxDescription = ReactHtmlParser(taskDetailModal.description);
    return (
      <div>
        {visibleEditor ? (
          <div>
            <Editor
              name="description"
              initialValue={taskDetailModal.description}
              init={{
                selector: "textarea#myTextArea",
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />

            <button className="btn btn-primary m-2" onClick={() => {
              dispatch({
                type: CHANGE_TASK_MODAL,
                name: "description",
                value: content
              })
              setVisibleEditor(false);
            }}>Save</button>

            <button className="btn btn-primary m-2" onClick={() => {
              dispatch({
                type: CHANGE_TASK_MODAL,
                name: "description",
                value: historyContent
              })
              setVisibleEditor(false)
            }}>Close</button>
          </div>
        ) : (
          <div
            onClick={() => {
              setHistoryContent(taskDetailModal.description);
              setVisibleEditor(!visibleEditor);
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: CHANGE_TASK_MODAL, name, value });
  };

  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);

    return (
      <div>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={Number(timeTrackingSpent)}
                aria-valuemin={Number(timeTrackingRemaining)}
                aria-valuemax={max}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p className="logged">{Number(timeTrackingSpent)}h logged</p>
              <p className="estimate-time">
                {Number(timeTrackingRemaining)}h remaining
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingSpent"
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingRemaining"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        className="modal fade"
        id="searchModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="searchModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-search">
          <div className="modal-content">
            <div className="modal-header">
              <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
              </div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p>RECENT ISSUES</p>
              <div style={{ display: "flex" }}>
                <div className="icon">
                  <i className="fa fa-bookmark" />
                </div>
                <div>
                  <p>cyberlearn</p>
                  <p>BUG-238066</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* InFo Modal */}
      <div
        className="modal fade"
        id="infoModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="infoModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-info">
          <div className="modal-content">
            <div className="modal-header">
              <div className="task-title">
                <i className="fa fa-bookmark" />
                <select
                  name="typeId"
                  value={taskDetailModal.typeId}
                  onChange={handleChange}
                >
                  {arrTaskType.map((tasktype, index) => {
                    return (
                      <option key={index} value={tasktype.id}>
                        {tasktype.taskType}
                      </option>
                    );
                  })}
                </select>

                <span>{taskDetailModal.taskName}</span>
              </div>
              <div style={{ display: "flex" }} className="task-click">
                <div>
                  <i className="fab fa-telegram-plane" />
                  <span style={{ paddingRight: 20 }}>Give feedback</span>
                </div>
                <div>
                  <i className="fa fa-link" />
                  <span style={{ paddingRight: 20 }}>Copy link</span>
                </div>
                <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-8">
                    <p className="issue text-danger font-weight-bold">
                      This is an issue of type: Task.
                    </p>

                    <div className="description">
                      <p className="text-primary font-weight-bold">
                        Description
                      </p>
                      {renderDescription()}
                    </div>

                    <div className="comment">
                      <h6>Comment</h6>
                      <div
                        className="block-comment"
                        style={{ display: "flex" }}
                      >
                        <div className="avatar">
                          <img src={Img1} alt="" />
                        </div>
                        <div className="input-comment">
                          <input type="text" placeholder="Add a comment ..." />
                          <p>
                            <span
                              style={{
                                fontWeight: 500,
                                color: "gray",
                              }}
                            >
                              Protip:
                            </span>
                            <span>
                              press
                              <span
                                style={{
                                  fontWeight: "bold",
                                  background: "#ecedf0",
                                  color: "#b4bac6",
                                }}
                              >
                                M
                              </span>
                              to comment
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="lastest-comment">
                        <div className="comment-item">
                          <div
                            className="display-comment"
                            style={{ display: "flex" }}
                          >
                            <div className="avatar">
                              <img src={Img1} alt="" />
                            </div>
                            <div>
                              <p style={{ marginBottom: 5 }}>
                                Lord Gaben <span>a month ago</span>
                              </p>
                              <p style={{ marginBottom: 5 }}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Repellendus tempora ex
                                voluptatum saepe ab officiis alias totam ad
                                accusamus molestiae?
                              </p>
                              <div>
                                <span style={{ color: "#929398" }}>Edit</span>•
                                <span style={{ color: "#929398" }}>Delete</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="status">
                      <h6>STATUS</h6>
                      <select
                        name="statusId"
                        className="custom-select"
                        value={taskDetailModal.statusId}
                        onChange={(e) => {
                          handleChange(e);

                          // const action = {
                          //   type: UPDATE_STATUS_TASK_SAGA,
                          //   taskUpdateStatus: {
                          //     taskId: taskDetailModal.taskId,
                          //     statusId: e.target.value,
                          //     projectId: taskDetailModal.projectId
                          //   },
                          // };

                          // // console.log("action", action);
                          // console.log("taskupdatestatus", {
                          //   taskId: taskDetailModal.taskId,
                          //   statusId: e.target.value,
                          // });

                          // dispatch(action);
                        }}
                      >
                        {arrStatus.map((status, index) => {
                          //  console.log(status);
                          // const selectedStatus =taskDetailModal.statusId === status.statusId;

                          // if (taskDetailModal.statusId === status.statusId) {
                          //   return (
                          //     <option key={index} selected value={status.statusId}>
                          //       {status.statusName}
                          //     </option>
                          //   );
                          // } else {
                          //   return (
                          //     <option key={index} value={status.statusId}>{status.statusName}</option>
                          //   );
                          // }
                          return (
                            <option value={status.statusId} key={index}>
                              {status.statusName}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="assignees">
                      <h6>ASSIGNEES</h6>
                      <div style={{ display: "flex" }}>
                        {taskDetailModal.assigness.map((user, index) => {
                          return (
                            <div
                              key={index}
                              style={{ display: "flex" }}
                              className="item"
                            >
                              <div className="avatar">
                                <img src={user.avatar} alt={user.avatar} />
                              </div>
                              <p className="name mt-1 ml-1">
                                {user.name}
                                <i
                                  className="fa fa-times"
                                  style={{ marginLeft: 5 }}
                                />
                              </p>
                            </div>
                          );
                        })}

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className="fa fa-plus"
                            style={{ marginRight: 5 }}
                          />
                          <span>Add more</span>
                        </div>
                      </div>
                    </div>

                    {/* <div className="reporter">
                      <h6>REPORTER</h6>
                      <div style={{ display: "flex" }} className="item">
                        <div className="avatar">
                          <img src={Img1} alt="" />
                        </div>
                        <p className="name">
                          Pickle Rick
                          <i
                            className="fa fa-times"
                            style={{ marginLeft: 5 }}
                          />
                        </p>
                      </div>
                    </div> */}

                    <div className="priority" style={{ marginBottom: 20 }}>
                      <h6>PRIORITY</h6>
                      <select
                        name="priorityId"
                        className="form-control"
                        value={taskDetailModal.priorityId}
                        // value={taskDetailModal.priorityTask?.priorityId}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        {arrPriority.map((item, index) => {
                          return (
                            <option key={index} value={item.priorityId}>
                              {item.priority}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="estimate">
                      <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                      <input
                        name="originalEstimate"
                        type="text"
                        className="estimate-hours"
                        value={taskDetailModal.originalEstimate}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>

                    <div className="time-tracking">
                      <h6>TIME TRACKING</h6>
                      {renderTimeTracking()}
                    </div>
                    <div style={{ color: "#929398" }}>
                      Create at a month ago
                    </div>
                    <div style={{ color: "#929398" }}>
                      Update at a few seconds ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
