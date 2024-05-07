import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import dieuDongCanBoSlice from "../../../toolkits/DieuDongBoNhiem/DieuDongCanBo/slice.js";
import chucVuChinhQuyenSlice from "../../../toolkits/QuanLyDanhMuc/ChucVuChinhQuyen/slice.js";
import { ACTION_NAME, DATE_FORMAT } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { generateTrees } from "../../../utils/tree.js";
import TreeInput from "../../../components/Form/treeInput.jsx";
import DateInput from "../../../components/Form/dateinput.jsx";
import SelectInput from "../../../components/Form/selectinput.jsx";
import dayjs from "dayjs";
const ModalItem = () => {
  const dispatch = useDispatch();

  const {
    modalActive,
    selectedDieuDongCanBo,
    pageSize,
    pageNumber,
    selectedCanBo,
  } = useSelector((state) => state.dieuDongCanBos);

  const { donVis } = useSelector((state) => state.donVis);
  const { chucVuChinhQuyens } = useSelector((state) => state.chucVuChinhQuyens);

  const handleModal = (_item) => {
    dispatch(dieuDongCanBoSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    try {
      let item = Object.assign({}, _item);
      let date = new dayjs();
      date = date.format(DATE_FORMAT.DDMMYYYY);
      item.thoi_gian_bat_dau =
        item.thoi_gian_bat_dau === "" ? date : item.thoi_gian_bat_dau;
      dispatch(
        dieuDongCanBoSlice.actions.handleDieuDongCanBo({
          item: {
            ...item,
            ma_can_bo: selectedCanBo?.id,
          },
          actionName: _actionName,
          pageSize: pageSize,
          pageNumber: pageNumber,
        })
      );
    } catch (error) {
      console.log(error);
    }
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

  const onRecordDateInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedDieuDongCanBo);
      clone[key] = event.format(DATE_FORMAT.DDMMYYYY);
      dispatch(
        dieuDongCanBoSlice.actions.updateSelectedDieuDongCanBoInput(clone)
      );
    }
  };

  const treeData = useMemo(() => generateTrees(donVis), [donVis]);

  //side effect
  useEffect(() => {
    dispatch(
      chucVuChinhQuyenSlice.actions.getChucVuChinhQuyens({
        pageSize: 1000,
        pageNumber: 1,
      })
    );
  }, [dispatch]);

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={() => handleRecord(ACTION_NAME.CREATE, selectedDieuDongCanBo)}
      title={"Điều động cán bộ đến"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Cán bộ"
        value={selectedCanBo?.ho_ten_khai_sinh}
        disabled={true}
      />
      <TreeInput
        title="Chuyển đến"
        onChange={onRecordSelectInputChange}
        property={"ma_don_vi"}
        value={selectedDieuDongCanBo?.ma_don_vi}
        options={treeData}
        isNull={false}
      />

      <SelectInput
        title="Chức vụ"
        onChange={onRecordSelectInputChange}
        property={"ma_chuc_vu"}
        value={selectedDieuDongCanBo?.ma_chuc_vu}
        isNull={false}
        options={chucVuChinhQuyens.map((e) => ({
          label: e?.ten_chuc_vu,
          value: e?.id,
        }))}
      />
      <DateInput
        title="Thời gian bắt đầu"
        placeholder="Nhập vào thời gian bắt đầu"
        onChange={onRecordDateInputChange}
        property={"thoi_gian_bat_dau"}
        isNull={false}
        value={selectedDieuDongCanBo?.thoi_gian_bat_dau}
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
