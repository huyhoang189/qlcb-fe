import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import chucDanhPhapLySlice from "../../../toolkits/QuanLyDanhMuc/ChucDanhPhapLy/slice.js";
import { ACTION_NAME, LOAI_CHUC_DANH_PHAP_LY } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import SelectInput from "../../../components/Form/selectinput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedChucDanhPhapLy, pageSize, pageNumber } =
    useSelector((state) => state.chucDanhPhapLys);

  const handleModal = (_item) => {
    dispatch(chucDanhPhapLySlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      chucDanhPhapLySlice.actions.handleChucDanhPhapLy({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedChucDanhPhapLy);
      clone[key] = event.target.value;
      dispatch(
        chucDanhPhapLySlice.actions.updateSelectedChucDanhPhapLyInput(clone)
      );
    }
  };

  const onRecordSelectedInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedChucDanhPhapLy);
      clone[key] = event;
      dispatch(
        chucDanhPhapLySlice.actions.updateSelectedChucDanhPhapLyInput(clone)
      );
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedChucDanhPhapLy?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedChucDanhPhapLy)
          : () => handleRecord(ACTION_NAME.CREATE, selectedChucDanhPhapLy)
      }
      title={
        selectedChucDanhPhapLy?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"
      }
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên chức danh"
        placeholder="Nhập vào tên chức danh"
        onChange={onRecordInputChange}
        property={"ten_chuc_danh"}
        value={selectedChucDanhPhapLy?.ten_chuc_danh}
      />
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedChucDanhPhapLy?.ghi_chu}
      />

      <SelectInput
        title="Loại chức danh"
        onChange={onRecordSelectedInputChange}
        property={"loai_chuc_danh"}
        value={selectedChucDanhPhapLy?.loai_chuc_danh}
        options={LOAI_CHUC_DANH_PHAP_LY}
        isNull={false}
      />
    </CustomeModal>
  );
};

export default ModalItem;
