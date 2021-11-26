import React from "react";
import Img1 from "../../../assets/img/download (1).png";
import Img2 from "../../../assets/img/download (2).png";
import Img3 from "../../../assets/img/download (3).png";

export default function InfoMain() {
  return (
    <div className="info" style={{ display: "flex" }}>
      <div className="search-block">
        <input className="search" />
        <i className="fa fa-search" />
      </div>
      <div className="avatar-group" style={{ display: "flex" }}>
        <div className="avatar">
          <img src={Img1} alt="" />
        </div>
        <div className="avatar">
          <img src={Img2} alt="" />
        </div>
        <div className="avatar">
          <img src={Img3} alt="" />
        </div>
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Only My Issues
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Recently Updated
      </div>
    </div>
  );
}
