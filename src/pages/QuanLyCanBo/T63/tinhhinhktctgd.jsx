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
    ButtonBasic,   
  } from "../../../components/Button/index.jsx";
  import {
    EditOutlined,
    PlusOutlined,
  } from "@ant-design/icons";
import Header from "../../../components/Table/header.jsx";
import './index.css'
import tinhHinhKTCTGDSlice from "../../../toolkits/T63/TinhHinhKTCTGD/slice.js";
const TinhHinhKTCTGD = () => {
    const params = useParams();
    const { ma_can_bo } = params;
    const { tinhHinhKTCTGDs, selectedTinhHinhKTCTGD } =
    useSelector((state) => state.tinhHinhKTCTGDs);
    const dispatch = useDispatch();
    //let dataTab;
    const onRecordInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedTinhHinhKTCTGD);
          clone[key] = event.target.value;
          dispatch(tinhHinhKTCTGDSlice.actions.updateSelectedTinhHinhKTCTGDInput(clone));
        }
      };
      const onRecordDateInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedTinhHinhKTCTGD);
          clone[key] = event.format(DATE_FORMAT.YYYY);
          dispatch(tinhHinhKTCTGDSlice.actions.updateSelectedTinhHinhKTCTGDInput(clone));
        }
      };
      const handleRecord = (_actionName, _item) => {
        let date = new dayjs(); 
        let item = Object.assign({}, _item);
        let year = date.format(DATE_FORMAT.YYYY);
        item.cha_nam_sinh = item.cha_nam_sinh === "" ? year : item.cha_nam_sinh;
        item.me_nam_sinh = item.me_nam_sinh === "" ? year : item.me_nam_sinh;
        dispatch(
          tinhHinhKTCTGDSlice.actions.handleTinhHinhKTCTGD({
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
        //dispatch(canBoCoBanSlice.actions.getCanBoCoBanById({ id: MaCanBo }));
        dispatch(
          tinhHinhKTCTGDSlice.actions.getTinhHinhKTCTGDs({
            pageSize: 10,
            pageNumber: 1,
            ma_can_bo,
          })
        );
      }, [dispatch]);
    useEffect(() => {
        if(tinhHinhKTCTGDs.length>0)
        dispatch(tinhHinhKTCTGDSlice.actions.openTab(tinhHinhKTCTGDs[0]));
      }, [tinhHinhKTCTGDs]);
  return (
    <Row
    style={{ width: "100%", padding: '0 48px'}}
    >
    <div style={{ width: "100%", textAlign:"center"}}>
        <Header>
            <span className="header" style={{fontSize:"16px"}}>II. TÌNH HÌNH KT – CT CỦA GIA ĐÌNH</span>
            {
              selectedTinhHinhKTCTGD?.ma_can_bo?
              <ButtonBasic 
            text={"Cập nhật"}
            color={"#fba108"}
            icon = {<EditOutlined />}
            onClick={() => handleRecord(ACTION_NAME.UPDATE, selectedTinhHinhKTCTGD)}
            />:
            <ButtonBasic 
            text={"Thêm mới"}
            color={"#00569e"}
            icon = {<PlusOutlined />}
            onClick={() => handleRecord(ACTION_NAME.CREATE, selectedTinhHinhKTCTGD)}
            />
            }
          </Header>
    </div>
    <div className="info" style={{ width: "100%" }}>
    <Row gutter={8}>
        <Col span={8}>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Họ tên cha:"
            placeholder="Nhập vào họ tên cha"
            onChange={onRecordInputChange}
            property={"cha_ten"}
            value={selectedTinhHinhKTCTGD?.cha_ten}
        />
        </Col>
        <Col span={8}>
      <DateInput
        direction=""
        boldText={false}
        align={"center"}
        title="Sinh:"
        format={DATE_FORMAT.YYYY}
        placeholder="Nhập vào năm sinh"
        onChange={onRecordDateInputChange}
        property={"cha_nam_sinh"}
        picker="year"
        value={selectedTinhHinhKTCTGD?.cha_nam_sinh}
      />
        </Col>
        <Col span={8}>
            {/* <span>Nghề nghiệp: </span>
            <span>Làm Ruộng</span> */}
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Nghề nghiệp:"
            placeholder="Nhập vào nghề nghiệp"
            onChange={onRecordInputChange}
            property={"cha_nghe_nghiep"}
            value={selectedTinhHinhKTCTGD?.cha_nghe_nghiep}
        />
        </Col>
    </Row>
    <Row gutter={8}>
    <Col span={8}>
            {/* <span>Họ tên mẹ: </span>
            <span>Nguyễn Lệ N</span> */}
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Họ tên mẹ:"
            placeholder="Nhập vào họ tên mẹ"
            onChange={onRecordInputChange}
            property={"me_ten"}
            value={selectedTinhHinhKTCTGD?.me_ten}
        />
        </Col>
        <Col span={8}>
        <DateInput
        direction=""
        boldText={false}
        align={"center"}
        title="Sinh:"
        format={DATE_FORMAT.YYYY}
        placeholder="Nhập vào năm sinh"
        onChange={onRecordDateInputChange}
        property={"me_nam_sinh"}
        picker="year"
        value={selectedTinhHinhKTCTGD?.me_nam_sinh}
      />
        </Col>
        <Col span={8}>
            {/* <span>Nghề nghiệp: </span>
            <span>Làm Ruộng</span> */}
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Nghề nghiệp:"
            placeholder="Nhập vào nghề nghiệp"
            onChange={onRecordInputChange}
            property={"me_nghe_nghiep"}
            value={selectedTinhHinhKTCTGD?.me_nghe_nghiep}
            />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            {/* <span>Thành phần gia đình: </span>
            <span>Bần nông</span> */}
             <TextInput
             direction=""
             align={"center"}
             boldText={false}
            title="Thành phần gia đình:"
            placeholder="Nhập vào thành phần gia đình"
            onChange={onRecordInputChange}
            property={"thanh_phan_gia_dinh"}
            value={selectedTinhHinhKTCTGD?.thanh_phan_gia_dinh}
            />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            {/* <span>Quê quán: </span>
            <span>Xuân Hòa, Nam Đàn, Nghệ An</span> */}
             <TextInput
             direction=""
             align={"center"}
             boldText={false}
            title="Quê quán:"
            placeholder="Nhập vào quê quán"
            onChange={onRecordInputChange}
            property={"que_quan"}
            value={selectedTinhHinhKTCTGD?.que_quan}
            />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            {/* <span>Nơi ở hiện nay của gia đình: </span>
            <span>Xuân Hòa, Nam Đàn, Nghệ An</span> */}
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Nơi ở hiện nay của gia đình:"
            placeholder="Nhập vào chỗ ở hiện nay"
            onChange={onRecordInputChange}
            property={"cho_o_hien_nay"}
            value={selectedTinhHinhKTCTGD?.cho_o_hien_nay}
            />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            {/* <span>Cha mẹ sinh được : 4 người con (1 trai, 3 gái ),  đồng chí : Trang,  là thứ : 1	: </span>
            <span></span> */}
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Cha mẹ sinh được:"
            placeholder="Nhập vào tình trạng gia đình"
            onChange={onRecordInputChange}
            property={"tinh_trang_gia_dinh"}
            value={selectedTinhHinhKTCTGD?.tinh_trang_gia_dinh}
            />
            
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span className="header">Tình hình KT – CT của gia đình: </span>  
        </Col>
    </Row>
    <Row gutter={8}>
    {/* <span>- Kinh tế: </span> */}
    <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="- Kinh tế:"
            placeholder="Nhập vào tình hình kinh tế"
            onChange={onRecordInputChange}
            property={"tinh_hinh_kinh_te"}
            value={selectedTinhHinhKTCTGD?.tinh_hinh_kinh_te}
            />
    </Row>
    <Row gutter={8}>
    {/* <span>- Chính trị: </span> */}
    <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="- Chính trị:"
            placeholder="Nhập vào chỗ ở tình hình chính trí"
            onChange={onRecordInputChange}
            property={"tinh_hinh_chinh_tri"}
            value={selectedTinhHinhKTCTGD?.tinh_hinh_chinh_tri}
            />
    </Row>
    </div>
    </Row>
  );
};
TinhHinhKTCTGD.propTypes = {
    MaCanBo: PropTypes.string,
  };

export default TinhHinhKTCTGD;