import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import CustomeTable from "../../../components/Table/table.jsx";
import { useDispatch, useSelector } from "react-redux";
import chiTietKeHoachSlice from "../../../toolkits/QuanLyDaoTao/ChiTietKeHoach/slice.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Space } from "antd";
import {
  CreateButton,
  DeleteButton,
  UpdateButton,
} from "../../../components/Button/index.jsx";
import Header from "../../../components/Table/header.jsx";
import TextInput from "../../../components/Form/textinput.jsx";
import ModalItem from "./modal.jsx";

const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Quản lý đào tạo",
    },
    {
      title: "Kế hoạch bồi dưỡng đào tạo cán bộ",
      href:"/quan-ly-dao-tao/ke-hoach-dao-tao-boi-duong-can-bo",
    },
    {
      title: "Chi tiết kế hoạch",
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
    title: "Trường học",
    dataIndex: "truong_hoc",
    key: "truong_hoc",
    align: "center",
    render: (text, record) => {
      return record?.truong_hoc?.ten_truong;
    },
  },
  {
    title: "Chuyên ngành",
    dataIndex: "chuyen_nganh",
    key: "chuyen_nganh",
    align: "center",
    render: (text, record) => {
      return record?.chuyen_nganh?.ten;
    },
  },
  {
    title: "Loại hình đào tạo",
    dataIndex: "loai_hinh_dao_tao",
    key: "loai_hinh_dao_tao",
    align: "center",
    render: (text, record) => {
      return record?.loai_hinh_dao_tao?.ten;
    },
  },
  {
    title: "Thời gian bắt đầu",
    dataIndex: "thoi_gian_bat_dau",
    key: "thoi_gian_bat_dau",
    align: "center",
  },
  {
    title: "Thời gian kết thúc",
    dataIndex: "thoi_gian_ket_thuc",
    key: "thoi_gian_ket_thuc",
    align: "center",
  },
];

const QuanLyChiTietKeHoach = () => {
  const params = useParams();
  const { ma_ke_hoach } = params;
  const dispatch = useDispatch();
  const { chiTietKeHoachs, isLoading, totalItem, pageNumber, pageSize } =
    useSelector((state) => state.chiTietKeHoachs);

  const [keyword, setKeyword] = useState("");

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  // const handlePaginationChange = (current, pageSize) => {
  //   dispatch(
  //     chiTietKeHoachSlice.actions.getChiTietKeHoachs({
  //       ma_ke_hoach,
  //       keyword,
  //       pageSize: pageSize,
  //       pageNumber: current,
  //     })
  //   );
  // };

  const handleModal = (_item) => {
    dispatch(chiTietKeHoachSlice.actions.toggleModal(_item));
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
                chiTietKeHoachSlice.actions.handleChiTietKeHoach({
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
      chiTietKeHoachSlice.actions.getChiTietKeHoachs({
        ma_ke_hoach,
        keyword,
        pageSize: 1000,
        pageNumber: 1,
      })
    );
  }, [dispatch]);

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
        data={chiTietKeHoachs}
        columns={columns}
        isLoading={isLoading}
        pagination={{
          current: pageNumber,
          pageSize: pageSize,
          total: totalItem,
          //onChange: handlePaginationChange,
        }}
      />

      <ModalItem />
    </ContentWrapper>
  );
};

export default QuanLyChiTietKeHoach;
