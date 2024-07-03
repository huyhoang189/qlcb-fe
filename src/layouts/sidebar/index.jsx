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

  //   const onToggleSider = () => {
  //     dispatch(appSlice.actions.toggleSiderbar());
  //   };
  const onClickSelectItem = (e) => {
    const url = e?.keyPath.reverse().join("\\");
    navigate(url);
    dispatch(appSlice.actions.toggleSiderbar());
  };
  return (
    <SiderWrapper
      width="250px"
      style={{
        backgroundColor: token?.colorBgBase,
      }}
    >
      <Flex vertical="horizonal" justify={"space-between"} align={"center"}>
        {/* <Image src={logo} preview={false} width={100} />
        <Typography.Text style={{ textAlign: "center", fontWeight: "bold" }}>
          HỆ THỐNG QUẢN LÝ <br /> CÁN BỘ NGÀNH ĐIỀU TRA
        </Typography.Text> */}
        <Menu items={publicRouter} mode="inline" onClick={onClickSelectItem} />
      </Flex>
    </SiderWrapper>
  );
};

export default Siderbar;
