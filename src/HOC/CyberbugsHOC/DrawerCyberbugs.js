import React, { useState } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

export default function DrawerCyberbugs(props) {

  const {visible, ComponentContentDrawer, callBackSubmit} = useSelector(state=>state.drawerReducer);
  const dispatch = useDispatch();
  console.log("visible", visible);

  const showDrawer = () => {
    dispatch({type: "OPEN_DRAWER"})
  };

  const onClose = () => {
    dispatch({type: "CLOSE_DRAWER"})
  };

  return (
    <>
    {/* <button onClick={showDrawer}>Show Drawer</button> */}
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}

        footer={
          <div style={{textAlign: "right"}}>
            <Button onClick={onClose} style={{marginRight: 8}}>Cancel</Button>
            <Button onClick={onClose} type="primary" onClick={callBackSubmit}>
              Submit
            </Button>
          </div>
        }
      > 
       {/* Nội dung thay đổi của Drawer  */}
       {ComponentContentDrawer}
       </Drawer>
    </>
  );
}
