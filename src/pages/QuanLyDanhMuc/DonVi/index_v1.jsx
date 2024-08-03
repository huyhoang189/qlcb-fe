import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import { useDispatch, useSelector } from "react-redux";
import donViSlice from "../../../toolkits/QuanLyDanhMuc/DonVi/slice.js";
import { useEffect, useMemo, useState } from "react";
import { Col, Divider, Flex, Row, Space, Tree } from "antd";
import {
  CreateButton,
  DeleteButton,
  UpdateButton,
} from "../../../components/Button/index.jsx";
import ModalItem from "./modal.jsx";
import {
  generateTrees,
  getKeysByTitle,
  getNodeByKey,
} from "../../../utils/tree.js";
import TextInput from "../../../components/Form/textinput.jsx";
import { TableWrapper } from "../../../components/Table/style.js";
import CustomeTable from "../../../components/Table/table.jsx";

const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Quản lý danh mục",
    },
    {
      title: "Quản lý danh mục đơn vị",
    },
  ],
};

const baseColumns = [
  {
    title: "Tên đơn vị",
    dataIndex: "ten_don_vi",
    key: "ten_don_vi",
    width: "40%",
    // align: "center",
  },
  {
    title: "Mã đơn vị",
    dataIndex: "ma_don_vi",
    key: "ma_don_vi",
    // align: "center",
  },
  {
    title: "Trạng thái",
    dataIndex: "trang_thai",
    key: "trang_thai",
    align: "center",
    render: (text, record) => {
      return record?.trang_thai ? "Đơn vị" : "Danh mục";
    },
  },

  {
    title: "Ghi chú",
    dataIndex: "ghi_chu",
    key: "ghi_chu",
    // width: "30%",
    // align: "center",
  },
];

const DonVi_V2 = () => {
  const dispatch = useDispatch();
  const { donVis, isLoading, totalItem, pageNumber, pageSize } = useSelector(
    (state) => state.donVis
  );

  const [trees, setTrees] = useState([]);

  const handleModal = (_item) => {
    dispatch(donViSlice.actions.toggleModal(_item));
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
          <CreateButton
            onClick={() =>
              handleModal({
                id: "",
                ma_don_vi: "",
                ten_don_vi: "",
                ma_don_vi_cha: record?.id,
                ghi_chu: "",
                so_thu_tu: 1,
                trang_thai: true,
              })
            }
            text=""
          />
          <UpdateButton onClick={() => handleModal(record)} />
          <DeleteButton
            onConfirm={() => {
              dispatch(
                donViSlice.actions.handleDonVi({
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
      donViSlice.actions.getDonVis({
        pageSize: 10000,
        pageNumber: 1,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (donVis) setTrees(generateTrees(donVis));
  }, [donVis]);

  console.log(trees);
  return (
    <ContentWrapper>
      <CustomBreadcrumb items={pageHeader.breadcrumb} />
      <CustomeTable
        header={
          <CreateButton
            onClick={() =>
              handleModal({
                id: "",
                ma_don_vi: "",
                ten_don_vi: "",
                ma_don_vi_cha: null,
                ghi_chu: "",
                so_thu_tu: 1,
                trang_thai: true,
              })
            }
          />
        }
        columns={columns}
        bordered
        data={trees}
        isLoading={isLoading}
        pagination={false}
      />
      <ModalItem />
    </ContentWrapper>
  );
};

export default DonVi_V2;
