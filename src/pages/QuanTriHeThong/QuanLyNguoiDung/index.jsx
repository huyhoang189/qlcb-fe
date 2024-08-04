import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Space, Tag } from "antd";
import {
  CreateButton,
  DeleteButton,
  UpdateButton,
} from "../../../components/Button/index.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import CustomeTable from "../../../components/Table/table.jsx";
import TextInput from "../../../components/Form/textinput.jsx";
import userSlice from "../../../toolkits/QuanTriHeThong/User/slice.js";
import ModalItem from "./modal.jsx";
import Header from "../../../components/Table/header.jsx";
import { convertUTCtoAsianTime } from "../../../utils/time.js";
import {
  LockFilled,
  LockOutlined,
  UnlockFilled,
  UnlockOutlined,
} from "@ant-design/icons";
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
      title: "Danh mục quyền hệ thống",
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

  {
    title: "Tên người dùng",
    dataIndex: "full_name",
    key: "full_name",
    align: "center",
  },
  {
    title: "Tên tài khoản",
    dataIndex: "user_name",
    key: "user_name",
    align: "center",
  },
  {
    title: "Nhóm người dùng",
    dataIndex: "group",
    key: "group",
    align: "center",
    render: (text, record) => {
      return record?.auth_group?.name;
    },
  },
  {
    title: "Trạng thái hoạt động",
    dataIndex: "is_active",
    key: "is_active",
    align: "center",
    render: (text, record) => {
      return text ? (
        <Tag color="green">Đang hoạt động</Tag>
      ) : (
        <Tag color="red">Khoá</Tag>
      );
    },
  },
  {
    title: "Đăng nhập gần nhất",
    dataIndex: "lastest_login",
    key: "lastest_login",
    align: "center",
    render: (text, record) => {
      return convertUTCtoAsianTime(text);
    },
  },

  {
    title: "Thời gian tạo",
    dataIndex: "created_at",
    key: "created_at",
    align: "center",
    render: (text, record) => {
      return convertUTCtoAsianTime(text);
    },
  },
];

const User = () => {
  const dispatch = useDispatch();
  const { users, isLoading, totalItem, pageNumber, pageSize } = useSelector(
    (state) => state.users
  );

  const [keyword, setKeyword] = useState("");

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      userSlice.actions.getUsers({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
      })
    );
  };

  const handleModal = (_item) => {
    dispatch(userSlice.actions.toggleModal(_item));
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
          <UpdateButton
            title={record?.is_active ? "Khoá" : "Mở khoá"}
            icon={
              record?.is_active ? (
                <LockFilled style={{ color: "red" }} />
              ) : (
                <UnlockFilled style={{ color: "green" }} />
              )
            }
            onClick={() => {
              dispatch(
                userSlice.actions.handleUser({
                  item: record,
                  actionName: ACTION_NAME.ACTIVE,
                })
              );
            }}
          />
          <UpdateButton onClick={() => handleModal(record)} />
          <DeleteButton
            onConfirm={() => {
              dispatch(
                userSlice.actions.handleUser({
                  item: record,
                  actionName: "DELETE",
                  pageSize: pageSize,
                  pageNumber:
                    record?.key === pageSize * (pageNumber - 1) + 1
                      ? Math.max(pageNumber - 1, 1)
                      : pageNumber,
                })
              );
            }}
          />
        </Space>
      ),
    },
  ];

  //side effect
  useEffect(() => {
    dispatch(
      userSlice.actions.getUsers({
        keyword,
        pageSize: 10,
        pageNumber: 1,
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
            <CreateButton onClick={() => handleModal(null)} />
          </Header>
        }
        data={users}
        columns={columns}
        isLoading={isLoading}
        pagination={{
          current: pageNumber,
          pageSize: pageSize,
          total: totalItem,
          onChange: handlePaginationChange,
        }}
      />

      <ModalItem />
    </ContentWrapper>
  );
};

export default User;
