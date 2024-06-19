import { Col, Divider, Flex, Row, Space } from "antd";
import TextInput from "../../../components/Form/textinput";
import DateInput from "../../../components/Form/dateinput";
import SelectInput from "../../../components/Form/selectinput";
import { CreateButton } from "../../../components/Button";
import { SearchOutlined } from "@ant-design/icons";

const SearchBox = () => {
  return (
    <Row style={{ width: "100%" }}>
      {/* < style={{ width: "100%" }} direction="horizontal">
        <TextInput title={"Số hiệu quân nhân"} />
        <TextInput title={"Ngày tháng năm sinh"} />
        <TextInput title={"Thời gian nhập ngũ"} />
        <TextInput title={"Họ và tên khai sinh"} />
      </Space> */}
      <Row style={{ width: "100%" }} gutter={16}>
        <Col span={6}>
          <TextInput title={"Số hiệu quân nhân"} />
        </Col>
        <Col span={6}>
          <TextInput title={"Họ tên khai sinh"} />
        </Col>
        <Col span={6}>
          <DateInput title={"Ngày tháng năm sinh"} />
        </Col>
        <Col span={6}>
          <DateInput title={"Thời gian nhập ngũ"} />
        </Col>
      </Row>
      <Row style={{ width: "100%" }} gutter={16}>
        <Col span={6}>
          <TextInput title={"Quê quán"} />
        </Col>
        <Col span={6}>
          <SelectInput
            title={"Quân hàm"}
            options={[
              {
                label: "Thiếu uý",
                value: "THIEU_UY",
              },
            ]}
          />
        </Col>
        <Col span={6}>
          <SelectInput
            title={"Ngoại ngữ"}
            options={[
              {
                value: "Tiếng Anh",
                label: "Tiếng Anh / B1",
              },
            ]}
          />
        </Col>
        <Col span={6}>
          <SelectInput
            title={"Chức danh pháp lý"}
            options={[
              {
                value: "Điều tra viên sơ cấp",
                label: "Điều tra viên sơ cấp",
              },
            ]}
          />
        </Col>
      </Row>
      <Flex justify="center" style={{ width: "100%" }}>
        <CreateButton icon={<SearchOutlined />} text="Tìm kiếm" />
      </Flex>
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
    </Row>
  );
};

export default SearchBox;
