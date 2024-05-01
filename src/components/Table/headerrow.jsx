import { Flex, Typography } from "antd";
import React from "react";

const HeaderRow = ({ items, align = "left", splitBy = "" }) => {
  return (
    <Flex vertical>
      {items.map((e, i) => (
        <Typography.Text key={i} style={{ width: "100%", textAlign: align }}>
          {`${e}${splitBy !== "" && i === items.length - 1 ? "" : splitBy} `}
        </Typography.Text>
      ))}
    </Flex>
  );
};

export default HeaderRow;
