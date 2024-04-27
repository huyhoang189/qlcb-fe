import CustomeModal from "../../../components/Form/modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import khenThuongSlice from "../../../toolkits/QuanLyCanBo/KhenThuong/slice.js"
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
    const {modalActive, selectedKhenThuong, pageSize, pageNumber} = useSelector(state => state.khenThuongs)
    const handleModal = (_item) => {
        dispatch(khenThuongSlice.actions.toggleModal(_item))
    }

    const handleRecord = (_actionName, _item) => {
        let date = new dayjs(); 
        let item = Object.assign({}, _item);
        date = date.format(DATE_FORMAT.DDMMYYYY);
        item.thoi_gian = item.thoi_gian===''?date:item.thoi_gian;
        dispatch(
            khenThuongSlice.actions.handleKhenThuong({
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
            let clone = Object.assign({}, selectedKhenThuong);
            clone[key] = event.target.value;
            dispatch(khenThuongSlice.actions.updateSelectedKhenThuongInput(clone));
        }
    }
    const onRecordDateInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedKhenThuong);
          clone[key] = event.format(DATE_FORMAT.DDMMYYYY);
          dispatch(
            khenThuongSlice.actions.updateSelectedKhenThuongInput(clone)
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
            selectedKhenThuong?.id
                ? () => handleRecord(ACTION_NAME.UPDATE, selectedKhenThuong)
                : () => handleRecord(ACTION_NAME.CREATE, selectedKhenThuong)
        }
        title={selectedKhenThuong?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
        okText="Chấp nhận"
        cancelText="Từ chối"

    >
        <TextInput
            title="Hình thức"
            placeholder="Nhập vào hình thức"
            onChange={onRecordInputChange}
            property={"hinh_thuc"}
            value={selectedKhenThuong?.hinh_thuc}
        />
        <TextInput
            title="Nội dung"
            placeholder="Nhập vào nội dung"
            onChange={onRecordInputChange}
            property={"noi_dung"}
            value={selectedKhenThuong?.noi_dung}
        />
        <TextInput
            title="Số quyết định"
            placeholder="Nhập vào số quyết định"
            onChange={onRecordInputChange}
            property={"so_quyet_dinh"}
            value={selectedKhenThuong?.so_quyet_dinh}
        />
        <DateInput
        title="Thời gian"
        placeholder="Nhập vào thời gian"
        onChange={onRecordDateInputChange}
        property={"thoi_gian"}
        value={selectedKhenThuong?.thoi_gian}
      />
        <TextInput
            title="Ghi chú"
            placeholder="Nhập vào ghi chú"
            onChange={onRecordInputChange}
            property={"ghi_chu"}
            value={selectedKhenThuong?.ghi_chu}
        />
    </CustomeModal>
}


export default ModalItem