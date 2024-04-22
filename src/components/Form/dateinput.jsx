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
}) => {
  const _value =
    dayjs(value ? value : dayjs(), DATE_FORMAT.DDMMYYYY).toString() !==
    "Invalid Date"
      ? dayjs(value ? value : dayjs(), DATE_FORMAT.DDMMYYYY)
      : dayjs();
  console.log();
  return (
    <Space
      direction="vertical"
      style={{ width: "100%", marginTop: 5, marginBottom: 5 }}
    >
      <Typography.Text style={{ fontWeight: "bold" }}>
        {title}
        {isNull === false ? <span style={{ color: "red" }}>(*)</span> : ""}
      </Typography.Text>
      <DatePicker
        value={_value}
        format={DATE_FORMAT.DDMMYYYY}
        onChange={(e) => onChange(property, e)}
        disabled={disable}
        status={status}
        style={{ width: "100%" }}
      />
    </Space>
  );
};

export default DateInput;
