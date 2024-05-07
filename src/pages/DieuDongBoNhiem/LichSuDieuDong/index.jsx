import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import CustomeTable from "../../../components/Table/table.jsx";
import { useDispatch, useSelector } from "react-redux";
import lichSuDieuDongSlice from "../../../toolkits/DieuDongBoNhiem/LichSuDieuDong/slice.js";
import { useEffect, useState } from "react";
import { Space } from "antd";
import {
  CreateButton,
  DeleteButton,
  DetailButton,
  UpdateButton,
} from "../../../components/Button/index.jsx";
import Header from "../../../components/Table/header.jsx";
import TextInput from "../../../components/Form/textinput.jsx";
import ModalItem from "./modal.jsx";
import { useNavigate } from "react-router-dom";

const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Điều động - Bổ nhiệm",
    },
    {
      title: "Bổ nhiệm cán bộ",
    },
    {
      title: "Lịch sử điều động",
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
    title: "Tiêu đề",
    dataIndex: "tieu_de",
    key: "tieu_de",
  },
  {
    title: "Năm",
    dataIndex: "nam",
    key: "nam",
  },
  {
    title: "Đợt",
    dataIndex: "dot",
    key: "dot",
  },
  {
    title: "Ghi chú",
    dataIndex: "ghi_chu",
    key: "ghi_chu",
  },
];

const QuanLyLichSuDieuDong = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lichSuDieuDongs, isLoading, totalItem, pageNumber, pageSize } =
    useSelector((state) => state.lichSuDieuDongs);

  const [keyword, setKeyword] = useState("");

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      lichSuDieuDongSlice.actions.getLichSuDieuDongs({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
      })
    );
  };

  const handleModal = (_item) => {
    dispatch(lichSuDieuDongSlice.actions.toggleModal(_item));
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
          <DetailButton
            onClick={() => {
              navigate(`${record.id}/danh-sach-bo-nhiem`);
            }}
          />
          <UpdateButton onClick={() => handleModal(record)} />
          <DeleteButton
            onConfirm={() => {
              dispatch(
                lichSuDieuDongSlice.actions.handleLichSuDieuDong({
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
      lichSuDieuDongSlice.actions.getLichSuDieuDongs({
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
        data={lichSuDieuDongs}
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

export default QuanLyLichSuDieuDong;
