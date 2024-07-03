import { Input, Space, Typography } from "antd";
import PropTypes from "prop-types";

const TextInput = ({
  title,
  property,
  value,
  onChange,
  isNull = true,
  placeholder = "Nhập dữ liệu",
  disabled = false,
  size = 0,
  width = 100,
  direction="vertical",
  boldText = true,
  align
}) => {
  return (
    <Space
      direction={direction}
      align={align}
      style={{ width: `${width}%`, marginTop: 5, marginBottom: 5 }}
      size={size}
    >
      <Typography.Text style={boldText?{ fontWeight: "bold" }:{marginRight: 5}}>
        {title}
        {isNull === false ? <span style={{ color: "red" }}>(*)</span> : ""}
      </Typography.Text>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(property, e)}
        disabled={disabled}
      />
    </Space>
  );
};

TextInput.propTypes = {
  title: PropTypes.string,
  property: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isNull: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.number,
  width: PropTypes.number,
  direction: PropTypes.string,
  boldText: PropTypes.bool,
  align:PropTypes.string
};

export default TextInput;
