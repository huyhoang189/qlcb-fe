import { Row, Col} from "antd";
import { useEffect} from "react";
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
import tinhHinhKTCTVCSlice from "../../../toolkits/T63/TinhHinhKTCTVC/slice.js";
import tinhHinhKTCTCCSlice from "../../../toolkits/T63/TinhHinhKTCTCC/slice.js";
const TinhHinhKTCTVC = () => {
    const params = useParams();
    const { ma_can_bo } = params;
    const { tinhHinhKTCTVCs, selectedTinhHinhKTCTVC } =
    useSelector((state) => state.tinhHinhKTCTVCs);
    const { tinhHinhKTCTCCs, selectedTinhHinhKTCTCC } =
    useSelector((state) => state.tinhHinhKTCTCCs);
    const dispatch = useDispatch();
    //let dataTab;
    const onRecordInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedTinhHinhKTCTVC);
          clone[key] = event.target.value;
          dispatch(tinhHinhKTCTVCSlice.actions.updateSelectedTinhHinhKTCTVCInput(clone));
        }
      };
      const onRecordDateInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedTinhHinhKTCTVC);
          clone[key] = event.format(DATE_FORMAT.YYYY);
          dispatch(tinhHinhKTCTVCSlice.actions.updateSelectedTinhHinhKTCTVCInput(clone));
        }
      };
      const handleRecord = (_actionName, _item) => {
        let date = new dayjs(); 
        let item = Object.assign({}, _item);
        let year = date.format(DATE_FORMAT.YYYY);
        item.cha_nam_sinh = item.cha_nam_sinh === "" ? year : item.cha_nam_sinh;
        item.me_nam_sinh = item.me_nam_sinh === "" ? year : item.me_nam_sinh;
        item.vo_chong_nam_sinh = item.vo_chong_nam_sinh === "" ? year : item.vo_chong_nam_sinh;
        dispatch(
          tinhHinhKTCTVCSlice.actions.handleTinhHinhKTCTVC({
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
  //side effect
//   useEffect(() => {
//     dispatch(canBoCoBanSlice.actions.getCanBoCoBanById({ id: ma_can_bo }));
//   }, [dispatch]);
    useEffect(() => {
        //dispatch(canBoCoBanSlice.actions.getCanBoCoBanById({ id: MaCanBo }));
        dispatch(
          tinhHinhKTCTVCSlice.actions.getTinhHinhKTCTVCs({
            pageSize: 10,
            pageNumber: 1,
            ma_can_bo,
          })
        );
        dispatch(
            tinhHinhKTCTCCSlice.actions.getTinhHinhKTCTCCs({
              pageSize: 10,
              pageNumber: 1,
              ma_can_bo,
            })
          );
      }, [dispatch]);
    useEffect(() => {
        if(tinhHinhKTCTVCs.length>0)
        dispatch(tinhHinhKTCTVCSlice.actions.openTab(tinhHinhKTCTVCs[0]));
      }, [tinhHinhKTCTVCs]);
      useEffect(() => {
        if(tinhHinhKTCTCCs.length>0)
        dispatch(tinhHinhKTCTCCSlice.actions.openTab(tinhHinhKTCTCCs[0]));
      }, [tinhHinhKTCTCCs]);
  return (
    <Row
    style={{ width: "100%", padding: '0 48px'}}
    >
    <div style={{ width: "100%", textAlign:"center"}}>
    <Header>
            <span className="header" style={{fontSize:"16px"}}>III. TÌNH HÌNH KT – CT CỦA GIA ĐÌNH VỢ, VỢ (CHỒNG)</span>
            <CreateButton 
            text={selectedTinhHinhKTCTVC?.ma_can_bo?"Cập nhật":"Thêm mới"}
            color={selectedTinhHinhKTCTVC?.ma_can_bo?"#fba108":"#00569e"}
            icon = {selectedTinhHinhKTCTVC?<EditOutlined />:<PlusOutlined />}
            onClick={selectedTinhHinhKTCTVC?.ma_can_bo
              ? () => handleRecord(ACTION_NAME.UPDATE, selectedTinhHinhKTCTVC)
              : () => handleRecord(ACTION_NAME.CREATE, selectedTinhHinhKTCTVC)}
            />
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
            value={selectedTinhHinhKTCTVC?.cha_ten}
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
        value={selectedTinhHinhKTCTVC?.cha_nam_sinh}
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
            value={selectedTinhHinhKTCTVC?.cha_nghe_nghiep}
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
            value={selectedTinhHinhKTCTVC?.me_ten}
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
        value={selectedTinhHinhKTCTVC?.me_nam_sinh}
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
            value={selectedTinhHinhKTCTVC?.me_nghe_nghiep}
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
            value={selectedTinhHinhKTCTVC?.thanh_phan_gia_dinh}
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
            value={selectedTinhHinhKTCTVC?.que_quan}
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
            value={selectedTinhHinhKTCTVC?.cho_o_hien_nay}
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
            value={selectedTinhHinhKTCTVC?.tinh_trang_gia_dinh}
            />
            
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span className="header">Tình hình KT – CT của gia đình vợ (chồng), bản thân vợ (chồng): </span>
            <span></span>
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
            value={selectedTinhHinhKTCTVC?.tinh_hinh_kinh_te}
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
            value={selectedTinhHinhKTCTVC?.tinh_hinh_chinh_tri}
            />
    </Row>
    <Row gutter={8}>
        <Col span={8}>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Họ tên vợ (chồng ):"
            placeholder="Nhập vào họ tên vợ (chồng )"
            onChange={onRecordInputChange}
            property={"vo_chong_ten"}
            value={selectedTinhHinhKTCTVC?.vo_chong_ten}
        />
        </Col>
        <Col span={8}>
      <DateInput
        direction=""
        boldText={false}
        align={"center"}
        title="Năm sinh:"
        format={DATE_FORMAT.YYYY}
        placeholder="Nhập vào năm sinh"
        onChange={onRecordDateInputChange}
        property={"vo_chong_nam_sinh"}
        picker="year"
        value={selectedTinhHinhKTCTVC?.vo_chong_nam_sinh}
      />
        </Col>
        <Col span={8}>
            <TextInput
            direction=""
            align={"center"}
            boldText={false}
            title="Nghề nghiệp:"
            placeholder="Nhập vào nghề nghiệp"
            onChange={onRecordInputChange}
            property={"vo_chong_nghe_nghiep"}
            value={selectedTinhHinhKTCTVC?.vo_chong_nghe_nghiep}
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
            title="Nơi ở hiện nay:"
            placeholder="Nhập vào Nơi ở hiện nay"
            onChange={onRecordInputChange}
            property={"vo_chong_noi_o_hien_ngay"}
            value={selectedTinhHinhKTCTVC?.vo_chong_noi_o_hien_ngay}
            />
        </Col>
    </Row>
    <Row gutter={8}>
        <Col span={24}>
            <span>Họ tên, năm sinh, nghề nghiệp các con: </span>
            {selectedTinhHinhKTCTCC.length>0 && selectedTinhHinhKTCTCC.forEach(e => {
                <Row gutter={8}>
                <Col span={8}>
                    <TextInput
                    direction=""
                    align={"center"}
                    boldText={false}
                    title="Họ tên:"
                    placeholder="Nhập vào họ tên"
                    onChange={onRecordInputChange}
                    property={"ten"}
                    value={e?.ten}
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
                property={"nam_sinh"}
                picker="year"
                value={e?.nam_sinh}
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
                    property={"nghe_nghiep"}
                    value={e?.nghe_nghiep}
                />
                </Col>
            </Row>
            })}
            
        </Col>
    </Row>
    </div>
    </Row>
  );
};

export default TinhHinhKTCTVC;