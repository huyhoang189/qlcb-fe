import { Button, Card, Col, Flex, Image, Row, Space, Typography } from "antd";
import login_bg from "../../assets/image/login_2.jpeg";
import logo from "../../assets/dths.png";
import TextInput from "../../components/Form/textinput";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  return (
    <Row style={{ height: "100vh" }}>
      <Col span={8}>
        <Flex
          vertical="horizontal"
          style={{
            height: "100%",
          }}
          align="center"
          justify="center"
        >
          <Space direction="vertical" style={{ width: "80%" }}>
            <Flex
              vertical="horizonal"
              justify={"space-between"}
              align={"center"}
            >
              <Image src={logo} preview={false} width={100} />
              <Typography.Title
                style={{ textAlign: "center", fontWeight: "bold" }}
                level={4}
              >
                HỆ THỐNG QUẢN LÝ CÁN BỘ NGÀNH ĐIỀU TRA
              </Typography.Title>
            </Flex>
            <TextInput title={"Tên tài khoản"} />
            <TextInput title={"Mật khẩu"} />
            <Button
              type="primary"
              style={{ width: "100%" }}
              onClick={() => navigate("/")}
            >
              Đăng nhập
            </Button>
          </Space>
        </Flex>
      </Col>
      <Col span={16} style={{ backgroundColor: "##fff" }}>
        <Flex
          vertical="horizontal"
          style={{
            height: "100%",
          }}
          align="center"
          justify="center"
        >
          <Card
            style={{ borderWidth: 0, width: "90%" }}
            cover={<img alt="example" src={login_bg} />}
          />
        </Flex>
      </Col>
    </Row>
  );
};

export default Login;
