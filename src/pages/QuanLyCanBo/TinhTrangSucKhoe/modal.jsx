import CustomeModal from "../../../components/Form/modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import tinhTrangSucKhoeSlice from "../../../toolkits/QuanLyCanBo/TinhTrangSucKhoe/slice.js"
import {ACTION_NAME} from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import {useEffect} from "react";
import dayjs from "dayjs";
import {useParams} from "react-router-dom";
import SelectInput from "../../../components/Form/selectinput.jsx";
import { DATE_FORMAT } from "../../../utils/common";
const ModalItem = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const {ma_can_bo} = params
    const {modalActive, selectedTinhTrangSucKhoe, pageSize, pageNumber} = useSelector(state => state.tinhTrangSucKhoes)
    const handleModal = (_item) => {
        dispatch(tinhTrangSucKhoeSlice.actions.toggleModal(_item))
    }

    const handleRecord = (_actionName, _item) => {
        let date = new dayjs(); 
        let item = Object.assign({}, _item);
        date = date.format(DATE_FORMAT.DDMMYYYY);
        item.thoi_gian = item.thoi_gian===''?date:item.thoi_gian;
        dispatch(
            tinhTrangSucKhoeSlice.actions.handleTinhTrangSucKhoe({
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
            let clone = Object.assign({}, selectedTinhTrangSucKhoe);
            clone[key] = event.target.value;
            dispatch(tinhTrangSucKhoeSlice.actions.updateSelectedTinhTrangSucKhoeInput(clone));
        }
    }
    const onRecordSelectInputChange = (key, event) => {
        if (key) {
            let clone = Object.assign({}, selectedTinhTrangSucKhoe);
            clone[key] = event;
            dispatch(tinhTrangSucKhoeSlice.actions.updateSelectedTinhTrangSucKhoeInput(clone));
        }
    }

    let optionsNhomMau = [
        {
        label: "A",
        value: "A"
        },
        {
            label: "B",
            value: "B"
        },
        {
            label: "O",
            value: "O"
        },
        {
            label: "AB",
            value: "AB"
        }
]
    return <CustomeModal
        open={modalActive}
        onCancel={() => handleModal(null)}
        onOk={
            selectedTinhTrangSucKhoe?.id
                ? () => handleRecord(ACTION_NAME.UPDATE, selectedTinhTrangSucKhoe)
                : () => handleRecord(ACTION_NAME.CREATE, selectedTinhTrangSucKhoe)
        }
        title={selectedTinhTrangSucKhoe?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
        okText="Chấp nhận"
        cancelText="Từ chối"

    >
        {/* <TextInput
            title="Nhóm máu"
            placeholder="Nhập vào nhóm máu"
            onChange={onRecordInputChange}
            property={"nhom_mau"}
            value={selectedTinhTrangSucKhoe?.nhom_mau}
        /> */}
         <SelectInput
            title="Nhóm máu"
            onChange={onRecordSelectInputChange}
            property={"nhom_mau"}
            value={selectedTinhTrangSucKhoe?.nhom_mau}
            isNull={false}
            options={optionsNhomMau}
        />
        <TextInput
            title="Bệnh chính"
            placeholder="Nhập vào bệnh chính"
            onChange={onRecordInputChange}
            property={"benh_chinh"}
            value={selectedTinhTrangSucKhoe?.benh_chinh}
        />
        <TextInput
            title="Đánh giá sức khỏe"
            placeholder="Nhập vào đánh giá sức khỏe"
            onChange={onRecordInputChange}
            property={"danh_gia_suc_khoe"}
            value={selectedTinhTrangSucKhoe?.danh_gia_suc_khoe}
        />
        <TextInput
            title="Ghi chú"
            placeholder="Nhập vào ghi chú"
            onChange={onRecordInputChange}
            property={"ghi_chu"}
            value={selectedTinhTrangSucKhoe?.ghi_chu}
        />
    </CustomeModal>
}


export default ModalItem