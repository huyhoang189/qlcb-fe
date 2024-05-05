import { Col, Row, Space } from "antd";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import CustomBreadcrumb from "../../../components/breadcrumb";
import donViSlice from "../../../toolkits/QuanLyDanhMuc/DonVi/slice.js";
import canBoSlice from "../../../toolkits/QuanLyCanBo/ThongTinCoBan/slice.js";
import dieuDongCanBoSlice from "../../../toolkits/DieuDongBoNhiem/DieuDongCanBo/slice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import CustomeTable from "../../../components/Table/table.jsx";
import { generateTrees } from "../../../utils/tree.js";
import ModalItem from "./modal.jsx";
import {
  DeleteButton,
  DetailButton,
  UpdateButton,
} from "../../../components/Button/index.jsx";
import { HistoryOutlined, SyncOutlined } from "@ant-design/icons";
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
      title: "Điều động cán bộ",
    },
  ],
};

const baseCanBoColumn = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
    width: 50,
    align: "center",
  },

  {
    title: "Họ và tên khai sinh",
    dataIndex: "ho_ten_khai_sinh",
    key: "ho_ten_khai_sinh",
    align: "center",
  },
  {
    title: "Số hiệu quân nhân",
    dataIndex: "so_hieu_quan_nhan",
    key: "so_hieu_quan_nhan",
    align: "center",
  },
  {
    title: "Ngày tháng năm sinh",
    dataIndex: "ngay_thang_nam_sinh",
    key: "ngay_thang_nam_sinh",
    align: "center",
  },
  {
    title: "Đơn vị hiện tại",
    dataIndex: "don_vi_full_text",
    key: "don_vi_full_text",
    align: "center",
  },
];

const DieuDongCanBo = () => {
  const dispatch = useDispatch();

  const { donVis } = useSelector((state) => state.donVis);
  const { canBoCoBans, pageSize, pageNumber, count, isLoading } = useSelector(
    (state) => state.canBoCoBans
  );

  const [selectDonVi, setSelectedDonvi] = useState();
  const rowSelection = {
    onSelect: (record) => {
      setSelectedDonvi(record);
    },
    hideDefaultSelections: true,
    type: "radio",
  };

  const canBoColumns = [
    ...baseCanBoColumn,
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
          <UpdateButton
            onClick={() => handleModal(record)}
            title="Điều động"
            icon={<SyncOutlined />}
          />
          <DetailButton title="Lịch sử điều động" icon={<HistoryOutlined />} />
        </Space>
      ),
    },
  ];

  const handleModal = (_item) => {
    dispatch(dieuDongCanBoSlice.actions.toggleModal(_item));
  };

  //side effect
  useEffect(() => {
    dispatch(donViSlice.actions.getDonVis({ pageSize: 1000 }));
  }, [dispatch]);

  useEffect(() => {
    if (selectDonVi?.id) {
      dispatch(
        canBoSlice.actions.getCanBoByMaDonVi({ ma_don_vi: selectDonVi.id })
      );
    }
  }, [selectDonVi]);
  const treeData = useMemo(() => generateTrees(donVis), [donVis]);

  return (
    <ContentWrapper>
      <CustomBreadcrumb items={[...pageHeader.breadcrumb]} />
      <Row gutter={8}>
        <Col span={8}>
          <CustomeTable
            showHeader={false}
            data={treeData}
            columns={[
              {
                title: "Tên đơn vị",
                dataIndex: "ten_don_vi",
                key: "ten_don_vi",
              },
            ]}
            pagination={false}
            rowSelection={rowSelection}
          />
        </Col>
        <Col span={16}>
          <CustomeTable
            data={canBoCoBans}
            columns={canBoColumns}
            isLoading={isLoading}
            pagination={{
              current: pageNumber,
              pageSize: pageSize,
              total: Math.ceil(count / pageSize),
              // onChange: handlePaginationChange,
            }}
          />
        </Col>
      </Row>
      <ModalItem />
    </ContentWrapper>
  );
};

export default DieuDongCanBo;
