import {Radio, Space, Typography} from "antd";
import PropTypes from "prop-types";

const RadioInput =
    ({
         title,
         property,
         value,
         onChange,
         option=[],
         isNull = true,
         size = 0,
         width = 100,
         defaultValue
     }) => {
        return (
            <Space
                direction="vertical"
                style={{width: `${width}%`, marginTop: 5, marginBottom: 5}}
                size={size}
            >
                <Typography.Text>
                    {title}
                    {isNull === false ? <span style={{color: "red"}}>(*)</span> : ""}
                </Typography.Text>
                <Radio.Group
                    value={value}
                    defaultValue={defaultValue}
                    onChange={(e) => onChange(property, e)}
                >
                    {
                        option.map(e=>(
                            <Radio key={e.value} value={e.value}>{e.label}</Radio>
                        ))
                    }
                </Radio.Group>
            </Space>
        )

    }


RadioInput.propTypes = {
    title: PropTypes.string,
    property: PropTypes.string,
    value: PropTypes.bool,
    defaultValue: PropTypes.bool,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    option: PropTypes.array,
    isNull: PropTypes.bool,
    size: PropTypes.number,
    width: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number
}

export default RadioInput