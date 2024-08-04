import { Flex, Image, Menu, Typography, Layout, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import appSlice from "../../toolkits/App/slice.js";
import { publicRouter } from "../../routers/pageRouter.jsx";
// import { DrawerWrapper } from "./style.js";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/dths.png";
import { SiderWrapper } from "./style.js";
import { useState } from "react";
const { Sider } = Layout;

const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(publicRouter);

const Siderbar = () => {
  const { menuCollapse } = useSelector((state) => state.app);
  const { token } = theme.useToken();

  const [stateOpenKeys, setStateOpenKeys] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickSelectItem = (e) => {
    const url = e?.keyPath.reverse().join("\\");
    navigate(url);
  };

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  // console.log(location.pathname.split("/").filter(Boolean));

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
        selectedKeys={
          location.pathname.split("/").filter(Boolean).length > 0
            ? location.pathname.split("/").filter(Boolean)
            : [""]
        }
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
      />
    </SiderWrapper>
  );
};

export default Siderbar;
