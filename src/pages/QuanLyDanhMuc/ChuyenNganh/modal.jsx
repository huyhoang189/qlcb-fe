import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import chuyenNganhSlice from "../../../toolkits/QuanLyDanhMuc/ChuyenNganh/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedChuyenNganh, pageSize, pageNumber } =
    useSelector((state) => state.chuyenNganhs);

  const handleModal = (_item) => {
    dispatch(chuyenNganhSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      chuyenNganhSlice.actions.handleChuyenNganh({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedChuyenNganh);
      clone[key] = event.target.value;
      dispatch(chuyenNganhSlice.actions.updateSelectedChuyenNganhInput(clone));
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedChuyenNganh?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedChuyenNganh)
          : () => handleRecord(ACTION_NAME.CREATE, selectedChuyenNganh)
      }
      title={selectedChuyenNganh?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên chuyên ngành"
        placeholder="Nhập vào tên chuyên ngành"
        onChange={onRecordInputChange}
        property={"ten"}
        value={selectedChuyenNganh?.ten}
      />
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedChuyenNganh?.ghi_chu}
      />
    </CustomeModal>
  );
};

export default ModalItem;
