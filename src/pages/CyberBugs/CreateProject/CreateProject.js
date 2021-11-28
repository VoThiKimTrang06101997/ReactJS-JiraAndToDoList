import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function CreateProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  
  const dispatch = useDispatch();

  console.log("Kết quả:", arrProjectCategory);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  useEffect(() => {
    // Gọi API để lấy dữ liệu thẻ select
    dispatch({
      type: "GET_ALL_PROJECT_CATEGORY_SAGA",
    });
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center font-weight-bold text-primary">
        Create Project
      </h3>
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <p className="font-weight-bold">Name</p>
          <input
            className="form-control"
            name="projectName"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <p className="font-weight-bold">Description</p>
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
            onEditorChange={handleEditorChange}
          />
        </div>

        <div className="form-group">
          <select
            name="categoryId"
            className="form-control"
            onChange={handleChange}
          >
            {arrProjectCategory.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>

        <button className="btn btn-outline-primary" type="submit">
          Create Project
        </button>
      </form>
    </div>
  );
}

const CreateProjectWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    console.log("propsvalue", props);
    return {
      projectName: "",
      description: "",
      categoryId: props.arrProjectCategory[0]?.id,
    };
  },

  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({ type: "CREATE_PROJECT_SAGA", newProject: values });
  },

  displayName: "CreateProjectFormik",
})(CreateProject);

const mapStateToProps = (state) => ({
  arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
});

export default connect(mapStateToProps)(CreateProjectWithFormik);



