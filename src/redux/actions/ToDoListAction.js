import Axios from "axios";
import { GET_TASK_API } from "../constants/ToDoListConst";

/**
 * Action có 2 loại:
 *  + Action thực thi ngay => Làm thay đổi Reducer (action 1).
 *  + Action phải thực hiện xử lý rồi mới gọi action 1 thực thi (async action).
 */

export const getTaskListApi = () => {
  return async (dispatch) => {
    try {
      // Tiền xử lý dữ liệu  => Xử lý Function
      let { data, status, ...res } = await Axios({
        url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
        method: "GET",
      });

      if (status === 200) {
        dispatch({
          // Nếu gọi API lấy về kết quả thành công   => Set lại State của Component
          type: GET_TASK_API,
          taskList: data,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

// Hàm Thêm Task
export const addTaskApi = (taskName) => {
  return async (dispatch) => {
    try {
      // Xử lý trước khi dispatch
      let { data, status, ...res } = await Axios({
        url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
        method: "POST",
        data: { taskName: taskName },
      });

      if (status === 200) {
        dispatch(getTaskListApi());
        alert("Thêm thành công !");
      }
    } catch (error) {
      alert(error.response.data);
    }
  };
};

// Hàm Xóa Task
export const deleteTaskApi = (taskName) => {
  return async (dispatch) => {
    try {
      let { data, status, ...res } = await Axios({
        url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
        method: "DELETE",
      });

      if (status === 200) {
        // Sau khi thực hiện Api gọi phương thức dispatchAction getTaskListApi để load lại Task
        dispatch(getTaskListApi());
        alert(data);
      }
    } catch (error) {
      alert(error.response.data);
    }
  };
};

// Hàm Kiểm tra Task (checkTask) để xem đã thực hiện hay chưa?
export const checkTaskApi = (taskName) => {
  return async (dispatch) => {
    try {
      let { data, status, ...res } = await Axios({
        url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
        method: "PUT",
      });
      if (status === 200) {
        // Sau khi thực hiện Api gọi phương thức dispatchAction getTaskListApi để load lại Task
        dispatch(getTaskListApi());
        alert(data);
      }
    } catch (error) {
      alert(error.response.data);
    }
  };
};

// Hàm Xử lý RejectTask để xem Task vẫn chưa thực hiện
export const rejectTaskApi = (taskName) => {
  return async (dispatch) => {
    try {
      let { data, status, ...res } = await Axios({
        url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
        method: "PUT",
      });
      if (status === 200) {
        // Sau khi thực hiện Api gọi phương thức dispatchAction getTaskListApi để load lại Task
        dispatch(getTaskListApi());
        alert(data);
      }
    } catch (error) {
      alert(error.response.data);
    }
  };
};
