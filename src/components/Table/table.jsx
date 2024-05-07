import { Pagination, Row } from "antd";
import PropTypes from "prop-types";
import { TableWrapper } from "./style.js";

const CustomeTable = ({
  pagination = false,
  columns = [],
  data = [],
  isLoading = false,
  rowSelection = null,
  onRow = null,
  header = null,
  showHeader = true,
}) => {
  let dataSource = [];
  dataSource = data.map((e, i) => ({
    ...e,
    key_table: pagination
      ? 1 + i + pagination?.pageSize * (pagination?.current - 1)
      : i + 1,
  }));

  return (
    <Row style={{ width: "100%" }}>
      {header}
      <TableWrapper
        showHeader={showHeader}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        loading={isLoading}
        style={{ width: "100%" }}
        rowSelection={rowSelection}
        bordered
        expandable={{ defaultExpandedRowKeys: ["0-0"] }}
      />
    </Row>
  );
};

CustomeTable.propTypes = {
  pagination: PropTypes.object || PropTypes.bool,
  columns: PropTypes.array,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  rowSelection: PropTypes.object,
  onRow: PropTypes.func,
  header: PropTypes.element,
  showHeader: PropTypes.bool,
};
export default CustomeTable;
