import {  Select, Tag, Space, Typography } from "antd";
import PropTypes from "prop-types";

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginInlineEnd: 4,
      }}
    >
      {label.split("--")?.[0]}
    </Tag>
  );
};
const SelectMutil = ({
  title,
  isNull = true,
  property,
  value,
  onChange,
  disabled = false,
  size = 0,
  width = 100,
  options = []
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
      {/* <AutoComplete
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      
      popupMatchSelectWidth={250}
      style={{
        width: 250,
      }}
      options={options}
      //size="large"
    >
      <Input.Search size="large" placeholder="Tìm và chọn cán bộ" />
    </AutoComplete> */}
  
 <Select
    value={value}
    mode="multiple"
    tagRender={tagRender}
    onChange={(e) => onChange(e)}
    filterOption={(inputValue, option) =>
      option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
    style={{
      width: '100%',
    }}
    options={options}
  />
    </Space>
  );
};
SelectMutil.propTypes = {
  title: PropTypes.string,
  property: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isNull: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.number,
  width: PropTypes.number,
  options: PropTypes.array
}
export default SelectMutil;
