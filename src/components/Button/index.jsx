import { Button, Popconfirm, Tooltip } from "antd";
import PropTypes from "prop-types";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const CreateButton = ({
  onClick,
  text = "Thêm mới",
  icon = <PlusOutlined />,
  disabled = false,
  size = "normal",
}) => {
  return text ? (
    <Button
      type="primary"
      icon={icon}
      disabled={disabled}
      onClick={onClick}
      style={{ marginBottom: 5, marginTop: 5 }}
      size={size}
    >
      {text}
    </Button>
  ) : (
    <Tooltip title={text}>
      <Button icon={icon} onClick={onClick} disabled={disabled} size={size} />
    </Tooltip>
  );
};

CreateButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  icon: PropTypes.element,
  disabled: PropTypes.bool,
  size: PropTypes.string,
};

const DetailButton = ({
  onClick,
  title = "Chi tiết dữ liệu",
  icon = <InfoCircleOutlined />,
  disabled = false,
  name = "",
}) => {
  return (
    <Tooltip title={title}>
      <Button icon={icon} onClick={onClick} disabled={disabled}>
        {name}
      </Button>
    </Tooltip>
  );
};

DetailButton.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.element,
  disabled: PropTypes.bool,
};

const UpdateButton = ({
  onClick,
  title = "Cập nhật dữ liệu",
  icon = <EditOutlined />,
  disabled = false,
  name = "",
  size = "normal",
}) => {
  return (
    <Tooltip title={title}>
      <Button icon={icon} onClick={onClick} disabled={disabled} size={size}>
        {name}
      </Button>
    </Tooltip>
  );
};

UpdateButton.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.element,
  disabled: PropTypes.bool,
  size: PropTypes.string,
};

const DeleteButton = ({
  onConfirm,
  title = "Xoá dữ liệu",
  icon = <DeleteOutlined />,
  disabled = false,
  type = "default",
  size = "normal",
}) => {
  return (
    <Popconfirm
      title="Bạn có muốn xoá bản ghi không ?"
      onConfirm={onConfirm}
      okText="Đồng ý"
      cancelText="Không đồng ý"
      placement="leftTop"
    >
      <Tooltip title={title}>
        <Button
          danger
          icon={icon}
          type={type}
          disabled={disabled}
          size={size}
        />
      </Tooltip>
    </Popconfirm>
  );
};

DeleteButton.propTypes = {
  onConfirm: PropTypes.func,
  title: PropTypes.string,
  icon: PropTypes.element,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.string,
};

const ButtonBasic = ({
  onClick,
  text,
  disabled = false,
  size = "normal",
}) => {
  return text ? (
    <Button
      type="primary"
      disabled={disabled}
      onClick={onClick}
      style={{ marginBottom: 5, marginTop: 5 }}
      size={size}
    >
      {text}
    </Button>
  ) : (
    <Tooltip title={text}>
      <Button onClick={onClick} disabled={disabled} size={size} />
    </Tooltip>
  );
};

ButtonBasic.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
};

export { CreateButton, UpdateButton, DeleteButton, DetailButton, ButtonBasic };