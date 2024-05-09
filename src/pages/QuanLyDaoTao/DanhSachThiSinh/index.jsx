import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import CustomeTable from "../../../components/Table/table.jsx";
import { useDispatch, useSelector } from "react-redux";
import danhSachThiSinhSlice from "../../../toolkits/QuanLyDaoTao/DanhSachThiSinh/slice.js";
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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
      title: "Quản lý Kỳ thi",
      href: "/quan-ly-dao-tao/quan-ly-ky-thi",
    },
    {
      title: "Danh sách cán bộ tham gia thi",
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
    title: "Họ tên",
    dataIndex: "can_bo",
    key: "can_bo",
    align: "center",
    render: (text, record) => {
      return record?.can_bo?.ho_ten_khai_sinh;
    },
  },
  {
    title: "Đơn vị",
    dataIndex: "can_bo",
    key: "can_bo",
    align: "center",
    render: (text, record) => {
      return record?.can_bo?.don_vi?.ten_don_vi;
    },
  },
  {
    title: "Kết quả",
    dataIndex: "ket_qua",
    key: "ket_qua",
    align: "center",
  },
  {
    title: "Nội dung thi",
    dataIndex: "noi_dung_thi",
    key: "noi_dung_thi",
    align: "center",
  },
  {
    title: "Ghi chú",
    dataIndex: "ghi_chu",
    key: "ghi_chu",
    align: "center",
  },
];

const DanhSachThiSinh = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { ma_ky_thi } = params;
  const { danhSachThiSinhs, isLoading, totalItem, pageNumber, pageSize } =
    useSelector((state) => state.danhSachThiSinhs);

  const [keyword, setKeyword] = useState("");

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      danhSachThiSinhSlice.actions.getDanhSachThiSinhs({
        ma_ky_thi,
        keyword,
        pageSize: pageSize,
        pageNumber: current,
      })
    );
  };

  const handleModal = (_item) => {
    dispatch(danhSachThiSinhSlice.actions.toggleModal(_item));
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
                danhSachThiSinhSlice.actions.handleDanhSachThiSinh({
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
      danhSachThiSinhSlice.actions.getDanhSachThiSinhs({
        ma_ky_thi,
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
        data={danhSachThiSinhs}
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

export default DanhSachThiSinh;
