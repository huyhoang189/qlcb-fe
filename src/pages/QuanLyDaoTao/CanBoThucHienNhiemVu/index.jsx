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
      title: "Quản lý đào tạo",
    },
    {
      title: "Quản lý cán bộ đang thực hiện nhiệm vụ đào tạo",
    },
  ],
};

const CanBoDangThucHienNhiemVu = () => {
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
            key_table: 1,
            truong_hoc: "Học viện cảnh sát nhân dân",
            chuyen_nganh: "Điều tra hình sự",
            so_luong: 20,
          },
          {
            key_table: 2,
            truong_hoc: "Học viện An ninh nhân dân",
            chuyen_nganh: "An ninh điều tra",
            so_luong: 20,
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
            title: "Tên cơ sở đào tạo",
            dataIndex: "truong_hoc",
            key: "truong_hoc",
            align: "center",
          },
          {
            title: "Chuyên ngành",
            dataIndex: "chuyen_nganh",
            key: "chuyen_nganh",
            align: "center",
          },

          {
            title: "Số lượng",
            dataIndex: "so_luong",
            key: "so_luong",
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
                <DetailButton
                // onClick={() => {
                //   navigate(`${record.id}/chi-tiet-ke-hoach`);
                // }}
                />
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

export default CanBoDangThucHienNhiemVu;
