import {  AutoComplete, Input, Space, Typography } from "antd";
const AutoCompleteInput = ({
  title,
  options,
  value,
  onChange,
  isNull = true,
  disable = false,
  status = "",
  placeholder,
  size = 0,
  width = 100,
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
    <AutoComplete
    style={{
      width: "100%",
    }}
    options={options}
    multiple={true}
    placeholder={placeholder}
    filterOption={(inputValue, option) =>
      option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
  />
    </Space>
  );
};

export default AutoCompleteInput;
