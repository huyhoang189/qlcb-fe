import { Row, Col} from "antd";
import { useEffect} from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../../components/Form/textinput";
import DateInput from "../../../components/Form/dateinput";
import { ACTION_NAME, DATE_FORMAT } from "../../../utils/common.js";
import dayjs from "dayjs";
import canBoCoBanSlice from "../../../toolkits/QuanLyCanBo/ThongTinCoBan/slice.js";
import { useParams } from "react-router-dom";
import {
    ButtonBasic,   
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
    const { selectedCanBoCoBan } = useSelector((state) => state.canBoCoBans);
    const dispatch = useDispatch();
    const get_day_of_time = (d1, d2) => {
        let ms1 = new Date(d1).getTime();
        let ms2 = new Date(d2).getTime();
        return Math.ceil((ms2 - ms1) / (24*60*60*1000*30));
    };
    const onRecordInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedBanThan);
          clone[key] = event.target.value;
          dispatch(banThanSlice.actions.updateSelectedBanThanInput(clone));
        }
      };
      const onRecordDateInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedBanThan);
          clone[key] = event.format(DATE_FORMAT.YYYYMMDD);
          dispatch(
            banThanSlice.actions.updateSelectedBanThanInput(clone)
          );
        }
      };
    const handleRecord = (_actionName, _item) => {
        let date = new dayjs(); 
        let item = Object.assign({}, _item);
        date = date.format(DATE_FORMAT.YYYYMMDD);
        item.ngay_thang_nam_sinh = item.ngay_thang_nam_sinh===''?date:item.ngay_thang_nam_sinh;
        item.ngay_tham_gia_cach_mang = item.ngay_tham_gia_cach_mang===''?date:item.ngay_tham_gia_cach_mang;
        item.ngay_tuyen_dung = item.ngay_tuyen_dung===''?date:item.ngay_tuyen_dung;
        item.ngay_nhap_ngu = item.ngay_nhap_ngu===''?date:item.ngay_nhap_ngu;
        item.ngay_xuat_ngu = item.ngay_xuat_ngu===''?date:item.ngay_xuat_ngu;
        item.ngay_tai_ngu = item.ngay_tai_ngu===''?date:item.ngay_tai_ngu;
        item.ngay_vao_dang = item.ngay_vao_dang===''?date:item.ngay_vao_dang;
        item.ngay_chinh_thuc = item.ngay_chinh_thuc===''?date:item.ngay_chinh_thuc;
        item = {...item, ma_don_vi_hien_tai: selectedCanBoCoBan.ma_don_vi_hien_tai}
        dispatch(
            banThanSlice.actions.handleBanThan({
                item: {
                    ...item,
                    ma_can_bo
                },
                actionName: _actionName,
                pageSize: 10,
                pageNumber: 1,

            })
        );
    }
    useEffect(() => {
        if(banThans)
        {
        let data = {
                "id": banThans?.id,
                "so_hieu_quan_nhan": banThans?.ban_than?.so_hieu_quan_nhan,
                "ho_ten_khai_sinh": banThans?.ban_than?.ho_ten_khai_sinh,
                "ho_ten_khac": banThans?.ban_than?.ho_ten_khac,
                "gioi_tinh": banThans?.ban_than?.gioi_tinh,
                "cap_bac": banThans?.ban_than?.cap_bac,
                "ngay_thang_nam_sinh": new dayjs(banThans?.ban_than?.ngay_thang_nam_sinh).format(DATE_FORMAT.YYYYMMDD),
                "dan_toc": banThans?.ban_than?.dan_toc,
                "ton_giao": banThans?.ban_than?.ton_giao,
                "que_quan": banThans?.ban_than?.que_quan,
                "noi_o_hien_nay": banThans?.ban_than?.noi_o_hien_nay,
                "ngay_tham_gia_cach_mang": new dayjs(banThans?.ban_than?.ngay_tham_gia_cach_mang).format(DATE_FORMAT.YYYYMMDD),
                "ngay_tuyen_dung": new dayjs(banThans?.ban_than?.ngay_tuyen_dung).format(DATE_FORMAT.YYYYMMDD),
                "ngay_nhap_ngu": new dayjs(banThans?.ban_than?.ngay_nhap_ngu).format(DATE_FORMAT.YYYYMMDD),
                "ngay_xuat_ngu": new dayjs(banThans?.ban_than?.ngay_xuat_ngu).format(DATE_FORMAT.YYYYMMDD),
                "ngay_tai_ngu": new dayjs(banThans?.ban_than?.ngay_tai_ngu).format(DATE_FORMAT.YYYYMMDD),
                "ngay_vao_dang": new dayjs(banThans?.ban_than?.ngay_vao_dang).format(DATE_FORMAT.YYYYMMDD),
                "ngay_chinh_thuc": new dayjs(banThans?.ban_than?.ngay_chinh_thuc).format(DATE_FORMAT.YYYYMMDD),
                "trinh_do_giao_duc_pho_thong": banThans?.ban_than?.trinh_do_giao_duc_pho_thong,
                "trinh_do_chi_huy_quan_ly": banThans?.ban_than?.trinh_do_chi_huy_quan_ly,
                "trinh_do_ly_luan_chinh_tri": banThans?.ban_than?.trinh_do_ly_luan_chinh_tri,
                "trinh_do_ly_chuyen_mon_ky_thuat": banThans?.ban_than?.trinh_do_ly_chuyen_mon_ky_thuat,
                "ma_don_vi_hien_tai":banThans?.ban_than?.ma_don_vi_hien_tai,
                "trinh_do_ngoai_ngu": banThans?.ban_than?.trinh_do_ngoai_ngu?.map(e => (
                    e.ngoai_ngu?.ten_ngoai_ngu+","+e.trinh_do+","+new dayjs(e.thoi_gian).format(DATE_FORMAT.YYYY)
                )).toString(),
                "qua_trinh_dao_tao": banThans?.ban_than?.qua_trinh_dao_tao.map(e => (
                    e.truong_hoc?.ten_truong+", "+e.chuyen_nganh?.ten+", "+get_day_of_time(e.thoi_gian_bat_dau, e.thoi_gian_ket_thuc)+"tháng, "+e.xep_loai+", "+e.loai_hinh_dao_tao?.ten+"\\"
                )).toString(),
                "di_nuoc_ngoai": banThans?.ban_than?.di_nuoc_ngoai?.map(e => (
                    e?.ten_nuoc+","+get_day_of_time(e?.thoi_gian_bat_dau, e?.thoi_gian_ket_thuc)+"tháng,"+e?.ly_do
                )).toString(),
                "suc_khoe": banThans?.ban_than?.suc_khoe?.map(e => (
                    e.noi_dung
                )).toString(),
                "danh_hieu_duoc_phong": banThans?.ban_than?.danh_hieu_duoc_phong?.map(e => (
                    e.quan_ham+", "+new dayjs(e.thoi_gian_nhan).format(DATE_FORMAT.YYYY)
                )).toString(),
                "khen_thuong": banThans?.ban_than?.khen_thuong?.map(e => (
                    e.noi_dung
                )).toString(),
                "ky_luat": banThans?.ban_than?.ky_luat?.map(e => (
                    e.noi_dung
                )).toString(),
        }
           
        dispatch(banThanSlice.actions.openTab(data));
    }
      }, [banThans]);
    useEffect(() => {
        dispatch(canBoCoBanSlice.actions.getCanBoCoBanById({ id: ma_can_bo }));
        dispatch(
            banThanSlice.actions.getBanThans({
            ma_can_bo,
          })
        );
      }, [dispatch]);
  return (
    <Row
    style={{ width: "100%", padding: '0 48px'}}
    >
    <div style={{ width: "100%", textAlign:"center"}}>
    <Header>
            <span className="header" style={{fontSize:"16px"}}>I. BẢN THÂN</span>
            
              <ButtonBasic 
            text={"Cập nhật"}
            color={"#fba108"}
            icon = {<EditOutlined />}
            onClick={() => handleRecord(ACTION_NAME.UPDATE, selectedBanThan)}
            />
            {/* // <ButtonBasic 
            // text={"Thêm mới"}
            // color={"#00569e"}
            // icon = {<PlusOutlined />}
            // onClick={() => handleRecord(ACTION_NAME.CREATE, selectedBanThan)}
            // /> */}
            
          </Header>
    </div>
    <div className="info" style={{ width: "100%" }}>
    <Row gutter={8}>
        <Col span={8}>
            <DateInput
            direction=""
            boldText={false}
            align={"center"}
            title="Sinh ngày:"
            placeholder="Nhập vào ngày sinh"
            onChange={onRecordDateInputChange}
            property={"ngay_thang_nam_sinh"}
            value={selectedBanThan?.ngay_thang_nam_sinh}
      />
        </Col>
        <Col span={8}>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Dân tộc:"
            placeholder="Nhập vào dân tộc"
            onChange={onRecordInputChange}
            property={"dan_toc"}
            value={selectedBanThan?.dan_toc}
        />
        </Col>
        <Col span={8}>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Tôn giáo:"
            placeholder="Nhập vào tôn giáo"
            onChange={onRecordInputChange}
            property={"ton_giao"}
            value={selectedBanThan?.ton_giao}
        />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Quê quán:"
            placeholder="Nhập vào quê quán"
            onChange={onRecordInputChange}
            property={"que_quan"}
            value={selectedBanThan?.que_quan}
        />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Nơi ở hiện nay:"
            placeholder="Nhập vào nơi ở hiện nay"
            onChange={onRecordInputChange}
            property={"noi_o_hien_nay"}
            value={selectedBanThan?.noi_o_hien_nay}
        />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={12}>
            <DateInput
            direction=""
            boldText={false}
            align={"center"}
            title="Ngày tham gia cách mạng:"
            placeholder="Nhập vào ngày"
            onChange={onRecordDateInputChange}
            property={"ngay_tham_gia_cach_mang"}
            value={selectedBanThan?.ngay_tham_gia_cach_mang}
      />
        </Col>
        <Col span={12}>
            <DateInput
            direction=""
            boldText={false}
            align={"center"}
            title="Ngày tuyển dụng:"
            placeholder="Nhập vào ngày"
            onChange={onRecordDateInputChange}
            property={"ngay_tuyen_dung"}
            value={selectedBanThan?.ngay_tuyen_dung}
      />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={8}>
            <DateInput
            direction=""
            boldText={false}
            align={"center"}
            title="Ngày nhập ngũ:"
            placeholder="Nhập vào ngày"
            onChange={onRecordDateInputChange}
            property={"ngay_nhap_ngu"}
            value={selectedBanThan?.ngay_nhap_ngu}
      />
        </Col>
        <Col span={8}>
            <DateInput
            direction=""
            boldText={false}
            align={"center"}
            title="Xuất ngũ:"
            placeholder="Nhập vào ngày"
            onChange={onRecordDateInputChange}
            property={"ngay_xuat_ngu"}
            value={selectedBanThan?.ngay_xuat_ngu}
      />
        </Col>
        <Col span={8}>
            <DateInput
            direction=""
            boldText={false}
            align={"center"}
            title="Tái ngũ:"
            placeholder="Nhập vào ngày"
            onChange={onRecordDateInputChange}
            property={"ngay_tai_ngu"}
            value={selectedBanThan?.ngay_tai_ngu}
      />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={12}>
            <DateInput
            direction=""
            boldText={false}
            align={"center"}
            title="Ngày vào Đảng:"
            placeholder="Nhập vào ngày"
            onChange={onRecordDateInputChange}
            property={"ngay_vao_dang"}
            value={selectedBanThan?.ngay_vao_dang}
      />
        </Col>
        <Col span={12}>
            <DateInput
            direction=""
            boldText={false}
            align={"center"}
            title="Ngày chính thức:"
            placeholder="Nhập vào ngày"
            onChange={onRecordDateInputChange}
            property={"ngay_chinh_thuc"}
            value={selectedBanThan?.ngay_chinh_thuc}
      />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Giáo dục phổ thông:"
            placeholder="Nhập vào giáo dục phổ thông:"
            onChange={onRecordInputChange}
            property={"trinh_do_giao_duc_pho_thong"}
            value={selectedBanThan?.trinh_do_giao_duc_pho_thong}
        />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Chức danh khoa học, học vị cao nhất, chuyên ngành, thời gian:"
            placeholder="Nhập vào chức danh khoa học:"
            onChange={onRecordInputChange}
            property={"chuc_danh_khoa_hoc"}
            value={selectedBanThan?.chuc_danh_khoa_hoc}
        />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Chỉ huy quản lý (sơ, trung, cao cấp):"
            placeholder="Nhập vào chỉ huy quản lý"
            onChange={onRecordInputChange}
            property={"trinh_do_chi_huy_quan_ly"}
            value={selectedBanThan?.trinh_do_chi_huy_quan_ly}
        />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Lý luận chính trị (sơ, trung, cao cấp):"
            placeholder="Nhập vào lý luận chính trị"
            onChange={onRecordInputChange}
            property={"trinh_do_ly_luan_chinh_tri"}
            value={selectedBanThan?.trinh_do_ly_luan_chinh_tri}
        />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Chuyên môn, kỹ thuật (sơ, trung, cao cấp):"
            placeholder="Nhập vào chuyên môn, kỹ thuật"
            onChange={onRecordInputChange}
            property={"trinh_do_ly_chuyen_mon_ky_thuat"}
            value={selectedBanThan?.trinh_do_ly_chuyen_mon_ky_thuat}
        />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Ngoại ngữ, trình độ, tháng năm:</span>
            <span>{selectedBanThan.trinh_do_ngoai_ngu}</span>
            {/* <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Ngoại ngữ, trình độ, tháng năm:"
            placeholder="Nhập vào ngoại ngữ"
            onChange={onRecordInputChange}
            property={"trinh_do_ngoai_ngu"}
            value={selectedBanThan?.trinh_do_ngoai_ngu}
        /> */}
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Tiếng dân tộc, mức độ nghe, nói, viết:"
            placeholder="Nhập vào tiếng dân tộc"
            onChange={onRecordInputChange}
            property={"tieng_dan_toc"}
            value={selectedBanThan?.tieng_dan_toc}
        />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Qua trường <span className="note">(tên trường, ngành học, chuyên ngành học, cấp học, thời gian, kết quả, loại hình đào tạo)</span>: </span>
            <span>{selectedBanThan.qua_trinh_dao_tao}</span>
            {/* <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title=""
            placeholder=""
            onChange={onRecordInputChange}
            property={"qua_truong"}
            value={selectedBanThan?.qua_truong}
        /> */}
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Chiến đấu, phục vụ chiến đấu <span className="note">(thời gian; cương vị, đơn vị; địa danh, địa điểm; trực tiếp hoặc phục vụ chiến đấu; đối tượng)</span>: </span>
            <span>{selectedBanThan.dan_toc}</span>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title=""
            placeholder="Nhập vào tiếng dân tộc"
            onChange={onRecordInputChange}
            property={"chien_dau_phuc_vu"}
            value={selectedBanThan?.chien_dau_phuc_vu}
        />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Đã đi nước ngoài <span className="note">(tên nước, thời gian, lý do)</span>: </span>
            <span>{selectedBanThan.di_nuoc_ngoai}</span>
            {/* <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title=""
            placeholder="Nhập vào tiếng dân tộc"
            onChange={onRecordInputChange}
            property={"di_nuoc_ngoai"}
            value={selectedBanThan?.di_nuoc_ngoai}
        /> */}
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={8}>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Sức khỏe loại:"
            placeholder="Nhập vào sức khỏe"
            onChange={onRecordInputChange}
            property={"suc_khoe"}
            value={selectedBanThan?.suc_khoe}
        />
        </Col>
        <Col span={8}>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Nhóm máu:"
            placeholder="Nhập vào nhóm máu"
            onChange={onRecordInputChange}
            property={"nhom_mau"}
            value={selectedBanThan?.nhom_mau}
        />
        </Col>
        <Col span={8}>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Bệnh chính:"
            placeholder="Nhập vào bệnh chính"
            onChange={onRecordInputChange}
            property={"benh_chinh"}
            value={selectedBanThan?.benh_chinh}
        />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Thương tật <span className="note">(loại, tỷ lệ, nguyên nhân, thời gian và nơi bị thương, thời gian giám định)</span>: </span>
            <span>{selectedBanThan.dan_toc}</span>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title=""
            placeholder="Nhập vào thương tật"
            onChange={onRecordInputChange}
            property={"thuong_tat"}
            value={selectedBanThan?.thuong_tat}
        />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Danh hiệu được phong, tháng năm:</span>
            <span>{selectedBanThan.danh_hieu_duoc_phong}</span>
            {/* <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Danh hiệu được phong, tháng năm:"
            placeholder="Nhập vào Danh hiệu được phong, tháng năm"
            onChange={onRecordInputChange}
            property={"danh_hieu_duoc_phong"}
            value={selectedBanThan?.danh_hieu_duoc_phong}
        /> */}
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Khen thưởng <span className="note">(hình thức, tháng năm, lý do)</span>: </span>
            <span>{selectedBanThan.khen_thuong}</span>
            {/* <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title=""
            placeholder="Nhập vào khen thưởng"
            onChange={onRecordInputChange}
            property={"khen_thuong"}
            value={selectedBanThan?.khen_thuong}
        /> */}
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Kỷ luật <span className="note">(hình thức, tháng năm, lý do)</span>: </span>
            <span>{selectedBanThan.ky_luat}</span>
            {/* <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title=""
            placeholder="Nhập vào Kỷ luật"
            onChange={onRecordInputChange}
            property={"ky_luat"}
            value={selectedBanThan?.ky_luat}
        /> */}
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Trước khi nhập ngũ (tuyển dụng) làm gì? Ở đâu? Quan hệ CT-XH: </span>
            <span>{selectedBanThan.dan_toc}</span>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title=""
            placeholder=""
            onChange={onRecordInputChange}
            property={"truoc_khi_nhap_ngu"}
            value={selectedBanThan?.truoc_khi_nhap_ngu}
        />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Tình hình nhà ở <span className="note">(loại nhà, diện tích, hình thức sở hữu)</span>: </span>
            <span>{selectedBanThan.dan_toc}</span>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title=""
            placeholder="tình hình nhà ở"
            onChange={onRecordInputChange}
            property={"tinh_hinh_nha_o"}
            value={selectedBanThan?.tinh_hinh_nha_o}
        />
        </Col>
    </Row>
    </div>
    </Row>
  );
};
export default BanThan;
