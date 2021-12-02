import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Select, Radio } from "antd";
import { Slider } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import { GET_ALL_PROJECT_SAGA } from "../../../redux/constants/CyberBugs/ProjectCyberBugsConstant";
import { GET_ALL_TASK_TYPE_SAGA } from "../../../redux/constants/CyberBugs/TaskTypeConstant";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/constants/CyberBugs/PriorityConstant";
import { withFormik } from "formik";
import * as Yup from "yup";
import { GET_ALL_STATUS_SAGA } from "../../../redux/constants/CyberBugs/StatusConstant";
import { GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA } from "../../../redux/constants/CyberBugs/UserConstant";

const { Option } = Select;

function FormCreateTask(props) {
  // Do kết nối với withFormik => Component có các Props
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  // Lấy dữ liệu từ Redux về
  const { arrProject } = useSelector((state) => state.ProjecCyberBugstReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrUser } = useSelector((state) => state.UserLoginCyberBugsReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  console.log("arrStatus", arrStatus);

  // Hàm biến đổi Option cho thẻ Select
  const userOption = arrUser.map((item, index) => {
    return { value: item.userId, label: item.name };
  });

  const dispatch = useDispatch();

  // Hook
  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_STATUS_SAGA });
    // Đưa hàm handle submit lên DrawerReducer để cập nhật lại sự kiện cho nút Submit
    dispatch({type: "SET_SUBMIT_CREATE_TASK", submitFunction: handleSubmit})

    dispatch({ type: "GET_USER_API", keyWord: "" });
  }, []);

  const [size, setSize] = React.useState("default");

  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <p className="font-weight-bold text-danger">Project</p>
        <select 
          className="form-control"
          name="projectId"
          onChange={(e) => {
            // Dispatch làm thay đổi dữ liệu arrUser
            let {value} = e.target;
            dispatch({
              type: GET_USER_BY_PROJECT_ID_SAGA,
              idProject: value
            })
            // Cập nhật giá trị cho project Id
            setFieldValue("projectId", e.target.value);
          }}
        >
          {arrProject.map((project, index) => {
            return (
              <option key={index} value={project.id}>
                {project.projectName}
              </option>
            );
          })}
        </select>
      </div>

      <div className="form-group">
        <p className="font-weight-bold text-danger">Task Name</p>
        <input
          name="taskName"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <p className="font-weight-bold text-danger">Status</p>
        <Select
          name="statusId"
          className="form-control"
          onChange={handleChange}
        >
          {arrStatus.map((statusItem, index) => {
            return (
              <option key={index} value={statusItem.statusId}>
                {statusItem.statusName}
              </option>
            );
          })}
        </Select>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p className="font-weight-bold text-danger">Priority</p>
            <select
              name="priorityId"
              className="form-control"
              onChange={handleChange}
            >
              {arrPriority.map((priority, index) => {
                return (
                  <option key={index} value={priority.priorityId}>
                    {priority.priority}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-6">
            <p className="font-weight-bold text-danger">Task Type</p>
            <select
              name="typeId"
              className="form-control"
              onChange={handleChange}
            >
              {arrTaskType.map((taskType, index) => {
                return (
                  <option key={index} value={taskType.id}>
                    {taskType.taskType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p className="font-weight-bold text-danger">Assignees</p>
            <Select
              mode="tags"
              size={size}
              options={userOption}
              placeholder="Please select"
              optionFilterProp="label"
              onChange={(values) => {
                // Set lại giá trị cho listUserAssignees
                setFieldValue("listUserAsign", values);
              }}
              onSelect={(value) => {
                console.log("value", value);
              }}
              style={{ width: "100%" }}
            >
              {children}
            </Select>

            <div className="row mt-3">
              <div className="col-12">
                <p className="font-weight-bold text-danger">
                  Original Estimate
                </p>
                <input
                  type="number"
                  defaultValue="0"
                  min="0"
                  className="form-control"
                  name="originalEstimate"
                  height="30"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="col-6">
            <p className="font-weight-bold text-danger">Time Tracking</p>
            <Slider
              defaultValue={30}
              value={timeTracking.timeTrackingSpent}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
            />
            <div className="row">
              <div className="col-6 text-left font-weight-bold text-primary">
                {timeTracking.timeTrackingSpent}h logged{" "}
              </div>
              <div className="col-6 text-right font-weight-bold text-primary">
                {timeTracking.timeTrackingRemaining}h remaining
              </div>
            </div>
            <div className="row" style={{ marginTop: 5 }}>
              <div className="col-6">
                <p className="font-weight-bold text-danger">Time Spent</p>
                <input
                  type="number"
                  defaultValue="0"
                  min="0"
                  className="form-control"
                  name="timeTrackingSpent"
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                    setFieldValue("timeTrackingSpent", e.target.value);
                  }}
                />
              </div>

              <div className="col-6">
                <p className="font-weight-bold text-danger">Time Remaining</p>
                <input
                  type="number"
                  defaultValue="0"
                  min="0"
                  className="form-control"
                  name="timeTrackingRemaining"
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                    setFieldValue("timeTrackingRemaining", e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <p className="font-weight-bold text-danger">Description</p>
        <Editor
          name="description"
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
            setFieldValue("description", content);
          }}
        />
      </div>
      {/* <button type="submit">Submit</button> */}
    </form>
  );
}

// const handleEditorChange = (content, editor) => {
//   setFieldValue("description", content);
// };

const formCreateTask = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const {arrProject, arrTaskType, arrPriority, arrStatus} = props;
    // if(arrProject.length>0) {
    //   props.dispatch({type: GET_USER_BY_PROJECT_ID_SAGA, idProject: arrProject[0]?.id});
    // }
    

    return {
      taskName: "",
      description: "",
      statusId: arrStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: arrProject[0]?.id,
      typeId: arrTaskType[0]?.id,
      priorityId: arrPriority[0]?.priorityId,
      listUserAsign: [],
    };
  },

  // validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({ type: "CREATE_TASK_SAGA", taskObject: values });
    console.log("taskObject", values);
  },

  displayName: "createTaskForm",
})(FormCreateTask);


const mapStateToProps = (state) => {
  return {
    arrProject: state.ProjecCyberBugstReducer.arrProject,
    arrTaskType: state.TaskTypeReducer.arrTaskType,
    arrPriority: state.PriorityReducer.arrPriority,
    arrStatus: state.StatusReducer.arrStatus

  };
};

export default connect(mapStateToProps)(formCreateTask);
