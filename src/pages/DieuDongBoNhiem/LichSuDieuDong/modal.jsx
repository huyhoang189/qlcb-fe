import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import lichSuDieuDongSlice from "../../../toolkits/DieuDongBoNhiem/LichSuDieuDong/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedLichSuDieuDong, pageSize, pageNumber } =
    useSelector((state) => state.lichSuDieuDongs);

  const handleModal = (_item) => {
    dispatch(lichSuDieuDongSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      lichSuDieuDongSlice.actions.handleLichSuDieuDong({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedLichSuDieuDong);
      clone[key] = event.target.value;
      dispatch(
        lichSuDieuDongSlice.actions.updateSelectedLichSuDieuDongInput(clone)
      );
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedLichSuDieuDong?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedLichSuDieuDong)
          : () => handleRecord(ACTION_NAME.CREATE, selectedLichSuDieuDong)
      }
      title={
        selectedLichSuDieuDong?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"
      }
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tiêu đề"
        placeholder="Nhập vào tên tiêu đề"
        onChange={onRecordInputChange}
        property={"tieu_de"}
        value={selectedLichSuDieuDong?.tieu_de}
      />
      <TextInput
        title="Năm"
        placeholder="Nhập vào năm"
        onChange={onRecordInputChange}
        property={"nam"}
        value={selectedLichSuDieuDong?.nam}
      />
      <TextInput
        title="Đợt"
        placeholder="Nhập vào đợt"
        onChange={onRecordInputChange}
        property={"dot"}
        value={selectedLichSuDieuDong?.dot}
      />
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedLichSuDieuDong?.ghi_chu}
      />
    </CustomeModal>
  );
};

export default ModalItem;
