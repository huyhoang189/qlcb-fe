import CustomeModal from "../../../components/Form/modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import trinhDoNgoaiNguSlice from "../../../toolkits/QuanLyCanBo/TrinhDoNgoaiNgu/slice.js"
import ngoaiNguSlice from "../../../toolkits/QuanLyDanhMuc/NgoaiNgu/slice.js";
import {ACTION_NAME} from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import {useEffect} from "react";
import SelectInput from "../../../components/Form/selectinput.jsx";
import {useParams} from "react-router-dom";
import RangeDate from "../../../components/Form/rangedate.jsx";
import DateInput from "../../../components/Form/dateinput.jsx";
import { DATE_FORMAT } from "../../../utils/common";
const ModalItem = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const {ma_can_bo} = params
    const {modalActive, selectedTrinhDoNgoaiNgu, pageSize, pageNumber} = useSelector(state => state.trinhDoNgoaiNgus)
    const {ngoaiNgus} = useSelector(state => state.ngoaiNgus)
    const handleModal = (_item) => {
        dispatch(trinhDoNgoaiNguSlice.actions.toggleModal(_item))
    }

    const handleRecord = (_actionName, _item) => {
        let item = Object.assign({}, _item);
        dispatch(
            trinhDoNgoaiNguSlice.actions.handleTrinhDoNgoaiNgu({
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
            let clone = Object.assign({}, selectedTrinhDoNgoaiNgu);
            clone[key] = event.target.value;
            dispatch(trinhDoNgoaiNguSlice.actions.updateSelectedTrinhDoNgoaiNguInput(clone));
        }
    }
    const onRecordRangeDateChange = (key, event) => {
        if (key) {
            let clone = Object.assign({}, selectedTrinhDoNgoaiNgu);
            clone[key] = event?event[0].format(DATE_FORMAT.YYYY)+"-"+event[1].format(DATE_FORMAT.YYYY):"";
            dispatch(trinhDoNgoaiNguSlice.actions.updateSelectedTrinhDoNgoaiNguInput(clone));
        }
    }

    const onRecordDateInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedTrinhDoNgoaiNgu);
          clone[key] = event.format(DATE_FORMAT.YYYYMMDD);
          dispatch(
            trinhDoNgoaiNguSlice.actions.updateSelectedTrinhDoNgoaiNguInput(clone)
          );
        }
      };

    const onRecordSelectInputChange = (key, event) => {
        if (key) {
            let clone = Object.assign({}, selectedTrinhDoNgoaiNgu);
            clone[key] = event;
            dispatch(trinhDoNgoaiNguSlice.actions.updateSelectedTrinhDoNgoaiNguInput(clone));
        }
    }

    //side effect
    useEffect(() => {
        dispatch(ngoaiNguSlice.actions.getNgoaiNgus({
            pageSize: 1000,
            pageNumber: 1
        }))
    }, [dispatch]);


    return <CustomeModal
        open={modalActive}
        onCancel={() => handleModal(null)}
        onOk={
            selectedTrinhDoNgoaiNgu?.id
                ? () => handleRecord(ACTION_NAME.UPDATE, selectedTrinhDoNgoaiNgu)
                : () => handleRecord(ACTION_NAME.CREATE, selectedTrinhDoNgoaiNgu)
        }
        title={selectedTrinhDoNgoaiNgu?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
        okText="Chấp nhận"
        cancelText="Từ chối"

    >
        <SelectInput
            title="Ngoại ngữ"
            onChange={onRecordSelectInputChange}
            property={"ma_ngon_ngu"}
            value={selectedTrinhDoNgoaiNgu?.ma_ngon_ngu}
            isNull={false}
            options={ngoaiNgus.map((e) => ({
                label: e?.ten_ngoai_ngu,
                value: e?.id
            }))}
        />
        <TextInput
            title="Trình độ"
            placeholder="Nhập vào trình độ"
            onChange={onRecordInputChange}
            property={"trinh_do"}
            value={selectedTrinhDoNgoaiNgu?.trinh_do}
        />
        {/* <RangeDate
            title="Thời gian"
            property={"thoi_gian"}
            onChange={onRecordRangeDateChange}
            value={selectedTrinhDoNgoaiNgu?.thoi_gian}
    /> */}
        <DateInput
            title="Thời gian"
            placeholder="Nhập vào thời gian"
            onChange={onRecordDateInputChange}
            property={"thoi_gian"}
            value={selectedTrinhDoNgoaiNgu?.thoi_gian}
        />
        <TextInput
            title="Ghi chú"
            placeholder="Nhập vào ghi chú"
            onChange={onRecordInputChange}
            property={"ghi_chu"}
            value={selectedTrinhDoNgoaiNgu?.ghi_chu}
        />
    </CustomeModal>
}


export default ModalItem