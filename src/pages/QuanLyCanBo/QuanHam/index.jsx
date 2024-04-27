import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import CustomeTable from "../../../components/Table/table.jsx";
import { useDispatch, useSelector } from "react-redux";
import quanHamSlice from "../../../toolkits/QuanLyCanBo/QuanHam/slice.js";
import canBoCoBanSlice from "../../../toolkits/QuanLyCanBo/ThongTinCoBan/slice.js";
import { useEffect, useState } from "react";
import { Space } from "antd";
import {
  CreateButton,
  DeleteButton,
  UpdateButton,
} from "../../../components/Button/index.jsx";
import Header from "../../../components/Table/header.jsx";
import { useParams } from "react-router-dom";
import ModalItem from "./modal.jsx";

const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Quản lý hồ sơ cán bộ",
      href: "/quan-ly-ho-so-can-bo/danh-sach-can-bo",
    },
    {
      title: `Bảo hiểm`,
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
    title: "Hệ số",
    dataIndex: "he_so",
    key: "he_so",
    align: "center",
  },
  {
    title: "Quân hàm",
    dataIndex: "quan_ham",
    key: "quan_ham",
    align: "center",
  },
  {
    title: "Thời gian",
    dataIndex: "thoi_gian",
    key: "thoi_gian",
    align: "center",
  },
  {
    title: "Ghi chú",
    dataIndex: "ghi_chu",
    key: "ghi_chu",
    align: "center",
  },
];

const QuanHam = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { quanHams, isLoading, totalItem, pageNumber, pageSize } =
    useSelector((state) => state.quanHams);

  const { selectedCanBoCoBan } = useSelector((state) => state.canBoCoBans);

  const [keyword, setKeyword] = useState("");

  const { ma_can_bo } = params;

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      quanHamSlice.actions.getQuanHams({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
        ma_can_bo,
      })
    );
  };

  const handleModal = (_item) => {
    dispatch(quanHamSlice.actions.toggleModal(_item));
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
                quanHamSlice.actions.handleQuanHam({
                  ma_can_bo,
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
    dispatch(canBoCoBanSlice.actions.getCanBoCoBanById({ id: ma_can_bo }));
    dispatch(
      quanHamSlice.actions.getQuanHams({
        keyword,
        pageSize: 10,
        pageNumber: 1,
        ma_can_bo,
      })
    );
  }, [dispatch, keyword]);

  return (
    <ContentWrapper>
      <CustomBreadcrumb
        items={[
          ...pageHeader.breadcrumb,

          {
            title: `${selectedCanBoCoBan?.ho_ten_khai_sinh} - Số hiệu: ${selectedCanBoCoBan?.so_hieu_quan_nhan}`,
          },
        ]}
      />
      <CustomeTable
        header={
          <Header justify={"flex-end"}>
            <CreateButton onClick={() => handleModal(null)} />
          </Header>
        }
        data={quanHams}
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

export default QuanHam;
