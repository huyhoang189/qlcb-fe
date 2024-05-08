import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import CustomeTable from "../../../components/Table/table.jsx";
import { useDispatch, useSelector } from "react-redux";
// import baoHiemSlice from "../../../toolkits/QuanLyCanBo/BaoHiem/slice.js";
import canBoCoBanSlice from "../../../toolkits/QuanLyCanBo/ThongTinCoBan/slice.js";
import { useEffect, useRef, useState } from "react";
import { Flex, Segmented, Space, List, Anchor, Row, Col } from "antd";
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
      title: `Tờ khai T63`,
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

const ToKhaiT63 = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const topRef = useRef(null);
  const [targetOffset, setTargetOffset] = useState();

  useEffect(() => {
    setTargetOffset(topRef.current?.clientHeight);
  }, []);

  const { selectedCanBoCoBan } = useSelector((state) => state.canBoCoBans);

  const [keyword, setKeyword] = useState("");

  const { ma_can_bo } = params;

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {};

  const handleModal = (_item) => {};

  //side effect
  useEffect(() => {
    dispatch(canBoCoBanSlice.actions.getCanBoCoBanById({ id: ma_can_bo }));
  }, [dispatch]);

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
    </ContentWrapper>
  );
};

export default ToKhaiT63;
