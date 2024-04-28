import CustomeModal from "../../../components/Form/modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import countryList from "react-select-country-list";
import diNuocNgoaiSlice from "../../../toolkits/QuanLyCanBo/DiNuocNgoai/slice.js"
import {ACTION_NAME} from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import dayjs from "dayjs";
import {useParams} from "react-router-dom";
import DateInput from "../../../components/Form/dateinput.jsx";
import { DATE_FORMAT } from "../../../utils/common";
import SelectInput from "../../../components/Form/selectinput.jsx";
const ModalItem = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const {ma_can_bo} = params
    const {modalActive, selectedDiNuocNgoai, pageSize, pageNumber} = useSelector(state => state.diNuocNgoais)
    const handleModal = (_item) => {
        dispatch(diNuocNgoaiSlice.actions.toggleModal(_item))
    }

    const handleRecord = (_actionName, _item) => {
        let date = new dayjs(); 
        let item = Object.assign({}, _item);
        date = date.format(DATE_FORMAT.DDMMYYYY);
        item.thoi_gian_bat_dau = item.thoi_gian_bat_dau===''?date:item.thoi_gian_bat_dau;
        item.thoi_gian_ket_thuc = item.thoi_gian_ket_thuc===''?date:item.thoi_gian_ket_thuc;
        dispatch(
            diNuocNgoaiSlice.actions.handleDiNuocNgoai({
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
            let clone = Object.assign({}, selectedDiNuocNgoai);
            clone[key] = event.target.value;
            dispatch(diNuocNgoaiSlice.actions.updateSelectedDiNuocNgoaiInput(clone));
        }
    }
    const onRecordDateInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedDiNuocNgoai);
          clone[key] = event.format(DATE_FORMAT.DDMMYYYY);
          dispatch(
            diNuocNgoaiSlice.actions.updateSelectedDiNuocNgoaiInput(clone)
          );
        }
      };
      const onRecordSelectInputChange = (key, event) => {
        if (key) {
            let Country= countryList().getData().find(item => item?.value === event)?.label
            let clone = Object.assign({}, selectedDiNuocNgoai);
            clone[key] = Country;
            dispatch(diNuocNgoaiSlice.actions.updateSelectedDiNuocNgoaiInput(clone));
        }
    }

    return <CustomeModal
        open={modalActive}
        onCancel={() => handleModal(null)}
        onOk={
            selectedDiNuocNgoai?.id
                ? () => handleRecord(ACTION_NAME.UPDATE, selectedDiNuocNgoai)
                : () => handleRecord(ACTION_NAME.CREATE, selectedDiNuocNgoai)
        }
        title={selectedDiNuocNgoai?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
        okText="Chấp nhận"
        cancelText="Từ chối"

    >
        <SelectInput
            title="Tên nước"
            onChange={onRecordSelectInputChange}
            property={"ten_nuoc"}
            value={selectedDiNuocNgoai?.ten_nuoc}
            isNull={false}
            options={countryList().getData()}
        />
        <DateInput
        title="Thời gian bắt đầu"
        placeholder="Nhập vào thời gian"
        onChange={onRecordDateInputChange}
        property={"thoi_gian_bat_dau"}
        value={selectedDiNuocNgoai?.thoi_gian_bat_dau}
      />
      <DateInput
        title="Thời gian kết thúc"
        placeholder="Nhập vào thời gian"
        onChange={onRecordDateInputChange}
        property={"thoi_gian_ket_thuc"}
        value={selectedDiNuocNgoai?.thoi_gian_ket_thuc}
      />
        <TextInput
            title="Ghi chú"
            placeholder="Nhập vào ghi chú"
            onChange={onRecordInputChange}
            property={"ghi_chu"}
            value={selectedDiNuocNgoai?.ghi_chu}
        />
        <TextInput
            title="Lý do"
            placeholder="Nhập vào lý do"
            onChange={onRecordInputChange}
            property={"ly_do"}
            value={selectedDiNuocNgoai?.ly_do}
        />
    </CustomeModal>
}

export default ModalItem