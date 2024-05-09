import { Upload, Space, Typography } from "antd";
import PropTypes from "prop-types";
const uploadButton = (
  <button
    style={{
      border: 0,
      background: "none",
    }}
    type="button"
  >
    {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
    <div
      style={{
        marginTop: 8,
        color: "rgba(0, 0, 0, 0.88)",
        fontSize: "11px",
        fontFamily: "Archivo",
      }}
    >
      Tải lên
    </div>
  </button>
);
const ImageInput = ({
  title,
  imageUrl,
  value,
  onChange,
  beforeUpload,
  isNull = true,
  disabled = false,
  size = 0,
  width = 100,
  property,
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
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        property={property}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        beforeUpload={beforeUpload}
        onChange={(e) => onChange(property, e)}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </Space>
  );
};

ImageInput.propTypes = {
  title: PropTypes.string,
  property: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  beforeUpload: PropTypes.string,
  isNull: PropTypes.bool,
  imageUrl: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.number,
  width: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default ImageInput;
