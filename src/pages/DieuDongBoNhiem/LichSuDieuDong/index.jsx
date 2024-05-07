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
import { useNavigate, useParams } from "react-router-dom";

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
    dataIndex: "key_table",
    key: "key_table",
    width: 50,
    align: "center",
  },
  {
    title: "Chức vụ",
    dataIndex: "chuc_vu",
    key: "chuc_vu",
    render: (text, record) => {
      return record?.chuc_vu_chinh_quyen?.ten_chuc_vu;
    },
  },
  {
    title: "Đơn vị",
    dataIndex: "don_vi_full_text",
    key: "don_vi_full_text",
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
    render: (text, record) => {
      return record?.thoi_gian_ket_thuc ? record?.thoi_gian_ket_thuc : "Nay";
    },
  },
  {
    title: "Ghi chú",
    dataIndex: "ghi_chu",
    key: "ghi_chu",
  },
];

const LichSuDieuDong = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { ma_can_bo } = params;

  const { lichSuDieuDongs, isLoading, totalItem, pageNumber, pageSize } =
    useSelector((state) => state.lichSuDieuDongs);

  const [keyword, setKeyword] = useState("");

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {
    if (ma_can_bo) {
      dispatch(
        lichSuDieuDongSlice.actions.getLichSuDieuDongs({
          keyword,
          pageSize: pageSize,
          pageNumber: current,
          ma_can_bo,
        })
      );
    }
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
          {/* <DetailButton
            onClick={() => {
              navigate(`${record.id}/danh-sach-bo-nhiem`);
            }}
          /> */}
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
    if (ma_can_bo) {
      dispatch(
        lichSuDieuDongSlice.actions.getLichSuDieuDongs({
          keyword,
          pageSize: 10,
          pageNumber: 1,
          ma_can_bo,
        })
      );
    }
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

export default LichSuDieuDong;
