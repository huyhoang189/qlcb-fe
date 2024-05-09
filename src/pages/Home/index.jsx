import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Flex, Row, Space, Statistic, Typography } from "antd";
import LineBar from "./line";
import PieChart from "./pie";
import CustomBreadcrumb from "../../components/breadcrumb";
import { ContentWrapper } from "../../assets/styles/contentWrapper.style";
const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
  ],
};
const Home = () => {
  return (
    <ContentWrapper>
      <CustomBreadcrumb items={[...pageHeader.breadcrumb]} />
      <Space direction="vertical" style={{ width: "100%" }}>
        <Row gutter={16}>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Số lượng cán bộ"
                value={702}
                valueStyle={{
                  color: "#00569E",
                }}
                // prefix={<ArrowUpOutlined />}
                suffix="người"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Số lượng cán bộ nữ"
                value={11}
                valueStyle={{
                  color: "#00569E",
                }}
                suffix="người"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Số lượng cán bộ dân tộc"
                value={11}
                valueStyle={{
                  color: "#00569E",
                }}
                suffix="người"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Số lượng cán bộ chuyển đi"
                value={9}
                valueStyle={{
                  color: "#cf1322",
                }}
                prefix={<ArrowDownOutlined />}
                suffix="người"
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Typography.Text>
              Biểu đồ số lượng cán bộ thay đổi theo năm
            </Typography.Text>
            <LineBar />
          </Col>
          <Col span={12}>
            <Typography.Text>
              Biểu đồ thành phần cán bộ theo chức danh pháp lý
            </Typography.Text>
            <Flex justify="center" align="center">
              <div style={{ width: "70%" }}>
                <PieChart />
              </div>
            </Flex>
          </Col>
        </Row>
      </Space>
    </ContentWrapper>
  );
};

export default Home;
