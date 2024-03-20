import {Layout, theme} from "antd";
import Header from "./header";
import Siderbar from "./sidebar";

import {Outlet} from "react-router-dom";

const {useToken} = theme
const {Content, Footer} = Layout;
const MainLayout = () => {
    const token = useToken()
    return (
        <Layout style={{
            margin: 0,
            height: "100vh",
            backgroundColor: token.colorBgBase,
            fontFamily: "\"Archivo\", sans-serif"
        }}>
            <Header/>
            <Siderbar/>
            <Content
                style={{
                    margin: 10,
                    padding: 10,
                    background: "#FFFFFF",
                    // boxShadow: "0px 3px 14px rgba(226, 225, 225, 0.75)"
                }}>
                <Outlet/>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                ©{new Date().getFullYear()} Hệ thống quản lý cán bộ điều tra
            </Footer>
        </Layout>
    );
};

export default MainLayout;
