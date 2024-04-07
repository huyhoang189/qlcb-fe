import CustomeModal from "../../../components/Form/modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import lyLichKhoaHocSlice from "../../../toolkits/quanLyCanBo/lyLichKhoaHoc/slice.js"
import chucDanhKhoaHocSlice from "../../../toolkits/quanLyDanhMuc/chucDanhKhoaHoc/slice.js"
import {ACTION_NAME} from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import {useEffect} from "react";
import SelectInput from "../../../components/Form/selectinput.jsx";
import {useParams} from "react-router-dom";

const ModalItem = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const {ma_can_bo} = params
    const {modalActive, selectedLyLichKhoaHoc, pageSize, pageNumber} = useSelector(state => state.lyLichKhoaHocs)
    const {chucDanhKhoaHocs} = useSelector(state => state.chucDanhKhoaHocs)
    const handleModal = (_item) => {
        dispatch(lyLichKhoaHocSlice.actions.toggleModal(_item))
    }

    const handleRecord = (_actionName, _item) => {
        let item = Object.assign({}, _item);
        dispatch(
            lyLichKhoaHocSlice.actions.handleLyLichKhoaHoc({
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
            let clone = Object.assign({}, selectedLyLichKhoaHoc);
            clone[key] = event.target.value;
            dispatch(lyLichKhoaHocSlice.actions.updateSelectedLyLichKhoaHocInput(clone));
        }
    }

    const onRecordSelectInputChange = (key, event) => {
        if (key) {
            let clone = Object.assign({}, selectedLyLichKhoaHoc);
            clone[key] = event;
            dispatch(lyLichKhoaHocSlice.actions.updateSelectedLyLichKhoaHocInput(clone));
        }
    }

    //side effect
    useEffect(() => {
        dispatch(chucDanhKhoaHocSlice.actions.getChucDanhKhoaHocs({
            pageSize: 1000,
            pageNumber: 1
        }))
    }, [dispatch]);


    return <CustomeModal
        open={modalActive}
        onCancel={() => handleModal(null)}
        onOk={
            selectedLyLichKhoaHoc?.id
                ? () => handleRecord(ACTION_NAME.UPDATE, selectedLyLichKhoaHoc)
                : () => handleRecord(ACTION_NAME.CREATE, selectedLyLichKhoaHoc)
        }
        title={selectedLyLichKhoaHoc?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
        okText="Chấp nhận"
        cancelText="Từ chối"

    >
        <TextInput
            title="Tên chuyên ngành"
            placeholder="Nhập vào tên chuyên ngành"
            onChange={onRecordInputChange}
            property={"chuyen_nganh"}
            value={selectedLyLichKhoaHoc?.chuyen_nganh}
        />
        <TextInput
            title="Thời gian"
            placeholder="Nhập vào thời gian"
            onChange={onRecordInputChange}
            property={"thoi_gian"}
            value={selectedLyLichKhoaHoc?.thoi_gian}
        />
        <SelectInput
            title="Chức danh khoa học"
            onChange={onRecordSelectInputChange}
            property={"ma_chuc_danh"}
            value={selectedLyLichKhoaHoc?.ma_chuc_danh}
            options={chucDanhKhoaHocs.map((e) => ({
                label: e?.ten_chuc_danh,
                value: e?.id
            }))}
        />
        <TextInput
            title="Ghi chú"
            placeholder="Nhập vào ghi chú"
            onChange={onRecordInputChange}
            property={"ghi_chu"}
            value={selectedLyLichKhoaHoc?.ghi_chu}
        />
    </CustomeModal>
}


export default ModalItem