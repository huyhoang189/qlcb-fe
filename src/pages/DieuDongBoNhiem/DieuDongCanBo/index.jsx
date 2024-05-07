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
import { useNavigate } from "react-router-dom";
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
    dataIndex: "key_table",
    key: "key_table",
    width: 50,
    align: "center",
  },
  {
    title: "Số hiệu quân nhân",
    dataIndex: "so_hieu_quan_nhan",
    key: "so_hieu_quan_nhan",
  },
  {
    title: "Họ và tên khai sinh",
    dataIndex: "ho_ten_khai_sinh",
    key: "ho_ten_khai_sinh",
  },
  {
    title: "Cấp bậc",
    dataIndex: "cap_bac",
    key: "cap_bac",
    render: (text, record) => {
      return record?.cap_bac?.quan_ham;
    },
  },
  {
    title: "Chức vụ",
    dataIndex: "chuc_vu",
    key: "chuc_vu",
    render: (text, record) => {
      return record?.chuc_vu?.chuc_vu_chinh_quyen?.ten_chuc_vu;
    },
  },
  {
    title: "Đơn vị hiện tại",
    dataIndex: "don_vi",
    key: "don_vi",
    // align: "center",
  },
];

const DieuDongCanBo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { donVis, selectedDonVi } = useSelector((state) => state.donVis);
  const { canBoCoBans, pageSize, pageNumber, totalItem, isLoading } =
    useSelector((state) => state.canBoCoBans);

  // const [selectDonVi, setSelectedDonvi, ] = useState();
  const rowSelection = {
    onSelect: (record) => {
      // setSelectedDonvi(record);
      console.log(record);
      dispatch(donViSlice.actions.updateSelectedDonViInput(record));
    },
    hideDefaultSelections: true,
    type: "radio",
    getCheckboxProps: (record) => ({
      disabled: record.ma_don_vi === "BQP",
      // // Column configuration not to be checked
      title: record.title,
    }),
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
          <DetailButton
            title="Lịch sử điều động"
            icon={<HistoryOutlined />}
            onClick={() => {
              navigate(`${record.id}/lich-su-dieu-dong`);
            }}
          />
        </Space>
      ),
    },
  ];

  const handleModal = (_item) => {
    dispatch(dieuDongCanBoSlice.actions.toggleModal(_item));
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      canBoSlice.actions.getCanBoByMaDonVi({
        pageSize: pageSize,
        pageNumber: current,
        ma_don_vi: selectedDonVi.id,
      })
    );
  };

  const treeData = useMemo(() => generateTrees(donVis), [donVis]);

  //side effect
  useEffect(() => {
    dispatch(donViSlice.actions.getDonVis({ pageSize: 1000 }));
  }, [dispatch]);

  useEffect(() => {
    if (selectedDonVi?.id) {
      dispatch(
        canBoSlice.actions.getCanBoByMaDonVi({
          ma_don_vi: selectedDonVi.id,
          pageSize: 10,
        })
      );
    }
  }, [selectedDonVi]);

  useEffect(() => {
    if (treeData && !selectedDonVi?.id) {
      dispatch(donViSlice.actions.updateSelectedDonViInput(treeData[0]));
    }
  }, [treeData]);

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
              total: totalItem,
              onChange: handlePaginationChange,
            }}
          />
        </Col>
      </Row>
      <ModalItem />
    </ContentWrapper>
  );
};

export default DieuDongCanBo;
