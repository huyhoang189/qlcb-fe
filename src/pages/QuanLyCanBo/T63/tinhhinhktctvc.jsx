import { Row, Col} from "antd";
import { Content } from "antd/es/layout/layout.js";
import './index.css'
const TinhHinhKTCTVC = () => {
  return (
    <Row
    style={{ width: "100%", padding: '0 48px'}}
    >
    <div style={{ width: "100%", textAlign:"center"}}>
    <span className="header" style={{fontSize:"16px"}}>III. TÌNH HÌNH KT – CT CỦA GIA ĐÌNH VỢ, VỢ (CHỒNG)</span>
    </div>
    <div className="info" style={{ width: "100%" }}>
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
            <span>Cha mẹ sinh được : 4 người con (1 trai, 3 gái ),  vợ (chồng) là thứ: Trang,  là thứ : 1	: </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span className="header">Tình hình KT – CT của gia đình vợ (chồng), bản thân vợ (chồng): </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
    <span>- Kinh tế: </span>
    </Row>
    <Row gutter={8}>
    <span>- Chính trị: </span>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Họ tên vợ (chồng ): </span>
            <span></span>
        </Col>
        <Col span={24}>
            <span>Năm sinh: </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Nghề nghiệp: </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Nơi ở hiện nay: </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Họ tên, năm sinh, nghề nghiệp các con: </span>
            <span></span>
        </Col>
    </Row>
    </div>
    </Row>
  );
};

export default TinhHinhKTCTVC;