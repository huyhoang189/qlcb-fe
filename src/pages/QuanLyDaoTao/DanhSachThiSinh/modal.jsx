import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import danhSachThiSinhSlice from "../../../toolkits/QuanLyDaoTao/DanhSachThiSinh/slice.js";
import canBoCoBanSlice from "../../../toolkits/QuanLyCanBo/ThongTinCoBan/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import SelectInput from "../../../components/Form/selectinput.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextInput from "../../../components/Form/textinput.jsx";
const ModalItem = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { ma_ky_thi } = params;
  const {
    danhSachThiSinhs,
    modalActive,
    selectedDanhSachThiSinh,
    pageSize,
    pageNumber,
  } = useSelector((state) => state.danhSachThiSinhs);
  const { canBoCoBans } = useSelector((state) => state.canBoCoBans);
  const [optionListDaoTao, setOptionListDaoTao] = useState();
  const handleModal = (_item) => {
    dispatch(danhSachThiSinhSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      danhSachThiSinhSlice.actions.handleDanhSachThiSinh({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
        ma_ky_thi,
      })
    );
  };

  const onRecordSelectInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedDanhSachThiSinh);
      clone[key] = event;
      dispatch(
        danhSachThiSinhSlice.actions.updateSelectedDanhSachThiSinhInput(clone)
      );
    }
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedDanhSachThiSinh);
      clone[key] = event.target.value;
      dispatch(
        danhSachThiSinhSlice.actions.updateSelectedDanhSachThiSinhInput(clone)
      );
    }
  };

  //side effect
  useEffect(() => {
    dispatch(
      canBoCoBanSlice.actions.getCanBoCoBans({
        pageSize: 1000,
        pageNumber: 1,
      })
    );
  }, [dispatch]);
  useEffect(() => {
    const initialOption = canBoCoBans.map((e) => ({
      label:
        e?.so_hieu_quan_nhan + " / " + e?.ho_ten_khai_sinh + " / " + e?.don_vi?.mo_ta_day_du,
      value: e?.id,
    }));
    let OptionCurrent = initialOption.map((e) => {
      if (danhSachThiSinhs.find((item) => item.ma_hoc_vien === e.value))
        return { ...e, disabled: "true" };
      else return { ...e };
    });
    setOptionListDaoTao(OptionCurrent);
  }, [canBoCoBans, danhSachThiSinhs]);
  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedDanhSachThiSinh?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedDanhSachThiSinh)
          : () => handleRecord(ACTION_NAME.CREATE, selectedDanhSachThiSinh)
      }
      title={
        selectedDanhSachThiSinh?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"
      }
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <SelectInput
        title="Họ và tên"
        onChange={onRecordSelectInputChange}
        property={"ma_hoc_vien"}
        value={selectedDanhSachThiSinh?.ma_hoc_vien}
        isNull={false}
        options={optionListDaoTao}
      />

      <TextInput
        title="Kết quả"
        placeholder="Nhập vào kết quả"
        onChange={onRecordInputChange}
        property={"ket_qua"}
        value={selectedDanhSachThiSinh?.ket_qua}
      />
      <TextInput
        title="Nội dung thi"
        placeholder="Nhập vào nội dung thi"
        onChange={onRecordInputChange}
        property={"noi_dung_thi"}
        value={selectedDanhSachThiSinh?.noi_dung_thi}
      />
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedDanhSachThiSinh?.ghi_chu}
      />
    </CustomeModal>
  );
};

export default ModalItem;
