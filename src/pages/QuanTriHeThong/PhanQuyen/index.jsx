import { ContentWrapper } from "../../../assets/styles/contentWrapper.style";
import {
  CreateButton,
  DeleteButton,
  DetailButton,
  UpdateButton,
} from "../../../components/Button";
import TextInput from "../../../components/Form/textinput";
import CustomeTable from "../../../components/Table/table";
import CustomBreadcrumb from "../../../components/breadcrumb";
import Header from "../../../components/Table/header.jsx";
import { Space } from "antd";

const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Quản trị hệ thống",
    },
    {
      title: "Quản lý phân quyền nhóm người dùng",
    },
  ],
};

const QuanLyPhanQuyen = () => {
  return (
    <ContentWrapper>
      <CustomBreadcrumb items={pageHeader.breadcrumb} />
      <CustomeTable
        header={
          <Header>
            <TextInput
              placeholder={"Nhập vào từ khoá tìm kiếm"}
              // onChange={onChangeKeywordInput}
              property={"keyword"}
              width={20}
            />
            <CreateButton />
          </Header>
        }
        data={[
          {
            ten_nhom_quyen: "Quản trị viên cao nhất",
            loai_nhom_quyen: "Hệ thống",
            pham_vi: "Toàn hệ thống",
            so_luong_quyen: 10,
            nguoi_tao: "Administrator",
          },
          {
            ten_nhom_quyen: "Trợ lý chính trị",
            loai_nhom_quyen: "Người dùng",
            pham_vi: "Cá nhân",
            so_luong_quyen: 5,
            nguoi_tao: "Administrator",
          },
          {
            ten_nhom_quyen: "Cục điều tra hình sự",
            loai_nhom_quyen: "Hệ thống",
            pham_vi: "Cá nhân",
            so_luong_quyen: 7,
            nguoi_tao: "Administrator",
          },
        ]}
        columns={[
          {
            title: "STT",
            dataIndex: "key_table",
            key: "key_table",
            width: 50,
            align: "center",
          },

          {
            title: "Tên nhóm quyền",
            dataIndex: "ten_nhom_quyen",
            key: "ten_nhom_quyen",
            align: "center",
          },
          {
            title: "Loại nhóm quyền",
            dataIndex: "loai_nhom_quyen",
            key: "loai_nhom_quyen",
            align: "center",
          },
          {
            title: "Phạm vi",
            dataIndex: "pham_vi",
            key: "pham_vi",
            align: "center",
          },
          {
            title: "Số lượng quyền",
            dataIndex: "so_luong_quyen",
            key: "so_luong_quyen",
            align: "center",
          },

          {
            title: "Người tạo",
            dataIndex: "nguoi_tao",
            key: "nguoi_tao",
            align: "center",
          },
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
                <UpdateButton />
                <DeleteButton />
              </Space>
            ),
          },
        ]}
        // isLoading={isLoading}
        pagination={{
          current: 1,
          pageSize: 10,
          total: 3,
          //onChange: handlePaginationChange,
        }}
      />
    </ContentWrapper>
  );
};

export default QuanLyPhanQuyen;
