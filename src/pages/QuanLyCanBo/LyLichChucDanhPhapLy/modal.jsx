import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import lyLichChucDanhPhapLySlice from "../../../toolkits/QuanLyCanBo/LyLichChucDanhPhapLy/slice.js";
import chucDanhPhapLySlice from "../../../toolkits/QuanLyDanhMuc/ChucDanhPhapLy/slice.js";
import donViSlice from "../../../toolkits/QuanLyDanhMuc/DonVi/slice.js";
import { useEffect, useState } from "react";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import DateInput from "../../../components/Form/dateinput.jsx";
import SelectInput from "../../../components/Form/selectinput.jsx";
import { DATE_FORMAT } from "../../../utils/common.js";
import { generateTrees } from "../../../utils/tree.js";
import TreeInput from "../../../components/Form/treeInput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { ma_can_bo } = params;
  const { modalActive, selectedLyLichChucDanhPhapLy, pageSize, pageNumber } =
    useSelector((state) => state.lyLichChucDanhPhapLys);
  const { chucDanhPhapLys } = useSelector((state) => state.chucDanhPhapLys);
  const { donVis } = useSelector((state) => state.donVis);

  const [tree, setTree] = useState([]);
  const handleModal = (_item) => {
    dispatch(lyLichChucDanhPhapLySlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let date = new dayjs();
    let item = Object.assign({}, _item);
    date = date.format(DATE_FORMAT.YYYYMMDD);
    item.thoi_gian_bat_dau =
      item.thoi_gian_bat_dau === "" ? date : item.thoi_gian_bat_dau;
    item.thoi_gian_ket_thuc =
      item.thoi_gian_ket_thuc === "" || item.thoi_gian_ket_thuc === null
        ? date
        : item.thoi_gian_ket_thuc;
    dispatch(
      lyLichChucDanhPhapLySlice.actions.handleLyLichChucDanhPhapLy({
        item: {
          ...item,
          ma_can_bo,
        },
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordSelectInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedLyLichChucDanhPhapLy);
      clone[key] = event;
      dispatch(
        lyLichChucDanhPhapLySlice.actions.updateSelectedLyLichChucDanhPhapLyInput(
          clone
        )
      );
    }
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedLyLichChucDanhPhapLy);
      clone[key] = event.target.value;
      dispatch(
        lyLichChucDanhPhapLySlice.actions.updateSelectedLyLichChucDanhPhapLyInput(
          clone
        )
      );
    }
  };
  const onRecordDateInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedLyLichChucDanhPhapLy);
      clone[key] = event.format(DATE_FORMAT.YYYYMMDD);
      dispatch(
        lyLichChucDanhPhapLySlice.actions.updateSelectedLyLichChucDanhPhapLyInput(
          clone
        )
      );
    }
  };

  const requestTimeEnd = () =>
    selectedLyLichChucDanhPhapLy?.id && (
      <DateInput
        title="Thời gian kết thúc"
        placeholder="Nhập vào thời gian kết thúc"
        onChange={onRecordDateInputChange}
        property={"thoi_gian_ket_thuc"}
        value={selectedLyLichChucDanhPhapLy?.thoi_gian_ket_thuc}
      />
    );
  //side effect

  //side effect
  useEffect(() => {
    if (modalActive)
      dispatch(
        chucDanhPhapLySlice.actions.getChucDanhPhapLys({
          pageSize: 1000,
          pageNumber: 1,
        })
      );
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
        selectedLyLichChucDanhPhapLy?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedLyLichChucDanhPhapLy)
          : () => handleRecord(ACTION_NAME.CREATE, selectedLyLichChucDanhPhapLy)
      }
      title={
        selectedLyLichChucDanhPhapLy?.id
          ? "Cập nhật dữ liệu"
          : "Thêm mới dữ liệu"
      }
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <SelectInput
        title="Chức danh"
        onChange={onRecordSelectInputChange}
        property={"ma_chuc_danh"}
        value={selectedLyLichChucDanhPhapLy?.ma_chuc_danh}
        isNull={false}
        options={chucDanhPhapLys.map((e) => ({
          label: e?.ten_chuc_danh,
          value: e?.id,
        }))}
      />

      <TreeInput
        title="Đơn vị"
        onChange={onRecordSelectInputChange}
        property={"ma_don_vi"}
        value={selectedLyLichChucDanhPhapLy?.ma_don_vi}
        options={tree}
      />

      <DateInput
        title="Thời gian bắt đầu"
        placeholder="Nhập vào thời gian bắt đầu"
        onChange={onRecordDateInputChange}
        property={"thoi_gian_bat_dau"}
        value={selectedLyLichChucDanhPhapLy?.thoi_gian_bat_dau}
      />

      <DateInput
        title="Thời gian kết thúc"
        placeholder="Nhập vào thời gian kết thúc"
        onChange={onRecordDateInputChange}
        property={"thoi_gian_ket_thuc"}
        value={selectedLyLichChucDanhPhapLy?.thoi_gian_ket_thuc}
      />
      {requestTimeEnd()}
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedLyLichChucDanhPhapLy?.ghi_chu}
      />
    </CustomeModal>
  );
};

export default ModalItem;
