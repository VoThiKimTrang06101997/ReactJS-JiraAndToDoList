import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentMain from "../../../components/CyberBugs/MainBoard/ContentMain";
import HeaderMain from "../../../components/CyberBugs/MainBoard/HeaderMain";
import InfoMain from "../../../components/CyberBugs/MainBoard/InfoMain";

export default function IndexCyberBugs(props) {
  const { projectDetail } = useSelector((state) => state.ProjectReducer);

  const dispatch = useDispatch();
  console.log("projectDetail", projectDetail);

  useEffect(() => {
    // Khi người dùng link qua trang này bằng thẻ Navlink hoặc người dùng tự gõ url thì ta sẽ lấy tham số từ url => Gọi Saga
    const { projectId } = props.match.params;
    dispatch({
      type: "GET_PROJECT_DETAIL",
      projectId,
    });
  }, []);

  console.log(props.match.params.projectId);

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
