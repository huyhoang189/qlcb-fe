import { Avatar, Button, Dropdown, Flex, Image, theme, Typography } from "antd";
import { LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
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
      style={{
        backgroundColor: token.colorBgHeader,
        color: token.colorBase,
        height: 60,
        padding: 10,
      }}
      gap="middle"
      justify="space-between"
    >
      <Flex gap="middle" justify="flex-start" align="center">
        <Image src={logo} preview={false} width={45} />
        <Typography.Title
          level={3}
          style={{
            color: "#FFFFFF",
            margin: 0,
            padding: 0,
            fontWeight: "bold",
          }}
        >
          HỆ THỐNG CSDL QUẢN LÝ CÁN BỘ NGÀNH ĐIỀU TRA HÌNH SỰ
        </Typography.Title>
      </Flex>
      <Dropdown
        menu={{
          items: [
            {
              key: "PROFILE",
              label: (
                <Flex gap={10}>
                  <UserOutlined /> <span>Cá nhân</span>
                </Flex>
              ),
            },
            {
              key: "LOGOUT",
              label: (
                <Flex gap={10}>
                  <LogoutOutlined /> <span>Đăng xuất</span>
                </Flex>
              ),
            },
          ],
        }}
        placement="bottom"
        arrow
      >
        <Flex align="center" gap={10}>
          <Avatar
            style={{
              backgroundColor: "#87d068",
            }}
            icon={<UserOutlined />}
          />
          <Flex vertical style={{ width: 150 }}>
            <Typography.Text
              style={{ fontSize: 15, color: "#fff", fontWeight: 600 }}
            >
              Vũ Quốc Hoàng
            </Typography.Text>
            <Typography.Text style={{ fontSize: 10, color: "#fff" }}>
              Quản trị viên
            </Typography.Text>
          </Flex>
        </Flex>
      </Dropdown>
    </Flex>
  );
};

export default Header;
