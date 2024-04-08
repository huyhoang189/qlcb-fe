import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import donViSlice from "../../../toolkits/quanLyDanhMuc/donVi/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import { useEffect, useState } from "react";
import NumberInput from "../../../components/Form/numberinput.jsx";
import { generateTrees } from "../../../utils/tree.js";
import TreeInput from "../../../components/Form/treeInput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedDonVi, pageSize, pageNumber, donVis } =
    useSelector((state) => state.donVis);
  const [tree, setTree] = useState([]);
  const handleModal = (_item) => {
    dispatch(donViSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      donViSlice.actions.handleDonVi({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedDonVi);
      clone[key] = event.target.value;
      dispatch(donViSlice.actions.updateSelectedDonViInput(clone));
    }
  };

  const onRecordSelectInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedDonVi);
      clone[key] = event;
      dispatch(donViSlice.actions.updateSelectedDonViInput(clone));
    }
  };

  //side effect
  useEffect(() => {
    if (modalActive)
      dispatch(
        donViSlice.actions.getDonVis({
          pageNumber: 1,
          pageSize: 10000,
        })
      );
  }, [dispatch, modalActive]);

  useEffect(() => {
    if (donVis) setTree(generateTrees(donVis));
  }, [donVis]);

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedDonVi?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedDonVi)
          : () => handleRecord(ACTION_NAME.CREATE, selectedDonVi)
      }
      title={selectedDonVi?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Mã đơn vị"
        placeholder="Nhập vào mã đơn vị"
        onChange={onRecordInputChange}
        property={"ma_don_vi"}
        value={selectedDonVi?.ma_don_vi}
      />
      <TextInput
        title="Tên đơn vị"
        placeholder="Nhập vào tên đơn vị"
        onChange={onRecordInputChange}
        property={"ten_don_vi"}
        value={selectedDonVi?.ten_don_vi}
      />
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedDonVi?.ghi_chu}
      />

      <NumberInput
        title="Số thứ tự"
        onChange={onRecordSelectInputChange}
        property={"so_thu_tu"}
        value={selectedDonVi?.so_thu_tu}
        max={1000}
      />

      <TreeInput
        title="Đơn vị cha"
        onChange={onRecordSelectInputChange}
        property={"ma_don_vi_cha"}
        value={selectedDonVi?.ma_don_vi_cha}
        options={tree}
      />
    </CustomeModal>
  );
};

export default ModalItem;
