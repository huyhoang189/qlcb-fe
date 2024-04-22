import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import truongHocSlice from "../../../toolkits/QuanLyDanhMuc/TruongHoc/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedTruongHoc, pageSize, pageNumber } = useSelector(
    (state) => state.truongHocs
  );

  const handleModal = (_item) => {
    dispatch(truongHocSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      truongHocSlice.actions.handleTruongHoc({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedTruongHoc);
      clone[key] = event.target.value;
      dispatch(truongHocSlice.actions.updateSelectedTruongHocInput(clone));
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedTruongHoc?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedTruongHoc)
          : () => handleRecord(ACTION_NAME.CREATE, selectedTruongHoc)
      }
      title={selectedTruongHoc?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên trường học"
        placeholder="Nhập vào tên trường học"
        onChange={onRecordInputChange}
        property={"ten_truong"}
        value={selectedTruongHoc?.ten_truong}
      />
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedTruongHoc?.ghi_chu}
      />
    </CustomeModal>
  );
};

export default ModalItem;
