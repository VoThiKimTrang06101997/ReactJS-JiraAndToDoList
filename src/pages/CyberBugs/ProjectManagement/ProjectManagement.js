import React, { useState } from "react";
import { Table, Input, Button, Space } from "antd";
import ReactHtmlParser from "react-html-parser";
import HtmlParser from "react-html-parser";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const data = [
  {
    id: 1,
    projectName: "Web Jira",
    description: "Web quản lý Task dự án",
    categoryId: 1,
    alias: "web-Jira",
    deleted: false,
  },
  {
    id: 2,
    projectName: "App Jira",
    description: "App quản lý Task dự án",
    categoryId: 3,
    alias: "app-Jira",
    deleted: false,
  },
  {
    id: 3,
    projectName: "Phần mềm Jira",
    description: "Phần mềm quản lý công việc",
    categoryId: 2,
    alias: "phan-mem-Jira",
    deleted: false,
  },
];

export default function ProjectManagement(props) {
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age",
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record, index) => {
        let jsxContent = ReactHtmlParser(text);
        return <div key={index}>{jsxContent}</div>;
      },
    },

    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <a onClick={() => {
              
          }}><EditOutlined/></a>
          <a><DeleteOutlined/></a>
        </Space>
      ),
    },
  ];

  return (
    <div className="container-fluid mt-5">
      <h3>Project Management</h3>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={data}
        onChange={handleChange}
      />
    </div>
  );
}
