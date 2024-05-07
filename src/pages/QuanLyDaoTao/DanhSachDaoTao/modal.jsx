import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import danhSachDaoTaoSlice from "../../../toolkits/QuanLyDaoTao/DanhSachDaoTao/slice.js";
import canBoCoBanSlice from "../../../toolkits/QuanLyCanBo/ThongTinCoBan/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import SelectInput from "../../../components/Form/selectinput.jsx";
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
const ModalItem = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { ma_chi_tiet_ke_hoach } = params;
  const { danhSachDaoTaos, modalActive, selectedDanhSachDaoTao, pageSize, pageNumber } =
    useSelector((state) => state.danhSachDaoTaos);
  const {canBoCoBans} = useSelector(state => state.canBoCoBans)
  const [optionListDaoTao, setOptionListDaoTao] = useState()
  const handleModal = (_item) => {
    dispatch(danhSachDaoTaoSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    item.ma_chi_tiet = ma_chi_tiet_ke_hoach;
    dispatch(
      danhSachDaoTaoSlice.actions.handleDanhSachDaoTao({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
        ma_chi_tiet_ke_hoach,
      })
    );
  };

  const onRecordSelectInputChange = (key, event) => {
    if (key) {
        let clone = Object.assign({}, selectedDanhSachDaoTao);
        clone[key] = event;
        dispatch(danhSachDaoTaoSlice.actions.updateSelectedDanhSachDaoTaoInput(clone));
    }
}

//side effect
useEffect(() => {
  dispatch(canBoCoBanSlice.actions.getCanBoCoBans({
      pageSize: 1000,
      pageNumber: 1
  }))
}, [dispatch]);
useEffect(()=> {
  const initialOption = canBoCoBans.map((e) => ({
    label: e?.so_hieu_quan_nhan + " -- "+ e?.ho_ten_khai_sinh + " -- "+ e?.don_vi,
    value: e?.id
}))
  let OptionCurrent =initialOption.map(e=>{
    if(danhSachDaoTaos.find(item => item.ma_hoc_vien === e.value))
    return {...e, disabled:"true"}
    else return {...e}
  })
  setOptionListDaoTao(OptionCurrent)
},[canBoCoBans,danhSachDaoTaos])
  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedDanhSachDaoTao?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedDanhSachDaoTao)
          : () => handleRecord(ACTION_NAME.CREATE, selectedDanhSachDaoTao)
      }
      title={selectedDanhSachDaoTao?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <SelectInput
            title="Họ và tên"
            onChange={onRecordSelectInputChange}
            property={"ma_hoc_vien"}
            value={selectedDanhSachDaoTao?.ma_hoc_vien}
            isNull={false}
            options={optionListDaoTao}
        />
    </CustomeModal>
  );
};

export default ModalItem;
