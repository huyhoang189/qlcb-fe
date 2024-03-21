import styled from "styled-components";
import {Drawer} from "antd";

export const DrawerWrapper = styled(Drawer)`

    .ant-drawer-body {
        padding: 10px;
    }

    .ant-menu-inline {
        border-inline-end: 0 !important;
    }

    .ant-menu-title-content {
        font-family: "Archivo", sans-serif;
        
    }
`;