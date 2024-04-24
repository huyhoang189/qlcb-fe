import CustomeModal from "../../../components/Form/modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import kyLuatSlice from "../../../toolkits/QuanLyCanBo/KyLuat/slice.js"
import ngoaiNguSlice from "../../../toolkits/QuanLyDanhMuc/NgoaiNgu/slice.js";
import {ACTION_NAME} from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import {useEffect} from "react";
import dayjs from "dayjs";
import {useParams} from "react-router-dom";
import DateInput from "../../../components/Form/dateinput.jsx";
import { DATE_FORMAT } from "../../../utils/common";
const ModalItem = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const {ma_can_bo} = params
    const {modalActive, selectedKyLuat, pageSize, pageNumber} = useSelector(state => state.kyLuats)
    const handleModal = (_item) => {
        dispatch(kyLuatSlice.actions.toggleModal(_item))
    }

    const handleRecord = (_actionName, _item) => {
        let date = new dayjs(); 
        let item = Object.assign({}, _item);
        date = date.format(DATE_FORMAT.DDMMYYYY);
        item.thoi_gian = item.thoi_gian===''?date:item.thoi_gian;
        dispatch(
            kyLuatSlice.actions.handleKyLuat({
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
            let clone = Object.assign({}, selectedKyLuat);
            clone[key] = event.target.value;
            dispatch(kyLuatSlice.actions.updateSelectedKyLuatInput(clone));
        }
    }
    const onRecordDateInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedKyLuat);
          clone[key] = event.format(DATE_FORMAT.DDMMYYYY);
          dispatch(
            kyLuatSlice.actions.updateSelectedKyLuatInput(clone)
          );
        }
      };

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
            selectedKyLuat?.id
                ? () => handleRecord(ACTION_NAME.UPDATE, selectedKyLuat)
                : () => handleRecord(ACTION_NAME.CREATE, selectedKyLuat)
        }
        title={selectedKyLuat?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
        okText="Chấp nhận"
        cancelText="Từ chối"

    >
        <TextInput
            title="Hình thức"
            placeholder="Nhập vào hình thức"
            onChange={onRecordInputChange}
            property={"hinh_thuc"}
            value={selectedKyLuat?.hinh_thuc}
        />
        <TextInput
            title="Nội dung"
            placeholder="Nhập vào nội dung"
            onChange={onRecordInputChange}
            property={"noi_dung"}
            value={selectedKyLuat?.noi_dung}
        />
        <TextInput
            title="Số quyết định"
            placeholder="Nhập vào số quyết định"
            onChange={onRecordInputChange}
            property={"so_quyet_dinh"}
            value={selectedKyLuat?.so_quyet_dinh}
        />
        <DateInput
        title="Thời gian"
        placeholder="Nhập vào thời gian"
        onChange={onRecordDateInputChange}
        property={"thoi_gian"}
        value={selectedKyLuat?.thoi_gian}
      />
    <TextInput
            title="Loại"
            placeholder="Nhập vào loại kỷ luật"
            onChange={onRecordInputChange}
            property={"loai"}
            value={selectedKyLuat?.loai}
        />
        <TextInput
            title="Ghi chú"
            placeholder="Nhập vào ghi chú"
            onChange={onRecordInputChange}
            property={"ghi_chu"}
            value={selectedKyLuat?.ghi_chu}
        />
    </CustomeModal>
}


export default ModalItem