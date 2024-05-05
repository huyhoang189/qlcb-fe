import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import chiTietKeHoachSlice from "../../../toolkits/QuanLyDaoTao/ChiTietKeHoach/slice.js";
import truongHocSlice from "../../../toolkits/QuanLyDanhMuc/TruongHoc/slice.js";
import chuyenNganhSlice from "../../../toolkits/QuanLyDanhMuc/ChuyenNganh/slice.js";
import loaiHinhDaoTaoSlice from "../../../toolkits/QuanLyDanhMuc/LoaiHinhDaoTao/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import DateInput from "../../../components/Form/dateinput.jsx";
import {useEffect} from "react";
import SelectInput from "../../../components/Form/selectinput.jsx";
import { useParams } from "react-router-dom";
import { DATE_FORMAT } from "../../../utils/common";
import dayjs from "dayjs";
const ModalItem = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { ma_ke_hoach } = params;
  const { modalActive, selectedChiTietKeHoach, pageSize, pageNumber } =
    useSelector((state) => state.chiTietKeHoachs);
  const {truongHocs} = useSelector(state => state.truongHocs)
  const {chuyenNganhs} = useSelector(state => state.chuyenNganhs)
  const {loaiHinhDaoTaos} = useSelector(state => state.loaiHinhDaoTaos)
  const handleModal = (_item) => {
    dispatch(chiTietKeHoachSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let date = new dayjs(); 
    let item = Object.assign({}, _item);
    date = date.format(DATE_FORMAT.DDMMYYYY);
    item.thoi_gian_bat_dau = item.thoi_gian_bat_dau===''?date:item.thoi_gian_bat_dau;
    item.thoi_gian_ket_thuc = item.thoi_gian_ket_thuc===''?date:item.thoi_gian_ket_thuc;
    item.ma_ke_hoach = ma_ke_hoach
    dispatch(
      chiTietKeHoachSlice.actions.handleChiTietKeHoach({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedChiTietKeHoach);
      clone[key] = event.target.value;
      dispatch(chiTietKeHoachSlice.actions.updateSelectedChiTietKeHoachInput(clone));
    }
  };

  const onRecordDateInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedChiTietKeHoach);
      clone[key] = event.format(DATE_FORMAT.DDMMYYYY);
      dispatch(
        chiTietKeHoachSlice.actions.updateSelectedChiTietKeHoachInput(clone)
      );
    }
  };

  const onRecordSelectInputChange = (key, event) => {
    if (key) {
        let clone = Object.assign({}, selectedChiTietKeHoach);
        clone[key] = event;
        dispatch(chiTietKeHoachSlice.actions.updateSelectedChiTietKeHoachInput(clone));
    }
}

  const onRecordNumbericChange = (key, event) => {
    let item = Object.assign({}, selectedChiTietKeHoach)
    if (key) {
      item[key] = event
    }
    dispatch(chiTietKeHoachSlice.actions.updateSelectedChiTietKeHoachInput(item))
  }

  //side effect
  useEffect(() => {
    dispatch(truongHocSlice.actions.getTruongHocs({
        pageSize: 1000,
        pageNumber: 1
    }))
    dispatch(chuyenNganhSlice.actions.getChuyenNganhs({
      pageSize: 1000,
      pageNumber: 1
  }))
  dispatch(loaiHinhDaoTaoSlice.actions.getLoaiHinhDaoTaos({
    pageSize: 1000,
    pageNumber: 1
}))
}, [dispatch]);

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedChiTietKeHoach?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedChiTietKeHoach)
          : () => handleRecord(ACTION_NAME.CREATE, selectedChiTietKeHoach)
      }
      title={selectedChiTietKeHoach?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <SelectInput
            title="Trường học"
            onChange={onRecordSelectInputChange}
            property={"ma_truong_hoc"}
            value={selectedChiTietKeHoach?.ma_truong_hoc}
            isNull={false}
            options={truongHocs.map((e) => ({
                label: e?.ten_truong,
                value: e?.id
            }))}
        />
        <SelectInput
            title="Chuyên ngành"
            onChange={onRecordSelectInputChange}
            property={"ma_chuyen_nganh"}
            value={selectedChiTietKeHoach?.ma_chuyen_nganh}
            isNull={false}
            options={chuyenNganhs.map((e) => ({
                label: e?.ten,
                value: e?.id
            }))}
        />
        <SelectInput
            title="Loại hình đào tạo"
            onChange={onRecordSelectInputChange}
            property={"ma_loai_hinh_dao_tao"}
            value={selectedChiTietKeHoach?.ma_loai_hinh_dao_tao}
            isNull={false}
            options={loaiHinhDaoTaos.map((e) => ({
                label: e?.ten,
                value: e?.id
            }))}
        />
     <DateInput
        title="Thời gian bắt đầu"
        placeholder="Nhập vào thời gian"
        onChange={onRecordDateInputChange}
        property={"thoi_gian_bat_dau"}
        value={selectedChiTietKeHoach?.thoi_gian_bat_dau}
      />
      <DateInput
        title="Thời gian kết thúc"
        placeholder="Nhập vào thời gian"
        onChange={onRecordDateInputChange}
        property={"thoi_gian_ket_thuc"}
        value={selectedChiTietKeHoach?.thoi_gian_ket_thuc}
      />
    </CustomeModal>
  );
};

export default ModalItem;
