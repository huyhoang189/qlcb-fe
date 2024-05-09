import { Button, Flex, theme, Typography } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import appSlice from "../../toolkits/App/slice.js";

const { useToken } = theme;
const Header = () => {
  const { token } = useToken();
  const dispatch = useDispatch();

  const collapseSiderbar = () => {
    dispatch(appSlice.actions.toggleSiderbar());
  };
  return (
    <Flex
      gap="middle"
      //   vertical
      style={{
        backgroundColor: token.colorBgHeader,
        color: token.colorBase,
        height: 60,
        padding: 10,
      }}
      justify="flex-start"
      align="center"
    >
      <Button
        icon={<MenuOutlined style={{ color: "#003866" }} />}
        type="none"
        style={{ border: "2px solid #003866" }}
        onClick={collapseSiderbar}
      />
      <Typography.Title
        level={2}
        style={{ color: "#FFFFFF", margin: 0, padding: 0, fontWeight: "bold" }}
      >
        HỆ THỐNG QUẢN LÝ CÁN BỘ NGÀNH ĐIỀU TRA
      </Typography.Title>
    </Flex>
  );
};

export default Header;
