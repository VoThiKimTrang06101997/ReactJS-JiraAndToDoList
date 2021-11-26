import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import ContentMain from "../../components/CyberBugs/MainBoard/ContentMain";
import HeaderMain from "../../components/CyberBugs/MainBoard/HeaderMain";
import InfoMain from "../../components/CyberBugs/MainBoard/InfoMain";
import MenuCyberbugs from "../../components/CyberBugs/MenuCyberbugs";
import ModalCyberBugs from "../../components/CyberBugs/ModalCyberBugs.js/ModalCyberBugs";
import SidebarCyberbugs from "../../components/CyberBugs/SidebarCyberbugs";
import Header from "../../components/Home/Header/Header";
import "../../index.css";

export const CyberbugsTemplate = (props) => {
  const { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <>
            <div className="jira">
              {/* SideBar */}
              <SidebarCyberbugs />

              {/* Menu */}
              <MenuCyberbugs />

              {/* Main Board */}
              <Component {...propsRoute} />

              {/* Search Modal  */}
              <ModalCyberBugs />
            </div>
          </>
        );
      }}
    />
  );
};
