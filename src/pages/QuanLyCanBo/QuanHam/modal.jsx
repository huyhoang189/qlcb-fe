import CustomeModal from "../../../components/Form/modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import quanHamSlice from "../../../toolkits/QuanLyCanBo/QuanHam/slice.js"
import {ACTION_NAME} from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import dayjs from "dayjs";
import {useParams} from "react-router-dom";
import DateInput from "../../../components/Form/dateinput.jsx";
import { DATE_FORMAT } from "../../../utils/common";
const ModalItem = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const {ma_can_bo} = params
    const {modalActive, selectedQuanHam, pageSize, pageNumber} = useSelector(state => state.quanHams)
    const handleModal = (_item) => {
        dispatch(quanHamSlice.actions.toggleModal(_item))
    }

    const handleRecord = (_actionName, _item) => {
        let date = new dayjs(); 
        let item = Object.assign({}, _item);
        date = date.format(DATE_FORMAT.YYYYMMDD);
        item.thoi_gian_nhan = item.thoi_gian_nhan===''?date:item.thoi_gian_nhan;
        dispatch(
            quanHamSlice.actions.handleQuanHam({
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
            let clone = Object.assign({}, selectedQuanHam);
            clone[key] = event.target.value;
            dispatch(quanHamSlice.actions.updateSelectedQuanHamInput(clone));
        }
    }
    const onRecordDateInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedQuanHam);
          clone[key] = event.format(DATE_FORMAT.YYYYMMDD);
          dispatch(
            quanHamSlice.actions.updateSelectedQuanHamInput(clone)
          );
        }
      };

    return <CustomeModal
        open={modalActive}
        onCancel={() => handleModal(null)}
        onOk={
            selectedQuanHam?.id
                ? () => handleRecord(ACTION_NAME.UPDATE, selectedQuanHam)
                : () => handleRecord(ACTION_NAME.CREATE, selectedQuanHam)
        }
        title={selectedQuanHam?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
        okText="Chấp nhận"
        cancelText="Từ chối"

    >
        <TextInput
            title="Quân hàm"
            placeholder="Nhập vào quân hàm"
            onChange={onRecordInputChange}
            property={"quan_ham"}
            value={selectedQuanHam?.quan_ham}
        />
        <DateInput
        title="Thời gian nhận"
        placeholder="Nhập vào thời gian nhận"
        onChange={onRecordDateInputChange}
        property={"thoi_gian_nhan"}
        value={selectedQuanHam?.thoi_gian_nhan}
      />
        <TextInput
            title="Ghi chú"
            placeholder="Nhập vào ghi chú"
            onChange={onRecordInputChange}
            property={"ghi_chu"}
            value={selectedQuanHam?.ghi_chu}
        />
    </CustomeModal>
}


export default ModalItem