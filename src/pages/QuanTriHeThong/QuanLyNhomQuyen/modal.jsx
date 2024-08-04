import { useDispatch, useSelector } from "react-redux";
import CustomeModal from "../../../components/Form/modal";
import TextInput from "../../../components/Form/textinput";
import groupSlice from "../../../toolkits/QuanTriHeThong/Group/slice";
import { ACTION_NAME, GROUP_TYPE } from "../../../utils/common";
import SelectInput from "../../../components/Form/selectinput";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedGroup, pageSize, pageNumber } = useSelector(
    (state) => state.groups
  );

  const handleModal = (_item) => {
    dispatch(groupSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      groupSlice.actions.handleGroup({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedGroup);
      clone[key] = event.target.value;
      dispatch(groupSlice.actions.updateSelectedGroupInput(clone));
    }
  };

  const onRecordSelectedInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedGroup);
      clone[key] = event;
      dispatch(groupSlice.actions.updateSelectedGroupInput(clone));
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedGroup?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedGroup)
          : () => handleRecord(ACTION_NAME.CREATE, selectedGroup)
      }
      title={selectedGroup?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên nhóm quyền"
        placeholder="Nhập vào tên nhóm quyền"
        onChange={onRecordInputChange}
        property={"name"}
        value={selectedGroup?.name}
      />
      <TextInput
        title="Mô tả"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"description"}
        value={selectedGroup?.description}
      />
      <SelectInput
        title="Loại quyền người dùng"
        onChange={onRecordSelectedInputChange}
        property={"type"}
        value={selectedGroup?.type}
        options={GROUP_TYPE}
      />
    </CustomeModal>
  );
};

export default ModalItem;
