import React from 'react'
import { UserOutlined, LockOutlined, TwitterOutlined, FacebookOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { withFormik, Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { USER_SIGNIN_API } from '../../../redux/constants/CyberBugs/Cyberbugs';
import { signInCyberbugsAction } from '../../../redux/actions/CyberBugsAction';

function LoginCyberBugs(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

    return (
        <form onSubmit={handleSubmit} className="container" style={{height: window.innerHeight}}>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height: window.innerHeight}}>
          <h3 className="text-center" style={{fontWeight: 500, fontSize: 35}}>Login CyberBugs</h3>
          <div className="d-flex mt-3">
          <Input onChange={handleChange} style={{width: "100%", minWidth: 300}} name="email" size="large" placeholder="email" prefix={<UserOutlined/>} />
          </div>
          <div className="text-danger">
            {errors.email}
          </div>
           
          <div className="d-flex mt-3">
            <Input onChange={handleChange} style={{width: "100%", minWidth: 300}} type="password" name="password" size="large" placeholder="password" prefix={<LockOutlined/>} />
          </div>
          <div className="text-danger">
            {errors.password}
          </div>
          

          <Button htmlType="submit" size="large" style={{minWidth: 300, backgroundColor:"rgb(102,117,223)", color: "white"}} className="mt-5">Login</Button>

          <div className="social mt-3 d-flex">
            {/* <Button style={{backgroundColor:"rgb(59,89,152)", marginBottom: 3}} shape="circle" size={"large"} >
                <span className="font-weight-bold" style={{color: "white", fontSize: "20px"}}>f</span>
            </Button> */}
            
            <Button type="primary ml-3" shape="circle" icon={<FacebookOutlined/>}  size={"large"} ></Button>
            <Button type="primary ml-3" shape="circle" icon={<TwitterOutlined/>} size={"large"} ></Button>
          </div>
      </div>
    </form>
    )
}

const LoginCyberBugsWithFormik= withFormik({
  mapPropsToValues: () => ({ 
    email: "",
    password: ""
  }),

  validationSchema: Yup.object().shape({ 
    email: Yup.string().required("Email is required !").email("Email is invalid !"),
    password: Yup.string().required("Password is required !").min(6, "Password must have min 6 characters")
                          .max(32, "Password must have max 32 characters")
  }),

  handleSubmit: ({email, password}, { props, setSubmitting }) => {
    // let action = {
    //   type: USER_SIGNIN_API,
    //   userLogin: {
    //     email: values.email,
    //     password: values.password
    //   }
    // }
    setSubmitting(true);
    props.dispatch(signInCyberbugsAction(email, password));

    // console.log(props);
    // console.log(values);
  },

  displayName: 'Login CyberBugs',
})(LoginCyberBugs);

export default connect () (LoginCyberBugsWithFormik) ;
