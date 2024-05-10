import { Row, Col} from "antd";
import { Content } from "antd/es/layout/layout.js";
import './index.css'
const TinhHinhKTCTGD = () => {
 

  return (
    <Content
    style={{
        padding: '0 48px',
        
      }}
    >
    <Row align="middle">
    <Col span={24} offset={8}>
        <span className="header" style={{fontSize:"16px"}}>II. TÌNH HÌNH KT – CT CỦA GIA ĐÌNH</span>
    </Col>
    </Row>
    <div className="info">
    <Row gutter={8}>
        <Col span={8}>
            <span>Họ tên cha: </span>
            <span>Nguyễn Lệ N</span>
        </Col>
        <Col span={8}>
            <span>Sinh: </span>
            <span>1967</span>
        </Col>
        <Col span={8}>
            <span>Nghề nghiệp: </span>
            <span>Làm Ruộng</span>
        </Col>
    </Row>
    <Row gutter={8}>
    <Col span={8}>
            <span>Họ tên mẹ: </span>
            <span>Nguyễn Lệ N</span>
        </Col>
        <Col span={8}>
            <span>Sinh: </span>
            <span>1967</span>
        </Col>
        <Col span={8}>
            <span>Nghề nghiệp: </span>
            <span>Làm Ruộng</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Thành phần gia đình: </span>
            <span>Bần nông</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Quê quán: </span>
            <span>Xuân Hòa, Nam Đàn, Nghệ An</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Nơi ở hiện nay của gia đình: </span>
            <span>Xuân Hòa, Nam Đàn, Nghệ An</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Cha mẹ sinh được : 4 người con (1 trai, 3 gái ),  đồng chí : Trang,  là thứ : 1	: </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Tình hình KT – CT của gia đình: </span>
            <span></span>
        </Col>
    </Row>
    </div>
    </Content>
  );
};

export default TinhHinhKTCTGD;