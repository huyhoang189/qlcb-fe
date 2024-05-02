import CustomeModal from "../../../components/Form/modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import quanLyKhenThuongSlice from "../../../toolkits/DieuTraHinhSu/QuanLyKhenThuong/slice.js"
import canBoCoBanSlice from "../../../toolkits/QuanLyCanBo/ThongTinCoBan/slice.js";
import donViSlice from "../../../toolkits/QuanLyDanhMuc/DonVi/slice.js";
import SelectInput from "../../../components/Form/selectinput.jsx";
import {ACTION_NAME} from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import {useEffect} from "react";
import dayjs from "dayjs";
import {useParams} from "react-router-dom";
import DateInput from "../../../components/Form/dateinput.jsx";
import AutoCompleteInput from "../../../components/Form/autocomplete.jsx"
import { DATE_FORMAT, HINH_THUC_THUONG_KY_LUAT } from "../../../utils/common";
import { Row, Col } from 'antd'
const ModalItem = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const {ma_can_bo} = params
    const {modalActive, selectedQuanLyKhenThuong, pageSize, pageNumber} = useSelector(state => state.quanLyKhenThuongs)
    const { canBoCoBans } = useSelector((state) => state.canBoCoBans);
    const { donVis } = useSelector((state) => state.donVis);
    const handleModal = (_item) => {
        dispatch(quanLyKhenThuongSlice.actions.toggleModal(_item))
    }

    const handleRecord = (_actionName, _item) => {
        let date = new dayjs(); 
        let item = Object.assign({}, _item);
        date = date.format(DATE_FORMAT.DDMMYYYY);
        item.thoi_gian = item.thoi_gian===''?date:item.thoi_gian;
        dispatch(
            quanLyKhenThuongSlice.actions.handleQuanLyKhenThuong({
                item: {
                    ...item,
                    ma_can_bo
                },
                actionName: _actionName,
                pageSize: pageSize,
                pageNumber: pageNumber,

            })
        );
    }

    const onRecordSelectInputChange = (key, event) => {
        if (key) {
            let clone = Object.assign({}, selectedQuanLyKhenThuong);
            clone[key] = event;
            dispatch(quanLyKhenThuongSlice.actions.updateSelectedQuanLyKhenThuongInput(clone));
        }
    }
    const onRecordInputChange = (key, event) => {
        if (key) {
            let clone = Object.assign({}, selectedQuanLyKhenThuong);
            clone[key] = event.target.value;
            dispatch(quanLyKhenThuongSlice.actions.updateSelectedQuanLyKhenThuongInput(clone));
        }
    }
    const onRecordDateInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedQuanLyKhenThuong);
          clone[key] = event.format(DATE_FORMAT.DDMMYYYY);
          dispatch(
            quanLyKhenThuongSlice.actions.updateSelectedQuanLyKhenThuongInput(clone)
          );
        }
      };

      //side effect
    useEffect(() => {
        dispatch(canBoCoBanSlice.actions.getCanBoCoBans({
            pageSize: 1000,
            pageNumber: 1
        }))
        dispatch(donViSlice.actions.getDonVis({
            pageSize: 1000,
            pageNumber: 1
        }))
    }, [dispatch]);

    return <CustomeModal
        width={750}
        open={modalActive}
        onCancel={() => handleModal(null)}
        onOk={
            selectedQuanLyKhenThuong?.id
                ? () => handleRecord(ACTION_NAME.UPDATE, selectedQuanLyKhenThuong)
                : () => handleRecord(ACTION_NAME.CREATE, selectedQuanLyKhenThuong)
        }
        title={selectedQuanLyKhenThuong?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
        okText="Chấp nhận"
        cancelText="Từ chối"

    >
        <Row gutter={16} style={{ width: '100%' }}>
        <Col span={12}>
        <TextInput
            title="Quyết định"
            placeholder="Nhập vào số quyết định"
            onChange={onRecordInputChange}
            property={"quyet_dinh_so"}
            value={selectedQuanLyKhenThuong?.quyet_dinh_so}
        />
        <SelectInput
            title="Hình thức"
            onChange={onRecordSelectInputChange}
            property={"hinh_thuc"}
            value={selectedQuanLyKhenThuong?.hinh_thuc}
            isNull={false}
            options={HINH_THUC_THUONG_KY_LUAT}
        />
        <TextInput
            title="Nội dụng"
            placeholder="Nhập vào nội dụng"
            onChange={onRecordInputChange}
            property={"noi_dung"}
            value={selectedQuanLyKhenThuong?.noi_dung}
        />
        <DateInput
        title="Thời gian"
        placeholder="Nhập vào thời gian"
        onChange={onRecordDateInputChange}
        property={"thoi_gian"}
        value={selectedQuanLyKhenThuong?.thoi_gian}
      />
      <TextInput
            title="Lý do"
            placeholder="Nhập vào lý do"
            onChange={onRecordInputChange}
            property={"ly_do"}
            value={selectedQuanLyKhenThuong?.ly_do}
        />
        <TextInput
            title="Ghi chú"
            placeholder="Nhập vào ghi chú"
            onChange={onRecordInputChange}
            property={"ghi_chu"}
            value={selectedQuanLyKhenThuong?.ghi_chu}
        />
        </Col>
        <Col span={12}>
        <AutoCompleteInput
            title="Danh sách"
            options={canBoCoBans.map((e) => ({
                label: e?.so_hieu_quan_nhan + " -- "+ e?.ho_ten_khai_sinh + " -- "+ e?.don_vi?.ten_don_vi,
                value: e?.id
            }))}
        />
        </Col>
        </Row>
    </CustomeModal>
}


export default ModalItem