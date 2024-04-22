import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import chucVuChinhQuyenSlice from "../../../toolkits/QuanLyDanhMuc/ChucVuChinhQuyen/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedChucVuChinhQuyen, pageSize, pageNumber } =
    useSelector((state) => state.chucVuChinhQuyens);

  const handleModal = (_item) => {
    dispatch(chucVuChinhQuyenSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      chucVuChinhQuyenSlice.actions.handleChucVuChinhQuyen({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedChucVuChinhQuyen);
      clone[key] = event.target.value;
      dispatch(
        chucVuChinhQuyenSlice.actions.updateSelectedChucVuChinhQuyenInput(clone)
      );
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedChucVuChinhQuyen?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedChucVuChinhQuyen)
          : () => handleRecord(ACTION_NAME.CREATE, selectedChucVuChinhQuyen)
      }
      title={
        selectedChucVuChinhQuyen?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"
      }
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên chức danh"
        placeholder="Nhập vào tên chức danh"
        onChange={onRecordInputChange}
        property={"ten_chuc_danh"}
        value={selectedChucVuChinhQuyen?.ten_chuc_danh}
      />
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedChucVuChinhQuyen?.ghi_chu}
      />
    </CustomeModal>
  );
};

export default ModalItem;
