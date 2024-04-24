import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import chungNhanSlice from "../../../toolkits/QuanLyDanhMuc/ChungNhan/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedChungNhan, pageSize, pageNumber } = useSelector(
    (state) => state.chungNhans
  );

  const handleModal = (_item) => {
    dispatch(chungNhanSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      chungNhanSlice.actions.handleChungNhan({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedChungNhan);
      clone[key] = event.target.value;
      dispatch(chungNhanSlice.actions.updateSelectedChungNhanInput(clone));
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedChungNhan?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedChungNhan)
          : () => handleRecord(ACTION_NAME.CREATE, selectedChungNhan)
      }
      title={selectedChungNhan?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên chứng nhận"
        placeholder="Nhập vào tên chứng nhận"
        onChange={onRecordInputChange}
        property={"ten_chung_nhan"}
        value={selectedChungNhan?.ten_chung_nhan}
      />
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedChungNhan?.ghi_chu}
      />
    </CustomeModal>
  );
};

export default ModalItem;
