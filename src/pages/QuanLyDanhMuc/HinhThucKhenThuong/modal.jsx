import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import hinhThucKhenThuongSlice from "../../../toolkits/QuanLyDanhMuc/HinhThucKhenThuong/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedHinhThucKhenThuong, pageSize, pageNumber } =
    useSelector((state) => state.hinhThucKhenThuongs);

  const handleModal = (_item) => {
    dispatch(hinhThucKhenThuongSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      hinhThucKhenThuongSlice.actions.handleHinhThucKhenThuong({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedHinhThucKhenThuong);
      clone[key] = event.target.value;
      dispatch(
        hinhThucKhenThuongSlice.actions.updateSelectedHinhThucKhenThuongInput(clone)
      );
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedHinhThucKhenThuong?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedHinhThucKhenThuong)
          : () => handleRecord(ACTION_NAME.CREATE, selectedHinhThucKhenThuong)
      }
      title={
        selectedHinhThucKhenThuong?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"
      }
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên loại hình khen thuong"
        placeholder="Nhập vào tên loại hình đào tạo"
        onChange={onRecordInputChange}
        property={"ten"}
        value={selectedHinhThucKhenThuong?.ten}
      />
      <TextInput
        title="Tên viet tat"
        placeholder="Nhập vào tên viết tắt"
        onChange={onRecordInputChange}
        property={"viet_tat"}
        value={selectedHinhThucKhenThuong?.viet_tat}
      />
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedHinhThucKhenThuong?.ghi_chu}
      />
    </CustomeModal>
  );
};

export default ModalItem;
