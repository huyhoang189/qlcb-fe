import { Flex, Image, Menu, Typography, Layout, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import appSlice from "../../toolkits/App/slice.js";
import { publicRouter } from "../../routers/pageRouter.jsx";
// import { DrawerWrapper } from "./style.js";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/dths.png";
import { SiderWrapper } from "./style.js";
const { Sider } = Layout;
const Siderbar = () => {
  const { menuCollapse } = useSelector((state) => state.app);
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickSelectItem = (e) => {
    const url = e?.keyPath.reverse().join("\\");
    navigate(url);
  };

  return (
    <SiderWrapper
      width="250px"
      style={{
        backgroundColor: token?.colorBgBase,
        padding: "1px 0",
      }}
      collapsed={menuCollapse}
    >
      <Menu
        items={publicRouter}
        mode="inline"
        onClick={onClickSelectItem}
        theme="dark"
        style={{ height: "100%" }}
        selectedKeys={location.pathname.split("/").filter(Boolean)}
      />
    </SiderWrapper>
  );
};

export default Siderbar;
