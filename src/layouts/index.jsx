import { Flex, Layout, theme } from "antd";
import Header from "./header";
import Siderbar from "./sidebar";

import { Outlet } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";

const { Content, Footer } = Layout;
const MainLayout = () => {
  const token = theme.useToken();
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
          backgroundColor: "#006666",
          color: "#fff",
        }}
      >
        ©HỆ THỐNG CSDL QUẢN LÝ CÁN BỘ NGÀNH ĐIỀU TRA HÌNH SỰ - CỤC ĐIỀU TRA HÌNH
        SỰ - BQP
      </Footer>
    </Layout>
  );
};

export default MainLayout;
