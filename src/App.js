import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Header from "./components/Home/Header/Header";

import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import TodolistRFC from "./pages/Todolist/TodolistRFC";
import TodolistRCC from "./pages/Todolist/TodolistRCC";
import ToDoListRedux from "./pages/Todolist/ToDoListRedux";
import BaiTapToDoListSaga from "./pages/BaiTapToDoListSaga/BaiTapToDoListSaga";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import { useDispatch } from "react-redux";
import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import DrawerCyberbugs from "./HOC/CyberbugsHOC/DrawerCyberbugs";
import IndexCyberBugs from "./redux/saga/CyberBugs/indexCyberBugs";


function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "ADD_HISTORY",
      history: history
    });
  }, [])

  return (
    <>
      {/* <Header/> */}
      <LoadingComponent/>
      <DrawerCyberbugs/>
      
      
      <Switch>
        <HomeTemplate exact path="/home" Component={Home}/>
        <HomeTemplate exact path="/contact" Component={Contact} />
        <HomeTemplate exact path="/about" Component={About} />
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
        <HomeTemplate exact path="/detail/:id" Component={Detail} />
        <HomeTemplate exact path="/profile" Component={Profile} />
        <HomeTemplate exact path="/todolistrfc" Component={TodolistRFC} />
        <HomeTemplate exact path="/todolistrcc" Component={TodolistRCC} />
        <HomeTemplate exact path="/todolistredux" Component={ToDoListRedux} />
        <HomeTemplate exact path="/todolistsaga" Component={BaiTapToDoListSaga} />
        <CyberbugsTemplate exact path="/cyberbugs" Component={IndexCyberBugs}/>
        <CyberbugsTemplate exact path="/createproject" Component={CreateProject}/>
        <CyberbugsTemplate exact path="/projectmanagement" Component={ProjectManagement}/>
        <CyberbugsTemplate exact path="/projectdetail/:projectId" Component={IndexCyberBugs}/>

        {/* Trang chủ */}
        <CyberbugsTemplate exact path="/" Component={ProjectManagement}/>
        <HomeTemplate path="*" component={PageNotFound} />
       
      </Switch>
    </>
  );
}

export default App;
