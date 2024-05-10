import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import TabsInput from "../../../components/Form/tabsinput.jsx";
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
import BanThan from "./banthan.jsx";
import TinhHinhKTCTGD from "./tinhhinhktctgd.jsx";
import TinhHinhKTCTVC from "./tinhhinhktctvc.jsx";
import QuaTrinhCongTac from "./quatrinhcongtac.jsx"
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

  const itemsTab = [
    {
      key: "tab1",
      label: "I. BẢN THÂN",
      children: <BanThan />,
    },
    {
      key: "tab2",
      label: "II. TÌNH HÌNH KT – CT CỦA GIA ĐÌNH",
      children: <TinhHinhKTCTGD />,
    },
    {
      key: "tab3",
      label: "III. TÌNH HÌNH KT – CT CỦA GIA ĐÌNH VỢ, VỢ (CHỒNG)",
      children: <TinhHinhKTCTVC />,
    },
    {
      key: "tab4",
      label: "IV. TÓM TẮT NHẬN XÉT",
      //children: <Tab2 />,
    },
    {
      key: "tab5",
      label: "V. QUÁ TRÌNH CÔNG TÁC",
      children: <QuaTrinhCongTac />,
    },
  ]
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
      
      <TabsInput
      items={itemsTab}
      />
    </ContentWrapper>
  );
};

export default ToKhaiT63;
