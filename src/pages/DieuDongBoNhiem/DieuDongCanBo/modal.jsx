import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import dieuDongCanBoSlice from "../../../toolkits/DieuDongBoNhiem/DieuDongCanBo/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { generateTrees } from "../../../utils/tree.js";
import TreeInput from "../../../components/Form/treeInput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();

  const { modalActive, selectedDieuDongCanBo, pageSize, pageNumber } =
    useSelector((state) => state.dieuDongCanBos);

  const { donVis } = useSelector((state) => state.donVis);
  const handleModal = (_item) => {
    dispatch(dieuDongCanBoSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      dieuDongCanBoSlice.actions.handleDieuDongCanBo({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedDieuDongCanBo);
      clone[key] = event.target.value;
      dispatch(
        dieuDongCanBoSlice.actions.updateSelectedDieuDongCanBoInput(clone)
      );
    }
  };

  const onRecordSelectInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedDieuDongCanBo);
      clone[key] = event;
      dispatch(
        dieuDongCanBoSlice.actions.updateSelectedDieuDongCanBoInput(clone)
      );
    }
  };

  const treeData = useMemo(() => generateTrees(donVis), [donVis]);
  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedDieuDongCanBo?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedDieuDongCanBo)
          : () => handleRecord(ACTION_NAME.CREATE, selectedDieuDongCanBo)
      }
      title={
        selectedDieuDongCanBo?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"
      }
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TreeInput
        title="Đơn vị"
        onChange={onRecordSelectInputChange}
        property={"ma_don_vi"}
        value={selectedDieuDongCanBo?.ma_don_vi}
        options={treeData}
      />
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedDieuDongCanBo?.ghi_chu}
      />
    </CustomeModal>
  );
};

export default ModalItem;
