import { Button, Flex, Image, theme, Typography } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import appSlice from "../../toolkits/App/slice.js";
import logo from "../../assets/dths.png";
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
      {/* <Button
        icon={<MenuOutlined style={{ color: "#003866" }} />}
        type="none"
        style={{ border: "2px solid #003866" }}
        onClick={collapseSiderbar}
      /> */}
      <Image src={logo} preview={false} width={45} />
      <Typography.Title
        level={3}
        style={{ color: "#FFFFFF", margin: 0, padding: 0, fontWeight: "bold" }}
      >
        HỆ THỐNG CSDL QUẢN LÝ CÁN BỘ NGÀNH ĐIỀU TRA HÌNH SỰ
      </Typography.Title>
    </Flex>
  );
};

export default Header;
