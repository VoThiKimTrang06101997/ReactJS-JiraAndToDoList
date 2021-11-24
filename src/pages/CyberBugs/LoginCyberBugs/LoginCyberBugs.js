import React from 'react'
import { UserOutlined, LockOutlined, TwitterOutlined, FacebookOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

export default function LoginCyberBugs(prop) {
    return (
        <form className="container" style={{height: window.innerHeight}}>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height: window.innerHeight}}>
          <h3 className="text-center" style={{fontWeight: 500, fontSize: 35}}>Login CyberBugs</h3>
          <div className="d-flex mt-3">
        <Input style={{width: "100%", minWidth: 450}} name="email" size="large" placeholder="email" prefix={<UserOutlined/>} />
          </div>
           

          <div className="d-flex mt-3">
            <Input style={{width: "100%", minWidth: 450}} type="password" name="password" size="large" placeholder="password" prefix={<LockOutlined/>} />
          </div>
          

          <Button htmlType="submit" size="large" style={{minWidth: 450, backgroundColor:"rgb(102,117,223)", color: "white"}} className="mt-5">Login</Button>

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
