import { InputNumber, Space, Typography } from "antd";
import PropTypes from "prop-types";

const NumberInput = ({
  title,
  property,
  value,
  onChange,
  addonAfter,
  isNull = true,
  disabled = false,
  size = 0,
  width = 100,
  min = 0,
  max,
}) => {
  return (
    <Space
      direction="vertical"
      style={{ width: `${width}%`, marginTop: 5, marginBottom: 5 }}
      size={size}
    >
      <Typography.Text style={{ fontWeight: "bold" }}>
        {title}
        {isNull === false ? <span style={{ color: "red" }}>(*)</span> : ""}
      </Typography.Text>
      <InputNumber
        formatter={(value) =>
          value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        value={value}
        onChange={(e) => onChange(property, e)}
        disabled={disabled}
        min={min}
        max={max}
        addonAfter={addonAfter}
        style={{ width: "100%" }}
      />
    </Space>
  );
};

NumberInput.propTypes = {
  title: PropTypes.string,
  property: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  addonAfter: PropTypes.string,
  isNull: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.number,
  width: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default NumberInput;
