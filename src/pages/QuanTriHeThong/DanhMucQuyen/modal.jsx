import { useDispatch, useSelector } from "react-redux";
import CustomeModal from "../../../components/Form/modal";
import TextInput from "../../../components/Form/textinput";
import roleSlice from "../../../toolkits/QuanTriHeThong/Role/slice";
import { ACTION_NAME } from "../../../utils/common";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedRole, pageSize, pageNumber } = useSelector(
    (state) => state.roles
  );

  const handleModal = (_item) => {
    dispatch(roleSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      roleSlice.actions.handleRole({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedRole);
      clone[key] = event.target.value;
      dispatch(roleSlice.actions.updateSelectedRoleInput(clone));
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedRole?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedRole)
          : () => handleRecord(ACTION_NAME.CREATE, selectedRole)
      }
      title={selectedRole?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên quyền"
        placeholder="Nhập vào tên chức danh"
        onChange={onRecordInputChange}
        property={"name"}
        value={selectedRole?.name}
      />
      <TextInput
        title="Mô tả"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"description"}
        value={selectedRole?.description}
      />
    </CustomeModal>
  );
};

export default ModalItem;
