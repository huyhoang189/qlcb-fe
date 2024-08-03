import { Avatar, Button, Dropdown, Flex, Image, theme, Typography } from "antd";
import { LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import appSlice from "../../toolkits/App/slice.js";
import authSlice from "../../toolkits/Auth/slice.js";
import logo from "../../assets/dths.png";
import { useEffect } from "react";
const { useToken } = theme;
const Header = () => {
  const { token } = useToken();
  const dispatch = useDispatch();
  const { sessionUser } = useSelector((state) => state.auths);

  const collapseSiderbar = () => {
    dispatch(appSlice.actions.toggleSiderbar());
  };

  useEffect(() => {
    dispatch(authSlice.actions.checkAuthentication());
  }, [dispatch]);

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
        <Button
          icon={
            <MenuOutlined
              style={{ color: "#fff", border: "1px solid #fff", padding: 5 }}
            />
          }
          type="none"
          style={{ width: 60 }}
          onClick={collapseSiderbar}
        />
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
          onClick: (e) => {
            const { key } = e;
            if (key === "LOGOUT") {
              dispatch(authSlice.actions.logout());
            } else if (key === "PROFILE") {
              console.log(key);
            }
          },
        }}
        placement="bottom"
        arrow
        // onClick={navigatePath}
        trigger={["click"]}
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
              style={{ fontSize: 15, color: "#FFFFFF", fontWeight: 600 }}
            >
              {sessionUser?.full_name || "Nothing"}
            </Typography.Text>
            <Typography.Text style={{ fontSize: 10, color: "#FFFFFF" }}>
              {sessionUser?.groups || "Nothing"}
            </Typography.Text>
          </Flex>
        </Flex>
      </Dropdown>
    </Flex>
  );
};

export default Header;
