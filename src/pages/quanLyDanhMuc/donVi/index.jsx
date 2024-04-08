import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import { useDispatch, useSelector } from "react-redux";
import donViSlice from "../../../toolkits/quanLyDanhMuc/donVi/slice.js";
import { useEffect, useMemo, useState } from "react";
import { Col, Row, Space, Tree, Collapse, Flex, Divider } from "antd";
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
  const [expandedKeys, setExpandedKeys] = useState(["0"]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [selectedNode, setSelectedNode] = useState({});

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
  const onSelected = (e) => {
    if (e) {
      const node = getNodeByKey(trees, e[0]);
      setSelectedNode(node);
    }
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
        pageSize: 10000,
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
        <Col span={10}>
          <TextInput
            placeholder={"Nhập vào từ khoá tìm kiếm"}
            onChange={onChangeKeywordInput}
            property={"keyword"}
            width={50}
          />
          <Tree
            treeData={treeData}
            showLine={true}
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onSelect={onSelected}
          />
        </Col>
        <Col span={14}>
          <Flex
            style={{ width: "100%", height: 32 }}
            align="center"
            justify="space-between"
          >
            <span>{`Danh sách đơn vị trực thuộc ${
              selectedNode?.ten_don_vi || ""
            }`}</span>
            <Space>
              <CreateButton
                onClick={() =>
                  handleModal({
                    id: "",
                    ma_don_vi: "",
                    ten_don_vi: "",
                    ma_don_vi_cha: selectedNode?.id,
                    ghi_chu: "",
                    so_thu_tu: 0,
                  })
                }
                text=""
              />
              <UpdateButton onClick={() => handleModal(selectedNode)} />
              <DeleteButton
                onConfirm={() => {
                  dispatch(
                    donViSlice.actions.handleDonVi({
                      item: selectedNode,
                      actionName: "DELETE",
                      pageSize: pageSize,
                      pageNumber: pageNumber,
                    })
                  );
                }}
              />
            </Space>
          </Flex>
          <Divider style={{ marginTop: 10 }} />
        </Col>
      </Row>

      <ModalItem />
    </ContentWrapper>
  );
};

export default DonVi;
