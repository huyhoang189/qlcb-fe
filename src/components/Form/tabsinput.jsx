import { Space, Tabs, Typography, Button } from "antd";
import PropTypes from "prop-types";
import './tabsinput.css';
import {
    DeleteOutlined,
    EditOutlined,
    InfoCircleOutlined,
    PlusOutlined,
  } from "@ant-design/icons";
const TabsInput = ({
  title,
  property,
  value,
  onEdit,
  isNull = true,
  disabled = false,
  size = 0,
  width = 100,
  items = [],
}) => {
  return (
    <Space
      direction="vertical"
      style={{ width: `${width}%`, marginTop: 5, marginBottom: 5 }}
      size={size}
    >
      <Typography.Text>
        {title}
        {isNull === false ? <span style={{ color: "red" }}>(*)</span> : ""}
      </Typography.Text>
      <Tabs defaultActiveKey="tab1" onEdit={onEdit} items={items}>
        
      </Tabs>
    </Space>
  );
};

TabsInput.propTypes = {
  title: PropTypes.string,
  property: PropTypes.string,
  value: PropTypes.string,
  onEdit: PropTypes.func,
  isNull: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.number,
  width: PropTypes.number,
  items: PropTypes.array,
};

export default TabsInput;
