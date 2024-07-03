import styled from "styled-components";
import { Layout } from "antd";
const { Sider } = Layout;
export const SiderWrapper = styled(Sider)`
  .ant-menu-light.ant-menu-root.ant-menu-inline {
    border-inline-end: 0px;
  }

  .ant-layout-sider-children {
    border-right: 1px solid #d6d9dc;
  }

  // .ant-menu-title-content {
  //   font-weight: 500;
  // }

  // .ant-menu > li > .ant-menu-title-content {
  //   font-weight: 500;
  // }

  .ant-flex > .ant-menu > li > span {
    font-weight: 600;
  }

  .ant-flex > .ant-menu > li > div > span {
    font-weight: 600;
  }
`;
