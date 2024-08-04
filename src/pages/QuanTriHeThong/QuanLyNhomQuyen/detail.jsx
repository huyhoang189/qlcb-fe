import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Checkbox, Space } from "antd";
import {
  CreateButton,
  DeleteButton,
  DetailButton,
  UpdateButton,
} from "../../../components/Button/index.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import CustomeTable from "../../../components/Table/table.jsx";
import TextInput from "../../../components/Form/textinput.jsx";
import permissionSlice from "../../../toolkits/QuanTriHeThong/Permission/slice.js";
import Header from "../../../components/Table/header.jsx";
import { useParams } from "react-router-dom";
import { ACTION_NAME } from "../../../utils/common.js";

const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Quản trị hệ thống",
    },
    {
      title: "Nhóm quyền",
    },
    {
      title: "Chi tiết",
    },
  ],
};

const baseColumns = [
  {
    title: "STT",
    dataIndex: "key_table",
    key: "key_table",
    width: 50,
    align: "center",
  },

  // {
  //   title: "Tên nhóm",
  //   dataIndex: "name",
  //   key: "name",
  //   align: "center",
  // },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    // align: "center",
  },
];

const Permission = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { permissions, isLoading, totalItem, pageNumber, pageSize } =
    useSelector((state) => state.permissions);

  const [keyword, setKeyword] = useState("");

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      permissionSlice.actions.getPermissions({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
        group_id: id,
      })
    );
  };

  const columns = [
    ...baseColumns,
    {
      title: "Công cụ",
      key: "tool",
      align: "center",
      width: 140,
      render: (text, record) => (
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <Checkbox
            checked={record?.status}
            onChange={() =>
              dispatch(
                permissionSlice.actions.handlePermission({
                  item: record,
                  group_id: id,
                  actionName: record?.status
                    ? ACTION_NAME.DELETE
                    : ACTION_NAME.CREATE,
                })
              )
            }
          />
        </Space>
      ),
    },
  ];

  //side effect
  useEffect(() => {
    dispatch(
      permissionSlice.actions.getPermissions({
        keyword,
        pageSize: 10,
        pageNumber: 1,
        group_id: id,
      })
    );
  }, [dispatch, keyword]);

  return (
    <ContentWrapper>
      <CustomBreadcrumb items={pageHeader.breadcrumb} />
      <CustomeTable
        header={
          <Header>
            <TextInput
              placeholder={"Nhập vào từ khoá tìm kiếm"}
              onChange={onChangeKeywordInput}
              property={"keyword"}
              width={20}
            />
          </Header>
        }
        data={permissions}
        columns={columns}
        isLoading={isLoading}
        pagination={{
          current: pageNumber,
          pageSize: pageSize,
          total: totalItem,
          onChange: handlePaginationChange,
        }}
      />
    </ContentWrapper>
  );
};

export default Permission;
