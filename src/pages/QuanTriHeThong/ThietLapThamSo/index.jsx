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
      title: "Thiết lập các tham số của hệ thống",
    },
  ],
};

const ThietLapThamSo = () => {
  return (
    <ContentWrapper>
      <CustomBreadcrumb items={pageHeader.breadcrumb} />
      <CustomeTable
        header={
          <Header>
            <CreateButton text="Thiết lập tham số" />
          </Header>
        }
        showHeader={false}
        data={[
          {
            tieu_de: "Thời gian duy trì phiên đăng nhập",
            gia_tri: "0.5 giờ",
          },
          {
            tieu_de: "Giới hạn số lần đăng nhập sai",
            gia_tri: "5 lần",
          },
          {
            tieu_de: "Thời gian khoá khi đăng nhập sai",
            gia_tri: "0.5 giờ",
          },
          {
            tieu_de: "Thời gian tự động sao lưu dữ liệu",
            gia_tri: "168 giờ",
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
            title: "Tiêu đề",
            dataIndex: "tieu_de",
            key: "tieu_de",
            // align: "center",
          },
          {
            title: "Giá trị",
            dataIndex: "gia_tri",
            key: "gia_tri",
            align: "center",
          },
        ]}
        // isLoading={isLoading}
        // pagination={{
        //   current: 1,
        //   pageSize: 10,
        //   total: 3,
        //   //onChange: handlePaginationChange,
        // }}
      />
    </ContentWrapper>
  );
};

export default ThietLapThamSo;
