import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import danhSachBoNhiemSlice from "../../../toolkits/DieuDongBoNhiem/DanhSachBoNhiem/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import { useParams } from "react-router-dom";

const ModalItem = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { ma_dieu_dong } = params;

  const { modalActive, selectedDanhSachBoNhiem, pageSize, pageNumber } =
    useSelector((state) => state.danhSachBoNhiems);

  const handleModal = (_item) => {
    dispatch(danhSachBoNhiemSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      danhSachBoNhiemSlice.actions.handleDanhSachBoNhiem({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
        ma_dieu_dong,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedDanhSachBoNhiem);
      clone[key] = event.target.value;
      dispatch(
        danhSachBoNhiemSlice.actions.updateSelectedDanhSachBoNhiemInput(clone)
      );
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedDanhSachBoNhiem?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedDanhSachBoNhiem)
          : () => handleRecord(ACTION_NAME.CREATE, selectedDanhSachBoNhiem)
      }
      title={
        selectedDanhSachBoNhiem?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"
      }
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Cán bộ"
        onChange={onRecordInputChange}
        property={"ma_can_bo"}
        value={selectedDanhSachBoNhiem?.ma_can_bo}
      />
      <TextInput
        title="Chức danh pháp lý bổ nhiệm"
        onChange={onRecordInputChange}
        property={"ma_chu_danh"}
        value={selectedDanhSachBoNhiem?.ma_chu_danh}
      />
      <TextInput
        title="Loại chức danh pháp lý"
        onChange={onRecordInputChange}
        property={"loai_chuc_danh"}
        value={selectedDanhSachBoNhiem?.loai_chuc_danh}
      />
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedDanhSachBoNhiem?.ghi_chu}
      />
    </CustomeModal>
  );
};

export default ModalItem;
