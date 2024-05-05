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
        icon={<MenuOutlined style={{ color: "#3c811e" }} />}
        type="none"
        style={{ border: "2px solid #3c811e" }}
        onClick={collapseSiderbar}
      />
      <Typography.Title
        level={2}
        style={{ color: "#3c811e", margin: 0, padding: 0 }}
      >
        HỆ THỐNG QUẢN LÝ CÁN BỘ NGÀNH ĐIỀU TRA
      </Typography.Title>
    </Flex>
  );
};

export default Header;
