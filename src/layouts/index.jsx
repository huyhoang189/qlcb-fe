import { Flex, Layout, theme } from "antd";
import Header from "./header";
import Siderbar from "./sidebar";

import { Outlet } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";

const { useToken } = theme;
const { Content, Footer } = Layout;
const MainLayout = () => {
  const token = useToken();
  const { width, height } = useWindowSize();
  console.log(height);
  return (
    <Layout
      style={{
        margin: 0,
        minHeight: height,
        backgroundColor: token.colorBgBase,
        fontFamily: '"Archivo", sans-serif',
      }}
    >
      <Header />
      <Siderbar />
      <Content
        style={{
          margin: 10,
          padding: 10,
          background: "#FFFFFF",
        }}
      >
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        ©{new Date().getFullYear()} Hệ thống quản lý Cán bộ Điều tra hình sự
        Quân đội - Cục Điều tra Hình sự - BQP
      </Footer>
    </Layout>
  );
};

export default MainLayout;
