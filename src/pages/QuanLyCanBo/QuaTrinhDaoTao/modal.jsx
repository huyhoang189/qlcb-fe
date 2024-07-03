import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import quaTrinhDaoTaoSlice from "../../../toolkits/QuanLyCanBo/QuaTrinhDaoTao/slice.js";
import truongHocSlice from "../../../toolkits/QuanLyDanhMuc/TruongHoc/slice.js";
import loaiHinhDaoTaoSlice from "../../../toolkits/QuanLyDanhMuc/LoaiHinhDaoTao/slice.js";
import chuyenNganhSlice from "../../../toolkits/QuanLyDanhMuc/ChuyenNganh/slice.js";
import { ACTION_NAME, DATE_FORMAT } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import { useEffect } from "react";
import SelectInput from "../../../components/Form/selectinput.jsx";
import { useParams } from "react-router-dom";
import DateInput from "../../../components/Form/dateinput.jsx";
import dayjs from "dayjs";
const ModalItem = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { ma_can_bo } = params;
  const { modalActive, selectedQuaTrinhDaoTao, pageSize, pageNumber } =
    useSelector((state) => state.quaTrinhDaoTaos);
  const { chuyenNganhs } = useSelector((state) => state.chuyenNganhs);
  const { loaiHinhDaoTaos } = useSelector((state) => state.loaiHinhDaoTaos);
  const { truongHocs } = useSelector((state) => state.truongHocs);

  const handleModal = (_item) => {
    dispatch(quaTrinhDaoTaoSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    console.log(item,"tt")
    let date = new dayjs();
    date = date.format(DATE_FORMAT.YYYYMMDD);
    item.thoi_gian_bat_dau =
      item.thoi_gian_bat_dau === "" || item.thoi_gian_bat_dau? date : item.thoi_gian_bat_dau;
    item.thoi_gian_ket_thuc =
      item.thoi_gian_ket_thuc === "" || item.thoi_gian_ket_thuc === null
        ? date
        : item.thoi_gian_ket_thuc;
    dispatch(
      quaTrinhDaoTaoSlice.actions.handleQuaTrinhDaoTao({
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

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedQuaTrinhDaoTao);
      clone[key] = event.target.value;
      dispatch(
        quaTrinhDaoTaoSlice.actions.updateSelectedQuaTrinhDaoTaoInput(clone)
      );
    }
  };

  const onRecordSelectInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedQuaTrinhDaoTao);
      clone[key] = event;
      dispatch(
        quaTrinhDaoTaoSlice.actions.updateSelectedQuaTrinhDaoTaoInput(clone)
      );
    }
  };

  const onRecordDateInputChange = (key, event) => {
    if (key) {

      let clone = Object.assign({}, selectedQuaTrinhDaoTao);
      clone[key] = event.format(DATE_FORMAT.YYYYMMDD);
      console.log(clone,"clone")
      dispatch(
        quaTrinhDaoTaoSlice.actions.updateSelectedQuaTrinhDaoTaoInput(clone)
      );
    }
  };

  //side effect
  useEffect(() => {
    if (modalActive) {
      dispatch(
        truongHocSlice.actions.getTruongHocs({
          pageSize: 1000,
          pageNumber: 1,
        })
      );
      dispatch(
        chuyenNganhSlice.actions.getChuyenNganhs({
          pageSize: 1000,
          pageNumber: 1,
        })
      );
      dispatch(
        loaiHinhDaoTaoSlice.actions.getLoaiHinhDaoTaos({
          pageSize: 1000,
          pageNumber: 1,
        })
      );
    }
  }, [dispatch, modalActive]);

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedQuaTrinhDaoTao?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedQuaTrinhDaoTao)
          : () => handleRecord(ACTION_NAME.CREATE, selectedQuaTrinhDaoTao)
      }
      title={
        selectedQuaTrinhDaoTao?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"
      }
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <SelectInput
        title="Trường học"
        onChange={onRecordSelectInputChange}
        property={"ma_truong_hoc"}
        value={selectedQuaTrinhDaoTao?.ma_truong_hoc}
        options={truongHocs.map((e) => ({
          label: e?.ten_truong,
          value: e?.id,
        }))}
        isNull={false}
      />
      <SelectInput
        title="Loại hình đào tạo"
        onChange={onRecordSelectInputChange}
        property={"ma_loai_hinh_dao_tao"}
        value={selectedQuaTrinhDaoTao?.ma_loai_hinh_dao_tao}
        options={loaiHinhDaoTaos.map((e) => ({
          label: e?.ten,
          value: e?.id,
        }))}
        isNull={false}
      />
      <SelectInput
        title="Chuyên ngành"
        onChange={onRecordSelectInputChange}
        property={"ma_chuyen_nganh"}
        value={selectedQuaTrinhDaoTao?.ma_chuyen_nganh}
        options={chuyenNganhs.map((e) => ({
          label: e?.ten,
          value: e?.id,
        }))}
        isNull={false}
      />

      <DateInput
        title="Thời gian bắt đầu"
        placeholder="Nhập vào thời gian bắt đầu"
        onChange={onRecordDateInputChange}
        property={"thoi_gian_bat_dau"}
        value={selectedQuaTrinhDaoTao?.thoi_gian_bat_dau}
      />

      <DateInput
        title="Thời gian kết thúc"
        placeholder="Nhập vào thời gian kết thúc"
        onChange={onRecordDateInputChange}
        property={"thoi_gian_ket_thuc"}
        value={selectedQuaTrinhDaoTao?.thoi_gian_ket_thuc}
      />

      <TextInput
        title="Xếp loại"
        placeholder="Nhập vào xếp loại"
        onChange={onRecordInputChange}
        property={"xep_loai"}
        value={selectedQuaTrinhDaoTao?.xep_loai}
      />
    </CustomeModal>
  );
};

export default ModalItem;
