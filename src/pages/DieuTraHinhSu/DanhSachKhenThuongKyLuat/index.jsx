import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import CustomeTable from "../../../components/Table/table.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Table/header.jsx";
import TextInput from "../../../components/Form/textinput.jsx";
import danhSachKhenThuongKyLuatSlice from "../../../toolkits/DieuTraHinhSu/DanhSachKhenThuongKyLuat/slice.js";
import { Space } from "antd";
import { LOAI_KHEN_THUONG_KY_LUAT } from "../../../utils/common";
import { DeleteButton } from "../../../components/Button/index.jsx";

const CanBoColumns = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
    width: 10,
    align: "center",
  },
  {
    title: "Họ và tên khai sinh",
    dataIndex: "can_bo",
    key: "can_bo",
    render: (text, record) => {
      return record?.can_bo?.ho_ten_khai_sinh;
    },
  },
  {
    title: "Số hiệu quân nhân",
    dataIndex: "can_bo",
    key: "can_bo",
    render: (text, record) => {
      return record?.can_bo?.so_hieu_quan_nhan;
    },
  },
  {
    title: "Đơn vị hiện tại",
    dataIndex: "can_bo",
    key: "can_bo",
    render: (text, record) => {
      return record?.can_bo?.don_vi?.ten_don_vi;
    },
  },
];

const DonViColumns = [
  {
    title: "STT",
    dataIndex: "key_table",
    key: "key_table",
    width: 10,
  },
  {
    title: "Tên đơn vị",
    dataIndex: "don_vi",
    key: "don_vi",
    render: (text, record) => {
      return record?.don_vi?.ten_don_vi;
    },
  },
];

const DanhSachKhenThuongKyLuat = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { ma_khen_thuong_ky_luat, type } = params;
  const pageHeader = {
    breadcrumb: [
      {
        title: "Trang chủ",
        href: "/",
      },
      {
        title: "Chính sách",
      },
      {
        title:
          type === LOAI_KHEN_THUONG_KY_LUAT.KHEN_THUONG
            ? "Quản lý thi đua, khen thưởng"
            : "Quản lý kỷ luật",
        href:
          type === LOAI_KHEN_THUONG_KY_LUAT.KHEN_THUONG
            ? "/chinh-sach/quan-ly-thi-dua-khen-thuong"
            : "/chinh-sach/quan-ly-ky-luat",
      },
      {
        title:
          type === LOAI_KHEN_THUONG_KY_LUAT.KHEN_THUONG
            ? "Danh sách khen thưởng"
            : "Danh sách kỷ luật",
      },
    ],
  };
  const {
    danhSachKhenThuongKyLuats,
    isLoading,
    totalItem,
    pageNumber,
    pageSize,
  } = useSelector((state) => state.danhSachKhenThuongKyLuats);
  const columns = [
    ...(danhSachKhenThuongKyLuats && danhSachKhenThuongKyLuats[0]?.can_bo
      ? CanBoColumns
      : DonViColumns),
    {
      title: "Công cụ",
      key: "tool",
      align: "center",
      width: 50,
      render: (text, record) => (
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <DeleteButton
            onConfirm={() => {
              dispatch(
                danhSachKhenThuongKyLuatSlice.actions.handleDanhSachKhenThuongKyLuat(
                  {
                    item: record,
                    actionName: "DELETE",
                    pageSize: pageSize,
                    ma_khen_thuong_ky_luat,
                    pageNumber:
                      record?.key === pageSize * (pageNumber - 1) + 1
                        ? Math.max(pageNumber - 1, 1)
                        : pageNumber,
                  }
                )
              );
            }}
          />
        </Space>
      ),
    },
  ];
  const [keyword, setKeyword] = useState("");
  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };
  useEffect(() => {
    if (params) {
      dispatch(
        danhSachKhenThuongKyLuatSlice.actions.getDanhSachKhenThuongKyLuats({
          keyword,
          pageSize: 1000,
          pageNumber: 1,
          ma_khen_thuong_ky_luat,
        })
      );
    }
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
          </Header>
        }
        data={danhSachKhenThuongKyLuats}
        columns={columns}
        isLoading={isLoading}
        pagination={{
          current: pageNumber,
          pageSize: pageSize,
          total: totalItem,
          //   onChange: handlePaginationChange,
        }}
      />
    </ContentWrapper>
  );
};

export default DanhSachKhenThuongKyLuat;
