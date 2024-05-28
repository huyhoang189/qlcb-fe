import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import CustomeTable from "../../../components/Table/table.jsx";
import { Space } from "antd";
import { DeleteButton } from "../../../components/Button/index.jsx";
import PropTypes from "prop-types";

const CanBoColumns = [
  {
    title: "STT",
    dataIndex: "key_table",
    key: "key_table",
    width: 10,
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
    title: "Đơn vị hiện tại",
    dataIndex: "don_vi",
    key: "don_vi",
    render: (text, record) => {
      return record?.don_vi?.mo_ta_day_du;
    },
  },
];

const DonViColumns = [
  {
    title: "STT",
    dataIndex: "key_table",
    key: "key_table",
    width: 10,
    align: "center",
  },

  {
    title: "Mã đơn vị",
    dataIndex: "ma_don_vi",
    key: "ma_don_vi",
  },
  {
    title: "Tên đơn vị",
    dataIndex: "ten_don_vi",
    key: "ten_don_vi",
  },
  {
    title: "Tên đơn vị cha",
    dataIndex: "don_vi",
    key: "don_vi",
    render: (text, record) => {
      return record?.don_vi?.ten_don_vi;
    },
  },
];

const TableObjKhenThuongKyLuat = ({
  ListKhenThuongKyLuat = [],
  OnChangeOptionObjKhenThuongKyLuat,
  SetListKhenThuongKyLuat,
  HinhThuc,
}) => {
  const columns = [
    ...(HinhThuc === "CA_NHAN" ? CanBoColumns : DonViColumns),
    {
      title: "Công cụ",
      key: "tool",
      align: "center",
      width: 100,
      render: (text, record) => (
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <DeleteButton
            onConfirm={() => {
              ListKhenThuongKyLuat.ListObjKhenThuongKyLuat =
                ListKhenThuongKyLuat.ListObjKhenThuongKyLuat.filter(
                  (e) => e.id != record.id
                );
              ListKhenThuongKyLuat.ids = ListKhenThuongKyLuat.ids.filter(
                (e) => e != record.id
              );
              OnChangeOptionObjKhenThuongKyLuat(
                ListKhenThuongKyLuat.ListObjKhenThuongKyLuat
              );
              SetListKhenThuongKyLuat({
                ...ListKhenThuongKyLuat,
              });
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <ContentWrapper>
      <CustomeTable
        data={ListKhenThuongKyLuat.ListObjKhenThuongKyLuat}
        columns={columns}
        pagination={false}
      />
    </ContentWrapper>
  );
};
TableObjKhenThuongKyLuat.propTypes = {
  HinhThuc: PropTypes.string,
  SetListKhenThuongKyLuat: PropTypes.func,
  ListKhenThuongKyLuat: PropTypes.object,
  OnChangeOptionObjKhenThuongKyLuat: PropTypes.func,
};
export default TableObjKhenThuongKyLuat;
