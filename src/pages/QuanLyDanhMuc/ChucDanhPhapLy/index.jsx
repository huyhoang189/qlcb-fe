import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import CustomeTable from "../../../components/Table/table.jsx";
import { useDispatch, useSelector } from "react-redux";
import chucDanhPhapLySlice from "../../../toolkits/QuanLyDanhMuc/ChucDanhPhapLy/slice.js";
import { useEffect, useState } from "react";
import { Space } from "antd";
import {
  CreateButton,
  DeleteButton,
  UpdateButton,
} from "../../../components/Button/index.jsx";
import Header from "../../../components/Table/header.jsx";
import TextInput from "../../../components/Form/textinput.jsx";
import ModalItem from "./modal.jsx";
import { LOAI_CHUC_DANH_PHAP_LY } from "../../../utils/common.js";

const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Quản lý danh mục",
    },
    {
      title: "Quản lý chức danh pháp lý",
    },
  ],
};

const baseColumns = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
    width: 50,
    align: "center",
  },
  {
    title: "Tên chức danh",
    dataIndex: "ten_chuc_danh",
    key: "ten_chuc_danh",
    align: "center",
  },
  {
    title: "Loại chức danh",
    dataIndex: "loai_chuc_danh",
    key: "loai_chuc_danh",
    align: "center",
    render: (text, record) => {
      return (
        LOAI_CHUC_DANH_PHAP_LY.find((e) => e?.value === record?.loai_chuc_danh)
          ?.label || "Không xác định"
      );
    },
  },
  {
    title: "Ghi chú",
    dataIndex: "ghi_chu",
    key: "ghi_chu",
    align: "center",
  },
];

const QuanLyChucDanhPhapLy = () => {
  const dispatch = useDispatch();
  const { chucDanhPhapLys, isLoading, totalItem, pageNumber, pageSize } =
    useSelector((state) => state.chucDanhPhapLys);

  const [keyword, setKeyword] = useState("");

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      chucDanhPhapLySlice.actions.getChucDanhPhapLys({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
      })
    );
  };

  const handleModal = (_item) => {
    dispatch(chucDanhPhapLySlice.actions.toggleModal(_item));
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
          <UpdateButton onClick={() => handleModal(record)} />
          <DeleteButton
            onConfirm={() => {
              dispatch(
                chucDanhPhapLySlice.actions.handleChucDanhPhapLy({
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
      chucDanhPhapLySlice.actions.getChucDanhPhapLys({
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
        data={chucDanhPhapLys}
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

export default QuanLyChucDanhPhapLy;
