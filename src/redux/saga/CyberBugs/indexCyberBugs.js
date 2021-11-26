import React from "react";
import ContentMain from "../../../components/CyberBugs/MainBoard/ContentMain";
import HeaderMain from "../../../components/CyberBugs/MainBoard/HeaderMain";
import InfoMain from "../../../components/CyberBugs/MainBoard/InfoMain";

export default function indexCyberBugs() {
  return (
    /* Main Board */
    <div className="main">
      <HeaderMain />
      <h3>Cyber Board</h3>
      <InfoMain />
      <ContentMain />
    </div>
  );
}
