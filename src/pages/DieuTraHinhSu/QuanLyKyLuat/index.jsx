import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import CustomeTable from "../../../components/Table/table.jsx";
import { useDispatch, useSelector } from "react-redux";
import quanLyKyLuatSlice from "../../../toolkits/DieuTraHinhSu/QuanLyKyLuat/slice.js";
import { useEffect, useState } from "react";
import { Space } from "antd";
import {
  CreateButton,
  DeleteButton,
  DetailButton,
} from "../../../components/Button/index.jsx";
import Header from "../../../components/Table/header.jsx";
import { useParams } from "react-router-dom";
import ModalItem from "./modal.jsx";
import { useNavigate } from "react-router-dom";
import { LOAI_KHEN_THUONG_KY_LUAT } from "../../../utils/common";
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
      title: `Quản lý kỷ luật`,
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
    title: "Quyết định số",
    dataIndex: "quyet_dinh_so",
    key: "quyet_dinh_so",
  },
  {
    title: "Hình thức khen thưởng",
    dataIndex: "hinh_thuc",
    key: "hinh_thuc",
    render: (text, record) => {
      return record?.hinh_thuc === "TAP_THE" ? "Tập thể" : "Cá nhân";
    },
  },
  {
    title: "Nội dụng",
    dataIndex: "noi_dung",
    key: "noi_dung",
  },
  {
    title: "Thời gian",
    dataIndex: "thoi_gian",
    key: "thoi_gian",
  },
  {
    title: "Lý do",
    dataIndex: "ly_do",
    key: "ly_do",
  },
  {
    title: "Ghi chú",
    dataIndex: "ghi_chu",
    key: "ghi_chu",
  },
];

const QuanLyKyLuat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { quanLyKyLuats, isLoading, totalItem, pageNumber, pageSize } =
    useSelector((state) => state.quanLyKyLuats);

  const [keyword, setKeyword] = useState("");

  const { ma_can_bo } = params;

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      quanLyKyLuatSlice.actions.getQuanLyKyLuats({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
      })
    );
  };

  const handleModal = (_item) => {
    dispatch(quanLyKyLuatSlice.actions.toggleModal(_item));
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
              navigate(
                `${record.id}/${LOAI_KHEN_THUONG_KY_LUAT.KY_LUAT}/danh-sach-ky-luat`
              );
            }}
          />
          {/* <UpdateButton onClick={() => handleModal(record)} /> */}
          <DeleteButton
            onConfirm={() => {
              dispatch(
                quanLyKyLuatSlice.actions.handleQuanLyKyLuat({
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
    dispatch(
      quanLyKyLuatSlice.actions.getQuanLyKyLuats({
        keyword,
        pageSize: 10,
        pageNumber: 1,
      })
    );
  }, [dispatch, keyword]);

  return (
    <ContentWrapper>
      <CustomBreadcrumb items={[...pageHeader.breadcrumb]} />
      <CustomeTable
        header={
          <Header justify={"flex-end"}>
            <CreateButton onClick={() => handleModal(null)} />
          </Header>
        }
        data={quanLyKyLuats}
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

export default QuanLyKyLuat;
