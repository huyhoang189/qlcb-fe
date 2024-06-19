import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import CustomeTable from "../../../components/Table/table.jsx";
import { useDispatch, useSelector } from "react-redux";
import canBoCoBanSlice from "../../../toolkits/QuanLyCanBo/ThongTinCoBan/slice.js";
import { useEffect, useState } from "react";
import { Button, Dropdown, Space } from "antd";
import {
  CreateButton,
  DeleteButton,
  UpdateButton,
} from "../../../components/Button/index.jsx";
import Header from "../../../components/Table/header.jsx";
import TextInput from "../../../components/Form/textinput.jsx";
import { Link, useNavigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import SearchBox from "./searchBox.jsx";

const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Quản lý hồ sơ cán bộ",
    },
    {
      title: "Tìm kiếm nâng cao",
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
    title: "Họ và tên khai sinh",
    dataIndex: "ho_ten_khai_sinh",
    key: "ho_ten_khai_sinh",
  },
  {
    title: "Số hiệu quân nhân",
    dataIndex: "so_hieu_quan_nhan",
    key: "so_hieu_quan_nhan",
  },
  {
    title: "Ngày tháng năm sinh",
    dataIndex: "ngay_thang_nam_sinh",
    key: "ngay_thang_nam_sinh",
  },
  {
    title: "Giới tính",
    dataIndex: "gioi_tinh",
    key: "gioi_tinh",
    render: (text, record) => {
      return record?.gioi_tinh === "NAM" ? "Nam" : "Nữ";
    },
  },
  // {
  //   title: "Ngày vào đảng",
  //   dataIndex: "ngay_vao_dang",
  //   key: "ngay_vao_dang",
  // },
  // {
  //   title: "Ngày vào đảng CT",
  //   dataIndex: "ngay_chinh_thuc",
  //   key: "ngay_chinh_thuc",
  // },
  // {
  //   title: "Ngày nhập ngũ",
  //   dataIndex: "ngay_nhap_ngu",
  //   key: "ngay_nhap_ngu",
  // },
  {
    title: "Quê quán",
    dataIndex: "que_quan",
    key: "que_quan",
    // align: "center",
  },
  // {
  //   title: "Nơi ở hiện nay",
  //   dataIndex: "noi_o_hien_nay",
  //   key: "noi_o_hien_nay",
  //   // align: "center",
  // },
  // {
  //   title: "Trình độ GDPT",
  //   dataIndex: "trinh_do_giao_duc_pho_thong",
  //   key: "trinh_do_giao_duc_pho_thong",
  // },
  {
    title: "Đơn vị hiện tại",
    dataIndex: "don_vi",
    key: "don_vi",
    render: (text, record) => {
      return record?.don_vi?.mo_ta_day_du;
    },
  },
];

const TimKiemNangCao = () => {
  const dispatch = useDispatch();
  const { canBoCoBans, isLoading, totalItem, pageNumber, pageSize } =
    useSelector((state) => state.canBoCoBans);
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      canBoCoBanSlice.actions.getCanBoCoBans({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
      })
    );
  };

  const handleModal = (_item) => {
    dispatch(canBoCoBanSlice.actions.toggleModal(_item));
  };

  const columns = [
    ...baseColumns,
    {
      title: "Chức năng",
      key: "feature",
      align: "center",
      render: (text, record) => (
        // <Dropdown menu={[]} placement="bottomRight" arrow>
        <Button icon={<EyeOutlined />} />
        // </Dropdown>
      ),
    },
  ];

  //side effect
  useEffect(() => {
    dispatch(
      canBoCoBanSlice.actions.getCanBoCoBans({
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
        header={<SearchBox />}
        data={canBoCoBans}
        columns={columns}
        isLoading={isLoading}
        pagination={{
          current: pageNumber,
          pageSize: pageSize,
          total: totalItem,
          onChange: handlePaginationChange,
        }}
      />
    </ContentWrapper>
  );
};

export default TimKiemNangCao;
