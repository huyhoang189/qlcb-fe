import { Row, Col} from "antd";
import './index.css'
const BanThan = () => {
  return (
    <Row
    style={{ width: "100%", padding: '0 48px'}}
    >
    <div style={{ width: "100%", textAlign:"center"}}>
    <span className="header" style={{fontSize:"16px"}}>I. BẢN THÂN</span>
    </div>
    <div className="info" style={{ width: "100%" }}>
    <Row gutter={8}>
        <Col span={8}>
            <span>Sinh ngày: </span>
            <span>06 tháng 3 năm 2000</span>
        </Col>
        <Col span={8}>
            <span>Dân tộc: </span>
            <span>Kinh</span>
        </Col>
        <Col span={8}>
            <span>Tôn giáo: </span>
            <span>Không</span>
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
            <span>Nơi ở hiện nay: </span>
            <span>b11 + b12 khu đấu giá Yên Xá, đường Yên Xá, Tân Triều, Thanh Trì, Hà Nội</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={12}>
            <span>Ngày tham gia cách mạng: </span>
            <span></span>
        </Col>
        <Col span={12}>
            <span>Ngày tuyển dụng: </span>
            <span>Không</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={8}>
            <span>Ngày nhập ngũ: </span>
            <span></span>
        </Col>
        <Col span={8}>
            <span>Xuất ngũ: </span>
            <span>Không</span>
        </Col>
        <Col span={8}>
            <span>Tái ngũ: </span>
            <span>Không</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={12}>
            <span>Ngày vào Đảng: </span>
            <span></span>
        </Col>
        <Col span={12}>
            <span>Ngày chính thức: </span>
            <span>Không</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Giáo dục phổ thông: </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Chức danh khoa học, học vị cao nhất, chuyên ngành, thời gian: </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Chỉ huy quản lý (sơ, trung, cao cấp): </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Lý luận chính trị (sơ, trung, cao cấp): </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Chuyên môn, kỹ thuật (sơ, trung, cao cấp): </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Ngoại ngữ, trình độ, tháng năm: </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Tiếng dân tộc, mức độ nghe, nói, viết: </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Qua trường <span className="note">(tên trường, ngành học, chuyên ngành học, cấp học, thời gian, kết quả, loại hình đào tạo)</span>: </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Chiến đấu, phục vụ chiến đấu <span className="note">(thời gian; cương vị, đơn vị; địa danh, địa điểm; trực tiếp hoặc phục vụ chiến đấu; đối tượng)</span>: </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Đã đi nước ngoài <span className="note">(tên nước, thời gian, lý do)</span>: </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={8}>
            <span>Sức khỏe loại: </span>
            <span></span>
        </Col>
        <Col span={8}>
            <span>Nhóm máu: </span>
            <span></span>
        </Col>
        <Col span={8}>
            <span>Bệnh chính: </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Thương tật <span className="note">(loại, tỷ lệ, nguyên nhân, thời gian và nơi bị thương, thời gian giám định)</span>: </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Danh hiệu được phong, tháng năm: </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Khen thưởng <span className="note">(hình thức, tháng năm, lý do)</span>: </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Kỷ luật <span className="note">(hình thức, tháng năm, lý do)</span>: </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Trước khi nhập ngũ (tuyển dụng) làm gì? Ở đâu? Quan hệ CT-XH: </span>
            <span></span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Tình hình nhà ở <span className="note">(loại nhà, diện tích, hình thức sở hữu)</span>: </span>
            <span></span>
        </Col>
    </Row>
    </div>
    </Row>
  );
};
export default BanThan;
