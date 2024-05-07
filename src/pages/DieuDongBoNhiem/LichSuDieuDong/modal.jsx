import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import boNhiemCanBoSlice from "../../../toolkits/DieuDongBoNhiem/BoNhiemCanBo/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedBoNhiemCanBo, pageSize, pageNumber } =
    useSelector((state) => state.boNhiemCanBos);

  const handleModal = (_item) => {
    dispatch(boNhiemCanBoSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      boNhiemCanBoSlice.actions.handleBoNhiemCanBo({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedBoNhiemCanBo);
      clone[key] = event.target.value;
      dispatch(
        boNhiemCanBoSlice.actions.updateSelectedBoNhiemCanBoInput(clone)
      );
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedBoNhiemCanBo?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedBoNhiemCanBo)
          : () => handleRecord(ACTION_NAME.CREATE, selectedBoNhiemCanBo)
      }
      title={selectedBoNhiemCanBo?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tiêu đề"
        placeholder="Nhập vào tên tiêu đề"
        onChange={onRecordInputChange}
        property={"tieu_de"}
        value={selectedBoNhiemCanBo?.tieu_de}
      />
      <TextInput
        title="Năm"
        placeholder="Nhập vào năm"
        onChange={onRecordInputChange}
        property={"nam"}
        value={selectedBoNhiemCanBo?.nam}
      />
      <TextInput
        title="Đợt"
        placeholder="Nhập vào đợt"
        onChange={onRecordInputChange}
        property={"dot"}
        value={selectedBoNhiemCanBo?.dot}
      />
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedBoNhiemCanBo?.ghi_chu}
      />
    </CustomeModal>
  );
};

export default ModalItem;
