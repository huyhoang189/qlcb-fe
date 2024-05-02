import CustomeModal from "../../../components/Form/modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import lyLichChucDanhPhapLySlice from "../../../toolkits/QuanLyCanBo/LyLichChucDanhPhapLy/slice.js"
import chucDanhPhapLySlice from "../../../toolkits/QuanLyDanhMuc/ChucDanhPhapLy/slice.js";
import {useEffect} from "react";
import {ACTION_NAME} from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import dayjs from "dayjs";
import {useParams} from "react-router-dom";
import DateInput from "../../../components/Form/dateinput.jsx";
import SelectInput from "../../../components/Form/selectinput.jsx";
import { DATE_FORMAT } from "../../../utils/common.js";
const ModalItem = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const {ma_can_bo} = params
    const {modalActive, selectedLyLichChucDanhPhapLy, pageSize, pageNumber} = useSelector(state => state.lyLichChucDanhPhapLys)
    const {chucDanhPhapLys} = useSelector(state => state.chucDanhPhapLys)
    const handleModal = (_item) => {
        dispatch(lyLichChucDanhPhapLySlice.actions.toggleModal(_item))
    }

    const handleRecord = (_actionName, _item) => {
        let date = new dayjs(); 
        let item = Object.assign({}, _item);
        date = date.format(DATE_FORMAT.DDMMYYYY);
        item.thoi_gian_bat_dau = item.thoi_gian_bat_dau===''?date:item.thoi_gian_bat_dau;
        item.thoi_gian_ket_thuc = item.thoi_gian_ket_thuc===''||item.thoi_gian_ket_thuc===null?date:item.thoi_gian_ket_thuc;
        dispatch(
            lyLichChucDanhPhapLySlice.actions.handleLyLichChucDanhPhapLy({
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
            let clone = Object.assign({}, selectedLyLichChucDanhPhapLy);
            clone[key] = event;
            dispatch(lyLichChucDanhPhapLySlice.actions.updateSelectedLyLichChucDanhPhapLyInput(clone));
        }
    }

    const onRecordInputChange = (key, event) => {
        if (key) {
            let clone = Object.assign({}, selectedLyLichChucDanhPhapLy);
            clone[key] = event.target.value;
            dispatch(lyLichChucDanhPhapLySlice.actions.updateSelectedLyLichChucDanhPhapLyInput(clone));
        }
    }
    const onRecordDateInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedLyLichChucDanhPhapLy);
          clone[key] = event.format(DATE_FORMAT.DDMMYYYY);
          dispatch(
            lyLichChucDanhPhapLySlice.actions.updateSelectedLyLichChucDanhPhapLyInput(clone)
          );
        }
      };

    const requestTimeEnd = () =>(
        selectedLyLichChucDanhPhapLy?.id &&
        <DateInput
        title="Thời gian kết thúc"
        placeholder="Nhập vào thời gian kết thúc"
        onChange={onRecordDateInputChange}
        property={"thoi_gian_ket_thuc"}
        value={selectedLyLichChucDanhPhapLy?.thoi_gian_ket_thuc}
      />
    )
       //side effect
    useEffect(() => {
        dispatch(chucDanhPhapLySlice.actions.getChucDanhPhapLys({
            pageSize: 1000,
            pageNumber: 1
        }))
    }, [dispatch]);

    return <CustomeModal
        open={modalActive}
        onCancel={() => handleModal(null)}
        onOk={
            selectedLyLichChucDanhPhapLy?.id
                ? () => handleRecord(ACTION_NAME.UPDATE, selectedLyLichChucDanhPhapLy)
                : () => handleRecord(ACTION_NAME.CREATE, selectedLyLichChucDanhPhapLy)
        }
        title={selectedLyLichChucDanhPhapLy?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
        okText="Chấp nhận"
        cancelText="Từ chối"

    >
        <SelectInput
            title="Chức danh"
            onChange={onRecordSelectInputChange}
            property={"ma_chuc_danh"}
            value={selectedLyLichChucDanhPhapLy?.ma_chuc_danh}
            isNull={false}
            options={chucDanhPhapLys.map((e) => ({
                label: e?.ten_chuc_danh,
                value: e?.id
            }))}
        />
        <DateInput
        title="Thời gian bắt đầu"
        placeholder="Nhập vào thời gian bắt đầu"
        onChange={onRecordDateInputChange}
        property={"thoi_gian_bat_dau"}
        value={selectedLyLichChucDanhPhapLy?.thoi_gian_bat_dau}
      />
      {
        requestTimeEnd()
      }
        <TextInput
            title="Ghi chú"
            placeholder="Nhập vào ghi chú"
            onChange={onRecordInputChange}
            property={"ghi_chu"}
            value={selectedLyLichChucDanhPhapLy?.ghi_chu}
        />
    </CustomeModal>
}


export default ModalItem