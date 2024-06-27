import { DatePicker, Space, Typography } from "antd";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../utils/common";

const DateInput = ({
  title,
  property,
  value,
  onChange,
  isNull = true,
  disable = false,
  status = "",
  format = DATE_FORMAT.YYYYMMDD,
  picker,
}) => {
  const _value =
    dayjs(value ? value : dayjs(), format).toString() !== "Invalid Date"
      ? dayjs(value ? value : dayjs(), format)
      : dayjs();
  console.log();
  return (
    <Space
      direction="vertical"
      style={{ width: "100%", marginTop: 5, marginBottom: 5 }}
      size={0}
    >
      <Typography.Text style={{ fontWeight: "500" }}>
        {title}
        {isNull === false ? <span style={{ color: "red" }}>(*)</span> : ""}
      </Typography.Text>
      <DatePicker
        value={_value}
        format={format}
        onChange={(e) => onChange(property, e)}
        disabled={disable}
        status={status}
        picker={picker}
        style={{ width: "100%" }}
      />
    </Space>
  );
};

export default DateInput;
