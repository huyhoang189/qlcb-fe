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
      title: "Quản lý người dùng hệ thống",
    },
  ],
};

const QuanLyNguoiDung = () => {
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
            ten_tai_khoan: "administrator",
            ten_nguoi_dung: "Quản trị viên cao nhất",
            ngay_tao: "2022-01-15",
            dang_nhap_cuoi: "2024-06-18",
            nhom_quyen: "Admin",
            trang_thai: "Hoạt động",
            don_vi: "Cục điều tra hình sự",
          },
          {
            ten_tai_khoan: "hoangvq",
            ten_nguoi_dung: "Vũ Quốc Hoàng",
            ngay_tao: "2022-02-20",
            dang_nhap_cuoi: "2024-06-17",
            nhom_quyen: "User",
            trang_thai: "Khóa",
            don_vi: "Phòng ĐTHS / QK4",
          },
          {
            ten_tai_khoan: "trolychinhtridthsqk4",
            ten_nguoi_dung: "Trợ lý chính trị",
            ngay_tao: "2023-05-10",
            dang_nhap_cuoi: "2024-06-19",
            nhom_quyen: "Moderator",
            trang_thai: "Hoạt động",
            don_vi: "Phòng ĐTHS / QK4",
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
            title: "Tên tài khoản",
            dataIndex: "ten_tai_khoan",
            key: "ten_tai_khoan",
            align: "center",
          },
          {
            title: "Tên người dùng",
            dataIndex: "ten_nguoi_dung",
            key: "ten_nguoi_dung",
            align: "center",
          },
          {
            title: "Đơn vị",
            dataIndex: "don_vi",
            key: "don_vi",
            align: "center",
          },

          {
            title: "Ngày tạo",
            dataIndex: "ngay_tao",
            key: "ngay_tao",
            align: "center",
          },

          {
            title: "Đăng nhập lần cuối",
            dataIndex: "dang_nhap_cuoi",
            key: "dang_nhap_cuoi",
            align: "center",
          },
          {
            title: "Nhóm quyền",
            dataIndex: "nhom_quyen",
            key: "nhom_quyen",
            align: "center",
          },
          {
            title: "Trạng thái",
            dataIndex: "trang_thai",
            key: "trang_thai",
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

export default QuanLyNguoiDung;
