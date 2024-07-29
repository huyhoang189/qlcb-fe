import {
  Button,
  Card,
  Col,
  Flex,
  Image,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import logo from "../../assets/dths.png";
import bg from "../../assets/image/bg.jpg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "../../toolkits/Auth/slice";
const Login = () => {
  // const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { errorMessage } = useSelector((state) => state.auths);

  const onSubmit = () => {
    dispatch(
      authSlice.actions.login({
        user_name: username,
        password: password,
      })
    );
  };

  return (
    <Flex
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#00569E",
        boxShadow: `10px 10px 15px rgba(0, 0, 0, 0.3)`,
      }}
      justify="center"
      align="center"
    >
      <Flex
        style={{
          width: 800,
          height: 500,
          backgroundColor: "#f1f1f1",
          borderRadius: 10,
        }}
      >
        <Flex
          vertical
          style={{ width: 300, padding: "20px 20px" }}
          justify="space-between"
          align="center"
        >
          <div></div>
          <Space direction="vertical" style={{ width: "100%" }} size={(10, 10)}>
            <Flex vertical gap={5} justify="center" align="center">
              <Image src={logo} width={60} height={60} preview={false} />
              <Typography.Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                HỆ THỐNG CƠ SỞ DỮ LIỆU <br />
                QUẢN LÝ CÁN BỘ NGÀNH ĐIỀU TRA HÌNH SỰ
              </Typography.Text>
            </Flex>
            <Input
              placeholder="Tên đăng nhập ?"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
            />
            <Input.Password
              placeholder="Mật khẩu"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />

            <Button block type="primary" onClick={onSubmit}>
              Đăng nhập
            </Button>

            {errorMessage !== false && (
              <Typography.Text type="danger">{errorMessage}</Typography.Text>
            )}
          </Space>
          <Flex vertical gap={5} justify="center" align="center">
            <Typography.Text
              style={{
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              © Phát triển bởi Cục Điều tra Hình sự - BQP
            </Typography.Text>
          </Flex>
        </Flex>
        <Image
          src={bg}
          preview={false}
          width={500}
          height={"100%"}
          style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
        />
      </Flex>
    </Flex>
  );
};

export default Login;
