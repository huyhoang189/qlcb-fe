import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import keHoachSlice from "../../../toolkits/QuanLyDaoTao/QuanLyKeHoach/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import DateInput from "../../../components/Form/dateinput.jsx";
import NumberInput from "../../../components/Form/numberinput.jsx";
import { DATE_FORMAT } from "../../../utils/common";
import dayjs from "dayjs";
const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedKeHoach, pageSize, pageNumber } =
    useSelector((state) => state.keHoachs);

  const handleModal = (_item) => {
    dispatch(keHoachSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let date = new dayjs(); 
    let item = Object.assign({}, _item);
    let year = date.format(DATE_FORMAT.YYYY);
    item.nam_hoc = item.nam_hoc===''?year:item.nam_hoc;
    item.chi_tieu = item.chi_tieu.toString();
    item.thuc_hien = item.thuc_hien.toString();
    dispatch(
      keHoachSlice.actions.handleKeHoach({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedKeHoach);
      clone[key] = event.target.value;
      dispatch(keHoachSlice.actions.updateSelectedKeHoachInput(clone));
    }
  };

  const onRecordDateInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedKeHoach);
      clone[key] = event.format(DATE_FORMAT.YYYY);
      dispatch(
        keHoachSlice.actions.updateSelectedKeHoachInput(clone)
      );
    }
  };

  const onRecordNumbericChange = (key, event) => {
    let item = Object.assign({}, selectedKeHoach)
    if (key) {
      item[key] = event
    }
    dispatch(keHoachSlice.actions.updateSelectedKeHoachInput(item))
  }

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedKeHoach?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedKeHoach)
          : () => handleRecord(ACTION_NAME.CREATE, selectedKeHoach)
      }
      title={selectedKeHoach?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <DateInput
        title="Năm học"
        format = {DATE_FORMAT.YYYY}
        placeholder="Nhập vào năm học"
        onChange={onRecordDateInputChange}
        property={"nam_hoc"}
        picker="year"
        value={selectedKeHoach?.nam_hoc}
      />
      <NumberInput
        value={selectedKeHoach?.chi_tieu}
        property="chi_tieu"
        onChange={onRecordNumbericChange}
        title="Chỉ tiêu"
        min={0}
        max={2000}
    />
    <NumberInput
        value={selectedKeHoach?.thuc_hien}
        property="thuc_hien"
        onChange={onRecordNumbericChange}
        title="Thực hiện"
        min={0}
        max={2000}
    />
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedKeHoach?.ghi_chu}
      />
    </CustomeModal>
  );
};

export default ModalItem;
