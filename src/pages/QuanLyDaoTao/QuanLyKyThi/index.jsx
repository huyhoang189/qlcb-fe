import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import CustomeTable from "../../../components/Table/table.jsx";
import { useDispatch, useSelector } from "react-redux";
import kyThiSlice from "../../../toolkits/QuanLyDaoTao/QuanLyKyThi/slice.js";
import { useEffect, useState } from "react";
import { Space, Tag } from "antd";
import {
  CreateButton,
  DeleteButton,
  UpdateButton,
  DetailButton
} from "../../../components/Button/index.jsx";
import Header from "../../../components/Table/header.jsx";
import TextInput from "../../../components/Form/textinput.jsx";
import ModalItem from "./modal.jsx";
import { useNavigate } from "react-router-dom";
const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Quản lý đào tạo",
    },
    {
      title: "Kế hoạch bồi dưỡng đào tạo cán bộ",
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
    title: "Tên kỳ thi",
    dataIndex: "ten_ky_thi",
    key: "ten_ky_thi",
    align: "center",
  },
  {
    title: "Thời gian tổ chức",
    dataIndex: "thoi_gian_to_chuc",
    key: "thoi_gian_to_chuc",
    align: "center",
  },
  {
    title: "Kết quả",
    dataIndex: "ket_qua",
    key: "ket_qua",
    align: "center",
    children: [
      {
        title: 'Giỏi',
        dataIndex: 'Gioi',
        key: 'Gioi',
        //width: 150,
        align: 'center',
        render: (text, row, index) => {
          //let obj = eval('({' + row.ket_qua + '})');
          return 10
        }
      },
      {
        title: 'Khá',
        dataIndex: 'kha',
        key: 'kha',
        //width: 150,
        align: 'center',
        render: (text, row, index) => {
          //let obj = eval('({' + row.ket_qua + '})');
          return 10
        }
      },
      {
        title: 'Trung Bình',
        dataIndex: 'TB',
        key: 'TB',
        //width: 150,
        align: 'center',
        render: (text, row, index) => {
          //let obj = eval('({' + row.ket_qua + '})');
          return 10
        }
      }
    ]
  },
  {
    title: "Trạng thái",
    dataIndex: "trang_thai",
    key: "trang_thai",
    align: "center",
    render: (_,row) => (
      <>
        {       
            <Tag color={row.trang_thai?'green':'red'}>
              {row.trang_thai?"ACTIVE":"DISABLE"}
            </Tag>
        }
      </>
    ),
  },
  {
    title: "Ghi chú",
    dataIndex: "ghi_chu",
    key: "ghi_chu",
    align: "center",
  },
];

const QuanLyKyThi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { kyThis, isLoading, totalItem, pageNumber, pageSize } =
    useSelector((state) => state.kyThis);

  const [keyword, setKeyword] = useState("");

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      kyThiSlice.actions.getKyThis({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
      })
    );
  };

  const handleModal = (_item) => {
    dispatch(kyThiSlice.actions.toggleModal(_item));
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
            <DetailButton
            onClick={() => {
              navigate(`${record.id}/chi-tiet-ke-hoach`);
            }}
          />
          <UpdateButton onClick={() => handleModal(record)} />
          <DeleteButton
            onConfirm={() => {
              dispatch(
                kyThiSlice.actions.handleKyThi({
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
      kyThiSlice.actions.getKyThis({
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
        data={kyThis}
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

export default QuanLyKyThi;
