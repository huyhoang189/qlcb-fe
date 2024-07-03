import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import loaiDanhHieuThiDuaSlice from "../../../toolkits/QuanLyDanhMuc/LoaiDanhHieuThiDua/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedLoaiDanhHieuThiDua, pageSize, pageNumber } =
    useSelector((state) => state.loaiDanhHieuThiDuas);

  const handleModal = (_item) => {
    dispatch(loaiDanhHieuThiDuaSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      loaiDanhHieuThiDuaSlice.actions.handleLoaiDanhHieuThiDua({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedLoaiDanhHieuThiDua);
      clone[key] = event.target.value;
      dispatch(
        loaiDanhHieuThiDuaSlice.actions.updateSelectedLoaiDanhHieuThiDuaInput(clone)
      );
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedLoaiDanhHieuThiDua?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedLoaiDanhHieuThiDua)
          : () => handleRecord(ACTION_NAME.CREATE, selectedLoaiDanhHieuThiDua)
      }
      title={
        selectedLoaiDanhHieuThiDua?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"
      }
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên loại hình khen thuong"
        placeholder="Nhập vào tên loại hình đào tạo"
        onChange={onRecordInputChange}
        property={"ten"}
        value={selectedLoaiDanhHieuThiDua?.ten}
      />
      <TextInput
        title="Tên viet tat"
        placeholder="Nhập vào tên viết tắt"
        onChange={onRecordInputChange}
        property={"viet_tat"}
        value={selectedLoaiDanhHieuThiDua?.viet_tat}
      />
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedLoaiDanhHieuThiDua?.ghi_chu}
      />
    </CustomeModal>
  );
};

export default ModalItem;
