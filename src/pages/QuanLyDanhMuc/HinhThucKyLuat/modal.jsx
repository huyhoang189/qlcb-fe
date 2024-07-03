import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import hinhThucKyLuatSlice from "../../../toolkits/QuanLyDanhMuc/HinhThucKyLuat/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedHinhThucKyLuat, pageSize, pageNumber } =
    useSelector((state) => state.hinhThucKyLuats);

  const handleModal = (_item) => {
    dispatch(hinhThucKyLuatSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      hinhThucKyLuatSlice.actions.handleHinhThucKyLuat({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedHinhThucKyLuat);
      clone[key] = event.target.value;
      dispatch(
        hinhThucKyLuatSlice.actions.updateSelectedHinhThucKyLuatInput(clone)
      );
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedHinhThucKyLuat?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedHinhThucKyLuat)
          : () => handleRecord(ACTION_NAME.CREATE, selectedHinhThucKyLuat)
      }
      title={
        selectedHinhThucKyLuat?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"
      }
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên loại hình khen thuong"
        placeholder="Nhập vào tên loại hình đào tạo"
        onChange={onRecordInputChange}
        property={"ten"}
        value={selectedHinhThucKyLuat?.ten}
      />
      <TextInput
        title="Tên viet tat"
        placeholder="Nhập vào tên viết tắt"
        onChange={onRecordInputChange}
        property={"viet_tat"}
        value={selectedHinhThucKyLuat?.viet_tat}
      />
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedHinhThucKyLuat?.ghi_chu}
      />
    </CustomeModal>
  );
};

export default ModalItem;
