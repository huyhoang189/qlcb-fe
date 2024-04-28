import CustomeModal from "../../../components/Form/modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import chungNhanCapSlice from "../../../toolkits/QuanLyCanBo/ChungNhanCap/slice.js"
import chungNhanSlice from "../../../toolkits/QuanLyDanhMuc/ChungNhan/slice.js";
import {useEffect} from "react";
import {ACTION_NAME} from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import dayjs from "dayjs";
import {useParams} from "react-router-dom";
import DateInput from "../../../components/Form/dateinput.jsx";
import SelectInput from "../../../components/Form/selectinput.jsx";
import ImageInput from "../../../components/Form/imageinput.jsx"
import { DATE_FORMAT } from "../../../utils/common";
import { Row, Col, } from 'antd'
const ModalItem = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const {ma_can_bo} = params
    const {chungNhans} = useSelector(state => state.chungNhans)
    const {modalActive, selectedChungNhanCap, pageSize, pageNumber} = useSelector(state => state.chungNhanCaps)
    const handleModal = (_item) => {
        dispatch(chungNhanCapSlice.actions.toggleModal(_item))
    }

    const handleRecord = (_actionName, _item) => {
        let date = new dayjs(); 
        let item = Object.assign({}, _item);
        date = date.format(DATE_FORMAT.DDMMYYYY);
        item.thoi_gian_nhan = item.thoi_gian_nhan===''?date:item.thoi_gian_nhan;
        dispatch(
            chungNhanCapSlice.actions.handleChungNhanCap({
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

    const onRecordInputChange = (key, event) => {
        if (key) {
            let clone = Object.assign({}, selectedChungNhanCap);
            clone[key] = event.target.value;
            dispatch(chungNhanCapSlice.actions.updateSelectedChungNhanCapInput(clone));
        }
    }
    const onRecordImageChange = (key, event) => {
        if (key) {
            console.log(event)
        }
    }
    const onRecordSelectInputChange = (key, event) => {
        if (key) {
            let clone = Object.assign({}, selectedChungNhanCap);
            clone[key] = event;
            dispatch(chungNhanCapSlice.actions.updateSelectedChungNhanCapInput(clone));
        }
    }
    const onRecordDateInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedChungNhanCap);
          clone[key] = event.format(DATE_FORMAT.DDMMYYYY);
          dispatch(
            chungNhanCapSlice.actions.updateSelectedChungNhanCapInput(clone)
          );
        }
      };
    //side effect
    useEffect(() => {
        dispatch(chungNhanSlice.actions.getChungNhans({
            pageSize: 1000,
            pageNumber: 1
        }))
    }, [dispatch]);

    return <CustomeModal
        open={modalActive}
        onCancel={() => handleModal(null)}
        onOk={
            selectedChungNhanCap?.id
                ? () => handleRecord(ACTION_NAME.UPDATE, selectedChungNhanCap)
                : () => handleRecord(ACTION_NAME.CREATE, selectedChungNhanCap)
        }
        title={selectedChungNhanCap?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
        okText="Chấp nhận"
        cancelText="Từ chối"

    >
        <SelectInput
            title="Chứng nhận"
            onChange={onRecordSelectInputChange}
            property={"ma_chung_nhan"}
            value={selectedChungNhanCap?.ma_chung_nhan}
            isNull={false}
            options={chungNhans.map((e) => ({
                label: e?.ten_chung_nhan,
                value: e?.id
            }))}
        />
        <DateInput
        title="Thời gian nhận"
        placeholder="Nhập vào thời gian"
        onChange={onRecordDateInputChange}
        property={"thoi_gian_nhan"}
        value={selectedChungNhanCap?.thoi_gian_nhan}
      />
        <TextInput
            title="Số chứng nhận"
            placeholder="Nhập vào số chứng nhận"
            onChange={onRecordInputChange}
            property={"so_chung_nhan"}
            value={selectedChungNhanCap?.so_chung_nhan}
        />
        <Row gutter={16} style={{ width: '100%' }}>
        <Col span={8}>
        <ImageInput
            title="Hình ảnh mặt trước"
            onChange={onRecordImageChange}
            property={"hinh_anh_mat_truoc"}
            value={selectedChungNhanCap?.hinh_anh_mat_truoc}
        />
        </Col>
        <Col span={8}>
        <ImageInput
            title="Hình ảnh mặt sau"
            onChange={onRecordImageChange}
            property={"hinh_anh_mat_sau"}
            value={selectedChungNhanCap?.hinh_anh_mat_sau}
        />
        </Col>
        </Row>
        <TextInput
            title="Ghi chú"
            placeholder="Nhập vào ghi chú"
            onChange={onRecordInputChange}
            property={"ghi_chu"}
            value={selectedChungNhanCap?.ghi_chu}
        />
    </CustomeModal>
}


export default ModalItem