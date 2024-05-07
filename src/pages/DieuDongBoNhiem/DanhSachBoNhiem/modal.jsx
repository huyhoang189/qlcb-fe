import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import danhSachBoNhiemSlice from "../../../toolkits/DieuDongBoNhiem/DanhSachBoNhiem/slice.js";
import canBoCoBanSlice from "../../../toolkits/QuanLyCanBo/ThongTinCoBan/slice.js";
import chucDanhPhapLySlice from "../../../toolkits/QuanLyDanhMuc/ChucDanhPhapLy/slice.js";
import { ACTION_NAME, LOAI_CHUC_DANH_PHAP_LY } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import { useParams } from "react-router-dom";
import SelectInput from "../../../components/Form/selectinput.jsx";
import {useEffect, useState} from "react";

const ModalItem = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { ma_bo_nhiem } = params;
  const [optionListDaoTao, setOptionListDaoTao] = useState()
  const { danhSachBoNhiems, modalActive, selectedDanhSachBoNhiem, pageSize, pageNumber } =
    useSelector((state) => state.danhSachBoNhiems);
    const { chucDanhPhapLys} =
    useSelector((state) => state.chucDanhPhapLys);
  const {canBoCoBans} = useSelector(state => state.canBoCoBans)

  const handleModal = (_item) => {
    dispatch(danhSachBoNhiemSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    item.ma_bo_nhiem = ma_bo_nhiem
    dispatch(
      danhSachBoNhiemSlice.actions.handleDanhSachBoNhiem({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
        ma_bo_nhiem,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedDanhSachBoNhiem);
      clone[key] = event.target.value;
      dispatch(
        danhSachBoNhiemSlice.actions.updateSelectedDanhSachBoNhiemInput(clone)
      );
    }
  };

  const onRecordSelectInputChange = (key, event) => {
    if (key) {
        let clone = Object.assign({}, selectedDanhSachBoNhiem);
        clone[key] = event;
        dispatch(danhSachBoNhiemSlice.actions.updateSelectedDanhSachBoNhiemInput(clone));
    }
}

useEffect(() => {
  dispatch(canBoCoBanSlice.actions.getCanBoCoBans({
      pageSize: 1000,
      pageNumber: 1
  }))
  dispatch(
    chucDanhPhapLySlice.actions.getChucDanhPhapLys({
      pageSize: 1000,
      pageNumber: 1,
    })
  );
}, [dispatch]);

useEffect(()=> {
  const initialOption = canBoCoBans.map((e) => ({
    label: e?.so_hieu_quan_nhan + " -- "+ e?.ho_ten_khai_sinh + " -- "+ e?.don_vi,
    value: e?.id
}))
  let OptionCurrent =initialOption.map(e=>{
    if(danhSachBoNhiems.find(item => item.ma_can_bo === e.value))
    return {...e, disabled:"true"}
    else return {...e}
  })
  setOptionListDaoTao(OptionCurrent)
},[canBoCoBans,danhSachBoNhiems])

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedDanhSachBoNhiem?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedDanhSachBoNhiem)
          : () => handleRecord(ACTION_NAME.CREATE, selectedDanhSachBoNhiem)
      }
      title={
        selectedDanhSachBoNhiem?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"
      }
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <SelectInput
            title="Cán bộ"
            onChange={onRecordSelectInputChange}
            property={"ma_hoc_vien"}
            value={selectedDanhSachBoNhiem?.ma_hoc_vien}
            isNull={false}
            options={optionListDaoTao}
        />
      <SelectInput
            title="Chức danh pháp lý bổ nhiệm"
            onChange={onRecordSelectInputChange}
            property={"ma_chuc_danh"}
            value={selectedDanhSachBoNhiem?.ma_chuc_danh}
            isNull={false}
            options={chucDanhPhapLys.map((e) => ({
              label: e?.ten_chuc_danh,
              value: e?.id
          }))}
        />
      <SelectInput
        title="Loại chức danh bổ nhiệm"
        onChange={onRecordSelectInputChange}
        property={"loai_bo_nhiem"}
        value={selectedDanhSachBoNhiem?.loai_bo_nhiem}
        options={LOAI_CHUC_DANH_PHAP_LY}
        isNull={false}
      />
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedDanhSachBoNhiem?.ghi_chu}
      />
    </CustomeModal>
  );
};

export default ModalItem;
