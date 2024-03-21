import CustomeModal from "../../components/Form/modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import chucDanhKhoaHocSlice from "../../toolkits/quan-ly-chuc-danh-khoa-hoc/slice.js"
import {ACTION_NAME} from "../../utils/common.js";
import TextInput from "../../components/Form/textinput.jsx";

const ModalItem = () => {

    const dispatch = useDispatch()
    const {modalActive, selectedChucDanhKhoaHoc, pageSize, pageNumber} = useSelector(state => state.chucDanhKhoaHocs)

    const handleModal = (_item) => {
        dispatch(chucDanhKhoaHocSlice.actions.toggleModal(_item))
    }

    const handleRecord = (_actionName, _item) => {
        let item = Object.assign({}, _item);
        dispatch(
            chucDanhKhoaHocSlice.actions.handleChucDanhKhoaHoc({
                item: item,
                actionName: _actionName,
                pageSize: pageSize,
                pageNumber: pageNumber,
            })
        );
    }

    const onRecordInputChange = (key, event) => {
        if (key) {
            let clone = Object.assign({}, selectedChucDanhKhoaHoc);
            clone[key] = event.target.value;
            dispatch(chucDanhKhoaHocSlice.actions.updateSelectedChucDanhKhoaHocInput(clone));
        }
    }

    return <CustomeModal
        open={modalActive}
        onCancel={() => handleModal(null)}
        onOk={
            selectedChucDanhKhoaHoc?.id
                ? () => handleRecord(ACTION_NAME.UPDATE, selectedChucDanhKhoaHoc)
                : () => handleRecord(ACTION_NAME.CREATE, selectedChucDanhKhoaHoc)
        }
        title={selectedChucDanhKhoaHoc?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
        okText="Chấp nhận"
        cancelText="Từ chối"

    >
        <TextInput
            title="Tên chức danh"
            placeholder="Nhập vào tên chức danh"
            onChange={onRecordInputChange}
            property={"ten_chuc_danh"}
            value={selectedChucDanhKhoaHoc?.ten_chuc_danh}
        />
        <TextInput
            title="Ghi chú"
            placeholder="Nhập vào ghi chú"
            onChange={onRecordInputChange}
            property={"ghi_chu"}
            value={selectedChucDanhKhoaHoc?.ghi_chu}
        />
    </CustomeModal>
}


export default ModalItem