import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import CustomeTable from "../../../components/Table/table.jsx";
import { useDispatch, useSelector } from "react-redux";
import quanLyKhenThuongSlice from "../../../toolkits/DieuTraHinhSu/QuanLyKhenThuong/slice.js";
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
      title: `Quản lý thi đua, khen thưởng`,
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
    title: "Năm học",
    dataIndex: "nam_hoc",
    key: "nam_hoc",
    align: "center",
  },
  {
    title: "Chỉ tiêu",
    dataIndex: "chi_tieu",
    key: "chi_tieu",
    align: "center",
    render: (text, record) => {
      return record?.hinh_thuc === "TAP_THE" ? "Tập thể" : "Cá nhân";
    },
  },
  {
    title: "Thực hiện",
    dataIndex: "thuc_hien",
    key: "thuc_hien",
    align: "center",
  },
  {
    title: "Ghi chú",
    dataIndex: "ghi_chu",
    key: "ghi_chu",
    align: "center",
  },
];

const QuanLyKhenThuong = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { quanLyKhenThuongs, isLoading, totalItem, pageNumber, pageSize } =
    useSelector((state) => state.quanLyKhenThuongs);

  const [keyword, setKeyword] = useState("");

  const { ma_can_bo } = params;

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      quanLyKhenThuongSlice.actions.getQuanLyKhenThuongs({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
      })
    );
  };

  const handleModal = (_item) => {
    dispatch(quanLyKhenThuongSlice.actions.toggleModal(_item));
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
                `${record.id}/${LOAI_KHEN_THUONG_KY_LUAT.KHEN_THUONG}/danh-sach-khen-thuong`
              );
            }}
          />
          {/* <UpdateButton onClick={() => handleModal(record)} /> */}
          <DeleteButton
            onConfirm={() => {
              dispatch(
                quanLyKhenThuongSlice.actions.handleQuanLyKhenThuong({
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
      quanLyKhenThuongSlice.actions.getQuanLyKhenThuongs({
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
        data={quanLyKhenThuongs}
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

export default QuanLyKhenThuong;
