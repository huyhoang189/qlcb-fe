import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import kyThiSlice from "../../../toolkits/QuanLyDaoTao/QuanLyKyThi/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import DateInput from "../../../components/Form/dateinput.jsx";
import NumberInput from "../../../components/Form/numberinput.jsx";
import RadioInput from "../../../components/Form/radioinput.jsx"
import { DATE_FORMAT } from "../../../utils/common.js";
import dayjs from "dayjs";
const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedKyThi, pageSize, pageNumber } =
    useSelector((state) => state.kyThis);
  const optionTrangThai = [
    {value: true, label:"Đang diễn ra"},
    {value: false, label:"Đã kết thúc"}
  ]
  const handleModal = (_item) => {
    dispatch(kyThiSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let date = new dayjs(); 
    let item = Object.assign({}, _item);
    let year = date.format(DATE_FORMAT.YYYY);
    item.thoi_gian_to_chuc = item.thoi_gian_to_chuc===''?year:item.thoi_gian_to_chuc;
    dispatch(
      kyThiSlice.actions.handleKyThi({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedKyThi);
      clone[key] = event.target.value;
      dispatch(kyThiSlice.actions.updateSelectedKyThiInput(clone));
    }
  };

  const onRecordDateInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedKyThi);
      clone[key] = event.format(DATE_FORMAT.YYYY);
      dispatch(
        kyThiSlice.actions.updateSelectedKyThiInput(clone)
      );
    }
  };

  const onRecordNumbericChange = (key, event) => {
    let item = Object.assign({}, selectedKyThi)
    if (key) {
      item[key] = event
    }
    dispatch(kyThiSlice.actions.updateSelectedKyThiInput(item))
  }

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedKyThi?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedKyThi)
          : () => handleRecord(ACTION_NAME.CREATE, selectedKyThi)
      }
      title={selectedKyThi?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên kỳ thi"
        placeholder="Nhập vào tên kỳ thi"
        onChange={onRecordInputChange}
        property={"ten_ky_thi"}
        value={selectedKyThi?.ten_ky_thi}
      />
      <DateInput
        title="Thời gian tổ chức"
        format = {DATE_FORMAT.YYYY}
        placeholder="Nhập vào thời gian tổ chức"
        onChange={onRecordDateInputChange}
        property={"thoi_gian_to_chuc"}
        picker="year"
        value={selectedKyThi?.thoi_gian_to_chuc}
      />
      <TextInput
        title="Kết quả"
        placeholder="Nhập vào kết quả"
        onChange={onRecordInputChange}
        property={"ket_qua"}
        value={selectedKyThi?.ket_qua}
      />
      <RadioInput
        title="Trạng thái"
        onChange={onRecordInputChange}
        property={"trang_thai"}
        value={selectedKyThi?.trang_thai}
        defaultValue={true}
        option={optionTrangThai}
      />
    </CustomeModal>
  );
};

export default ModalItem;
