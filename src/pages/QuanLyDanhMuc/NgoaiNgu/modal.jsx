import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import ngoaiNguSlice from "../../../toolkits/QuanLyDanhMuc/NgoaiNgu/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedNgoaiNgu, pageSize, pageNumber } = useSelector(
    (state) => state.ngoaiNgus
  );

  const handleModal = (_item) => {
    dispatch(ngoaiNguSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      ngoaiNguSlice.actions.handleNgoaiNgu({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedNgoaiNgu);
      clone[key] = event.target.value;
      dispatch(ngoaiNguSlice.actions.updateSelectedNgoaiNguInput(clone));
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedNgoaiNgu?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedNgoaiNgu)
          : () => handleRecord(ACTION_NAME.CREATE, selectedNgoaiNgu)
      }
      title={selectedNgoaiNgu?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên ngoại ngữ"
        placeholder="Nhập vào tên ngoại ngữ"
        onChange={onRecordInputChange}
        property={"ten_ngoai_ngu"}
        value={selectedNgoaiNgu?.ten_ngoai_ngu}
      />
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedNgoaiNgu?.ghi_chu}
      />
    </CustomeModal>
  );
};

export default ModalItem;
