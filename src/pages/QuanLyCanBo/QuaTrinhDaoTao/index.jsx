import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import CustomeTable from "../../../components/Table/table.jsx";
import { useDispatch, useSelector } from "react-redux";
import quaTrinhDaoTaoSlice from "../../../toolkits/QuanLyCanBo/QuaTrinhDaoTao/slice.js";
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
      title: "Quá trình đào tạo",
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
    title: "Trường học",
    dataIndex: "truong_hoc",
    key: "truong_hoc",
    render: (text, record) => {
      return record?.truong_hoc?.ten_truong;
    },
  },
  {
    title: "Chuyên ngành",
    dataIndex: "chuyen_nganh",
    key: "chuyen_nganh",
    render: (text, record) => {
      return record?.chuyen_nganh?.ten;
    },
  },
  {
    title: "Loại hình đào tạo",
    dataIndex: "loai_hinh_dao_tao",
    key: "loai_hinh_dao_tao",
    render: (text, record) => {
      return record?.loai_hinh_dao_tao?.ten;
    },
  },
  {
    title: "Thời gian bắt đầu",
    dataIndex: "thoi_gian_bat_dau",
    key: "thoi_gian_bat_dau",
  },
  {
    title: "Thời gian kết thúc",
    dataIndex: "thoi_gian_ket_thuc",
    key: "thoi_gian_ket_thuc",
  },
  {
    title: "Xếp loại",
    dataIndex: "xep_loai",
    key: "xep_loai",
  },
  {
    title: "Ghi chú",
    dataIndex: "ghi_chu",
    key: "ghi_chu",
  },
];

const QuaTrinhDaoTao = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { quaTrinhDaoTaos, isLoading, totalItem, pageNumber, pageSize } =
    useSelector((state) => state.quaTrinhDaoTaos);

  const { selectedCanBoCoBan } = useSelector((state) => state.canBoCoBans);

  const [keyword, setKeyword] = useState("");

  const { ma_can_bo } = params;

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      quaTrinhDaoTaoSlice.actions.getQuaTrinhDaoTaos({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
        ma_can_bo,
      })
    );
  };

  const handleModal = (_item) => {
    dispatch(quaTrinhDaoTaoSlice.actions.toggleModal(_item));
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
                quaTrinhDaoTaoSlice.actions.handleQuaTrinhDaoTao({
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
      quaTrinhDaoTaoSlice.actions.getQuaTrinhDaoTaos({
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
            {/*<TextInput*/}
            {/*    placeholder={"Nhập vào từ khoá tìm kiếm"}*/}
            {/*    onChange={onChangeKeywordInput}*/}
            {/*    property={"keyword"}*/}
            {/*    width={20}*/}
            {/*/>*/}
            <CreateButton onClick={() => handleModal(null)} />
          </Header>
        }
        data={quaTrinhDaoTaos}
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

export default QuaTrinhDaoTao;
