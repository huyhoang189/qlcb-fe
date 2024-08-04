import { useDispatch, useSelector } from "react-redux";
import CustomeModal from "../../../components/Form/modal";
import TextInput from "../../../components/Form/textinput";
import SelectInput from "../../../components/Form/selectinput";
import userSlice from "../../../toolkits/QuanTriHeThong/User/slice";
import groupSlice from "../../../toolkits/QuanTriHeThong/Group/slice";
import { ACTION_NAME } from "../../../utils/common";
import PasswordInput from "../../../components/Form/passwordinput";
import { useEffect } from "react";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedUser, pageSize, pageNumber } = useSelector(
    (state) => state.users
  );

  const { groups } = useSelector((state) => state.groups);

  const handleModal = (_item) => {
    dispatch(userSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      userSlice.actions.handleUser({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedUser);
      clone[key] = event.target.value;
      dispatch(userSlice.actions.updateSelectedUserInput(clone));
    }
  };

  const onRecordSelectedInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedUser);
      clone[key] = event;
      dispatch(userSlice.actions.updateSelectedUserInput(clone));
    }
  };

  useEffect(() => {
    if (modalActive) {
      dispatch(
        groupSlice.actions.getGroups({
          pageSize: 1000,
        })
      );
    }
  }, [modalActive]);

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedUser?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedUser)
          : () => handleRecord(ACTION_NAME.CREATE, selectedUser)
      }
      title={selectedUser?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên người dùng"
        placeholder="Nhập vào tên người dùng"
        onChange={onRecordInputChange}
        property={"full_name"}
        value={selectedUser?.full_name}
      />
      <TextInput
        title="Tên tài khoản"
        placeholder="Nhập vào tên tài khoản"
        onChange={onRecordInputChange}
        property={"user_name"}
        value={selectedUser?.user_name}
      />

      <PasswordInput
        title="Mật khẩu"
        placeholder="Nhập nhập khẩu"
        onChange={onRecordInputChange}
        property={"password"}
        value={selectedUser?.password}
      />

      <PasswordInput
        title="Nhập lại mật khẩu"
        placeholder="Nhập lại mật khẩu"
        onChange={onRecordInputChange}
        property={"repassword"}
        value={selectedUser?.repassword}
      />

      <SelectInput
        title="Nhóm quyền"
        onChange={onRecordSelectedInputChange}
        property={"group_id"}
        value={selectedUser?.group_id}
        options={groups.map((e) => ({
          label: e?.name,
          value: e?.id,
        }))}
      />
    </CustomeModal>
  );
};

export default ModalItem;
