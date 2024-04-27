import CustomeModal from "../../../components/Form/modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import tinhHinhNhaOSlice from "../../../toolkits/QuanLyCanBo/TinhHinhNhaO/slice.js"
import {ACTION_NAME} from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import dayjs from "dayjs";
import {useParams} from "react-router-dom";
import NumberInput from "../../../components/Form/numberinput.jsx";
import { DATE_FORMAT } from "../../../utils/common";
const ModalItem = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const {ma_can_bo} = params
    const {modalActive, selectedTinhHinhNhaO, pageSize, pageNumber} = useSelector(state => state.tinhHinhNhaOs)
    const handleModal = (_item) => {
        dispatch(tinhHinhNhaOSlice.actions.toggleModal(_item))
    }

    const handleRecord = (_actionName, _item) => {
        let date = new dayjs(); 
        let item = Object.assign({}, _item);
        date = date.format(DATE_FORMAT.DDMMYYYY);
        item.thoi_gian = item.thoi_gian===''?date:item.thoi_gian;
        dispatch(
            tinhHinhNhaOSlice.actions.handleTinhHinhNhaO({
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
            let clone = Object.assign({}, selectedTinhHinhNhaO);
            clone[key] = event.target.value;
            dispatch(tinhHinhNhaOSlice.actions.updateSelectedTinhHinhNhaOInput(clone));
        }
    }

    return <CustomeModal
        open={modalActive}
        onCancel={() => handleModal(null)}
        onOk={
            selectedTinhHinhNhaO?.id
                ? () => handleRecord(ACTION_NAME.UPDATE, selectedTinhHinhNhaO)
                : () => handleRecord(ACTION_NAME.CREATE, selectedTinhHinhNhaO)
        }
        title={selectedTinhHinhNhaO?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
        okText="Chấp nhận"
        cancelText="Từ chối"

    >
        <TextInput
            title="Hình thức"
            placeholder="Nhập vào hình thức"
            onChange={onRecordInputChange}
            property={"hinh_thuc"}
            value={selectedTinhHinhNhaO?.hinh_thuc}
        />
        <TextInput
            title="Loại nhà"
            placeholder="Nhập vào loại nhà"
            onChange={onRecordInputChange}
            property={"loai_nha"}
            value={selectedTinhHinhNhaO?.loai_nha}
        />
        {/* <NumberInput
            title="Diện tích"
            placeholder="Nhập vào diện tích"
            onChange={onRecordInputChange}
            property={"dien_tich"}
            addonAfter= "m²"
            value={selectedTinhHinhNhaO?.dien_tich}
        /> */}
        <TextInput
            title="Diện tích"
            placeholder="Nhập vào diện tích"
            onChange={onRecordInputChange}
            property={"dien_tich"}
            value={selectedTinhHinhNhaO?.dien_tich}
        />
        <TextInput
            title="Ghi chú"
            placeholder="Nhập vào ghi chú"
            onChange={onRecordInputChange}
            property={"ghi_chu"}
            value={selectedTinhHinhNhaO?.ghi_chu}
        />
    </CustomeModal>
}


export default ModalItem