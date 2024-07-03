import { Row, Col} from "antd";
import { useEffect} from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../../components/Form/textinput";
import DateInput from "../../../components/Form/dateinput";
import { ACTION_NAME, DATE_FORMAT } from "../../../utils/common.js";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import {
    CreateButton,   
  } from "../../../components/Button/index.jsx";
  import {
    EditOutlined,
    PlusOutlined,
  } from "@ant-design/icons";
import Header from "../../../components/Table/header.jsx";
import './index.css'
import banThanSlice from "../../../toolkits/T63/BanThan/slice.js";
const BanThan = () => {
    const params = useParams();
    const { ma_can_bo } = params;
    const { banThans, selectedBanThan} =
    useSelector((state) => state.banThans);
    const dispatch = useDispatch();
    useEffect(() => {
        let data = {
                "so_hieu_quan_nhan": banThans?.ban_than?.so_hieu_quan_nhan,
                "ho_ten_khai_sinh": banThans?.ban_than?.ho_ten_khai_sinh,
                "ho_ten_khac": banThans?.ban_than?.ho_ten_khac,
                "gioi_tinh": banThans?.ban_than?.gioi_tinh,
                "cap_bac": banThans?.ban_than?.cap_bac,
                "ngay_thang_nam_sinh": new dayjs(banThans?.ban_than?.ngay_thang_nam_sinh).format(DATE_FORMAT.DDMMYYYY),
                "dan_toc": banThans?.ban_than?.dan_toc,
                "ton_giao": banThans?.ban_than?.ton_giao,
                "que_quan": banThans?.ban_than?.que_quan,
                "noi_o_hien_nay": banThans?.ban_than?.noi_o_hien_nay,
                "ngay_tham_gia_cach_mang": new dayjs(banThans?.ban_than?.ngay_tham_gia_cach_mang).format(DATE_FORMAT.DDMMYYYY),
                "ngay_tuyen_dung": new dayjs(banThans?.ban_than?.ngay_tuyen_dung).format(DATE_FORMAT.DDMMYYYY),
                "ngay_nhap_ngu": new dayjs(banThans?.ban_than?.ngay_nhap_ngu).format(DATE_FORMAT.DDMMYYYY),
                "ngay_xuat_ngu": new dayjs(banThans?.ban_than?.ngay_xuat_ngu).format(DATE_FORMAT.DDMMYYYY),
                "ngay_tai_ngu": new dayjs(banThans?.ban_than?.ngay_tai_ngu).format(DATE_FORMAT.DDMMYYYY),
                "ngay_vao_dang": new dayjs(banThans?.ban_than?.ngay_vao_dang).format(DATE_FORMAT.DDMMYYYY),
                "ngay_chinh_thuc": new dayjs(banThans?.ban_than?.ngay_chinh_thuc).format(DATE_FORMAT.DDMMYYYY),
                "trinh_do_giao_duc_pho_thong": banThans?.ban_than?.trinh_do_giao_duc_pho_thong,
                "trinh_do_chi_huy_quan_ly": banThans?.ban_than?.trinh_do_chi_huy_quan_ly,
                "trinh_do_ly_luan_chinh_tri": banThans?.ban_than?.trinh_do_ly_luan_chinh_tri,
                "trinh_do_ly_chuyen_mon_ky_thuat": banThans?.ban_than?.trinh_do_ly_chuyen_mon_ky_thuat,
                "trinh_do_ngoai_ngu": banThans?.ban_than?.trinh_do_ngoai_ngu?.toString(),
                "qua_trinh_dao_tao": banThans?.ban_than?.qua_trinh_dao_tao,
                "di_nuoc_ngoai": banThans?.ban_than?.di_nuoc_ngoai?.toString(),
                "suc_khoe": banThans?.ban_than?.suc_khoe?.toString(),
                "danh_hieu_duoc_phong": banThans?.ban_than?.danh_hieu_duoc_phong?.toString(),
                "khen_thuong": banThans?.ban_than?.khen_thuong?.toString(),
                "ky_luat": banThans?.ban_than?.ky_luat?.toString()
        }
        dispatch(banThanSlice.actions.openTab(data));
      }, [banThans]);
    useEffect(() => {
        //dispatch(canBoCoBanSlice.actions.getCanBoCoBanById({ id: MaCanBo }));
        dispatch(
            banThanSlice.actions.getBanThans({
            ma_can_bo,
          })
        );
      }, [banThans]);
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
            <span>{selectedBanThan.ngay_thang_nam_sinh}</span>
        </Col>
        <Col span={8}>
            <span>Dân tộc: </span>
            <span>{selectedBanThan.dan_toc}</span>
        </Col>
        <Col span={8}>
            <span>Tôn giáo: </span>
            <span>{selectedBanThan.ton_giao}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Quê quán: </span>
            <span>{selectedBanThan.que_quan}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Nơi ở hiện nay: </span>
            <span>{selectedBanThan.noi_o_hien_nay}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={12}>
            <span>Ngày tham gia cách mạng: </span>
            <span>{selectedBanThan.ngay_tham_gia_cach_mang}</span>
        </Col>
        <Col span={12}>
            <span>Ngày tuyển dụng: </span>
            <span>{selectedBanThan.ngay_tuyen_dung}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={8}>
            <span>Ngày nhập ngũ: </span>
            <span>{selectedBanThan.ngay_nhap_ngu}</span>
        </Col>
        <Col span={8}>
            <span>Xuất ngũ: </span>
            <span>{selectedBanThan.ngay_xuat_ngu}</span>
        </Col>
        <Col span={8}>
            <span>Tái ngũ: </span>
            <span>{selectedBanThan.ngay_tai_ngu}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={12}>
            <span>Ngày vào Đảng: </span>
            <span>{selectedBanThan.ngay_vao_dang}</span>
        </Col>
        <Col span={12}>
            <span>Ngày chính thức: </span>
            <span>{selectedBanThan.ngay_chinh_thuc}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Giáo dục phổ thông: </span>
            <span>{selectedBanThan.trinh_do_giao_duc_pho_thong}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Chức danh khoa học, học vị cao nhất, chuyên ngành, thời gian: </span>
            <span>{selectedBanThan.dan_toc}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Chỉ huy quản lý (sơ, trung, cao cấp): </span>
            <span>{selectedBanThan.trinh_do_chi_huy_quan_ly}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Lý luận chính trị (sơ, trung, cao cấp): </span>
            <span>{selectedBanThan.trinh_do_ly_luan_chinh_tri}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Chuyên môn, kỹ thuật (sơ, trung, cao cấp): </span>
            <span>{selectedBanThan.trinh_do_ly_chuyen_mon_ky_thuat}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Ngoại ngữ, trình độ, tháng năm: </span>
            <span>{selectedBanThan.trinh_do_ngoai_ngu}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Tiếng dân tộc, mức độ nghe, nói, viết: </span>
            <span>{selectedBanThan.dan_toc}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Qua trường <span className="note">(tên trường, ngành học, chuyên ngành học, cấp học, thời gian, kết quả, loại hình đào tạo)</span>: </span>
            <span>{selectedBanThan.dan_toc}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Chiến đấu, phục vụ chiến đấu <span className="note">(thời gian; cương vị, đơn vị; địa danh, địa điểm; trực tiếp hoặc phục vụ chiến đấu; đối tượng)</span>: </span>
            <span>{selectedBanThan.dan_toc}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Đã đi nước ngoài <span className="note">(tên nước, thời gian, lý do)</span>: </span>
            <span>{selectedBanThan.di_nuoc_ngoai}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={8}>
            <span>Sức khỏe loại: </span>
            <span>{selectedBanThan.suc_khoe}</span>
        </Col>
        <Col span={8}>
            <span>Nhóm máu: </span>
            <span>{selectedBanThan.dan_toc}</span>
        </Col>
        <Col span={8}>
            <span>Bệnh chính: </span>
            <span>{selectedBanThan.dan_toc}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Thương tật <span className="note">(loại, tỷ lệ, nguyên nhân, thời gian và nơi bị thương, thời gian giám định)</span>: </span>
            <span>{selectedBanThan.dan_toc}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Danh hiệu được phong, tháng năm: </span>
            <span>{selectedBanThan.danh_hieu_duoc_phong}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Khen thưởng <span className="note">(hình thức, tháng năm, lý do)</span>: </span>
            <span>{selectedBanThan.khen_thuong}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Kỷ luật <span className="note">(hình thức, tháng năm, lý do)</span>: </span>
            <span>{selectedBanThan.ky_luat}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Trước khi nhập ngũ (tuyển dụng) làm gì? Ở đâu? Quan hệ CT-XH: </span>
            <span>{selectedBanThan.dan_toc}</span>
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Tình hình nhà ở <span className="note">(loại nhà, diện tích, hình thức sở hữu)</span>: </span>
            <span>{selectedBanThan.dan_toc}</span>
        </Col>
    </Row>
    </div>
    </Row>
  );
};
export default BanThan;
