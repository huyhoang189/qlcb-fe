import { DatePicker, Space, Typography } from "antd";
const { RangePicker } = DatePicker;
import PropTypes from "prop-types";
import dayjs from "dayjs";

const RangeDate = ({
  title,
  property,
  isNull = true,
  value,
  onChange,
}) => {
  const _value = value.split("-").map(item=>
    dayjs(item ? item : "").toString() !==
    "Invalid Date"
      ? dayjs(item ? item : "")
      : ""
)
  return (
    <Space
      direction="vertical"
      style={{ width: "100%", marginTop: 5, marginBottom: 5 }}
    >
      <Typography.Text style={{ fontWeight: "bold" }}>
        {title}
        {isNull === false ? <span style={{ color: "red" }}>(*)</span> : ""}
      </Typography.Text>
      <RangePicker
        style={{ width: "100%"}}
        picker="year"
        id={{
            start: 'startInput',
            end: 'endInput',
        }}
        placeholder={[
            'Năm bắt đầu',
            'Năm kết thúc'
        ]}
        onChange={(e) => onChange(property, e)}
        value={_value}
        // onFocus={(_, info) => {
        //     console.log('Focus:', info.range);
        // }}
        // onBlur={(_, info) => {
        //     console.log('Blur:', info.range);
        // }}
    />
    </Space>
  );
};

RangeDate.propTypes = {
  title: PropTypes.string,
  property: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isNull: PropTypes.bool,
}
export default RangeDate;
