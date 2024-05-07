import {  AutoComplete, Tag, Space, Typography } from "antd";
import PropTypes from "prop-types";
const AutoCompleteSearch = ({
  title,
  isNull = true,
  property,
  value,
  onChange,
  onSelect,
  disabled = false,
  size = 0,
  width = 100,
  options = [],
  filterOption
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
      <AutoComplete
      value={value}
      autoFocus={true}
      placeholder="Tìm kiếm"
      filterOption={filterOption}
      onChange={(data, option) => onChange(data, option)}
      onSelect={(data, option) => onSelect(data, option)}
      options={options}
      style={{
        width: '100%',
      }}
      //onSelect={onSelect}
    >
    </AutoComplete>
  
 {/* <Select
    value={value}
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    tagRender={tagRender}
    onChange={(e) => onChange(e)}
    filterOption={(inputValue, option) =>
      option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
    style={{
      width: '100%',
    }}
    options={options}
  /> */}
    </Space>
  );
};
AutoCompleteSearch.propTypes = {
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
export default AutoCompleteSearch;
