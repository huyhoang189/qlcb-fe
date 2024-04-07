import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import { useDispatch, useSelector } from "react-redux";
import donViSlice from "../../../toolkits/quanLyDanhMuc/donVi/slice.js";
import { useEffect, useMemo, useState } from "react";
import { Col, Row, Space, Tree } from "antd";
import {
  DeleteButton,
  UpdateButton,
} from "../../../components/Button/index.jsx";
import ModalItem from "./modal.jsx";
import { generateTrees, getKeysByTitle } from "../../../utils/tree.js";
import TextInput from "../../../components/Form/textinput.jsx";

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
    // title: "STT",
    dataIndex: "key",
    key: "key",
    width: 400,
    align: "center",
  },
  {
    title: "Mã đơn vị",
    dataIndex: "ma_don_vi",
    key: "ma_don_vi",
    align: "center",
  },
  {
    title: "Tên đơn vị",
    dataIndex: "ten_don_vi",
    key: "ten_don_vi",
    align: "center",
  },
  {
    title: "Đơn vị cha",
    dataIndex: "donVi",
    key: "donVi",
    align: "center",
    render: (text, record) => {
      return record?.don_vi?.ten_don_vi;
    },
  },
  {
    title: "Số thứ tự",
    dataIndex: "so_thu_tu",
    key: "so_thu_tu",
    align: "center",
  },
  {
    title: "Ghi chú",
    dataIndex: "ghi_chu",
    key: "ghi_chu",
    width: "40%",
    // align: "center",
  },
];

const DonVi = () => {
  const dispatch = useDispatch();
  const { donVis, isLoading, totalItem, pageNumber, pageSize } = useSelector(
    (state) => state.donVis
  );

  const [keyword, setKeyword] = useState("");
  const [trees, setTrees] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (newExpandedKeys) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };
  const onChangeKeywordInput = (key, event) => {
    const { value } = event.target;
    const newExpandedKeys = getKeysByTitle(trees, value);
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(true);
    setKeyword(value);
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      donViSlice.actions.getDonVis({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
      })
    );
  };

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
        pageSize: 1000,
        pageNumber: 1,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (donVis) setTrees(generateTrees(donVis));
  }, [donVis]);

  const treeData = useMemo(() => {
    const loop = (data) =>
      data.map((item) => {
        const strTitle = item.title;
        const index = strTitle.indexOf(keyword);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + keyword.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{keyword}</span>
              {afterStr}
            </span>
          ) : (
            <span>{strTitle}</span>
          );
        if (item.children) {
          return {
            title,
            key: item.key,
            children: loop(item.children),
            value: item.id,
          };
        }
        return {
          title,
          key: item.key,
          value: item.id,
        };
      });
    return loop(trees);
  }, [keyword, trees]);

  return (
    <ContentWrapper>
      <CustomBreadcrumb items={pageHeader.breadcrumb} />
      <Row gutter={16}>
        <Col span={8}>
          <TextInput
            placeholder={"Nhập vào từ khoá tìm kiếm"}
            onChange={onChangeKeywordInput}
            property={"keyword"}
            // width={20}
          />
          <Tree
            treeData={treeData}
            showLine={true}
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
          />
        </Col>
        <Col span={12}></Col>
      </Row>

      <ModalItem />
    </ContentWrapper>
  );
};

export default DonVi;
