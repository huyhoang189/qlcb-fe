import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn yêu câù không tồn tại hoặc trong qúa trình phát triển"
        extra={<Button type="primary" onClick={() => navigate(-1)}>
            Quay lại
        </Button>}
    />
}

export default NotFound