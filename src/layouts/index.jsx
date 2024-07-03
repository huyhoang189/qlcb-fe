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
      <Layout>
        <Siderbar />

        <Content
          style={{
            margin: 10,
            padding: 10,
            background: "#FFFFFF",
            // borderColor: token.colorBorderSecondary,
            border: "1px solid #d6d9dc",
          }}
        >
          <Outlet />
        </Content>
      </Layout>

      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#00569E",
          color: "#fff",
        }}
      >
        ©{new Date().getFullYear()} Hệ thống quản lý Cán bộ Điều tra hình sự -
        Cục Điều tra Hình sự - Bộ Quốc Phòng
      </Footer>
    </Layout>
  );
};

export default MainLayout;
