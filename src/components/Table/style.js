import styled from "styled-components";
import {Table} from "antd";

export const TableWrapper = styled(Table)`
    .ant-table-cell {
        padding: 6px 16px !important;
        background: #fff;
    }

    .ant-layout-header {
        line-height: 40px;
    }

    .ant-table-thead > tr > th {
        background: #f9f9f9;
        text-transform: uppercase;
        
    }


`;