import CustomeModal from "../../../components/Form/modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import kyLuatSlice from "../../../toolkits/QuanLyCanBo/KyLuat/slice.js"
import {ACTION_NAME} from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import SelectInput from "../../../components/Form/selectinput.jsx";
import dayjs from "dayjs";
import hinhThucKhenThuongSlice from "../../../toolkits/QuanLyDanhMuc/HinhThucKhenThuong/slice.js";
import loaiDanhHieuThiDuaSlice from "../../../toolkits/QuanLyDanhMuc/LoaiDanhHieuThiDua/slice.js";
import {useParams} from "react-router-dom";
import DateInput from "../../../components/Form/dateinput.jsx";
import { DATE_FORMAT } from "../../../utils/common";
import {useEffect} from "react";
const ModalItem = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const {ma_can_bo} = params
    const {modalActive, selectedKyLuat, pageSize, pageNumber} = useSelector(state => state.kyLuats)
    const handleModal = (_item) => {
        dispatch(kyLuatSlice.actions.toggleModal(_item))
    }
    const {hinhThucKhenThuongs} = useSelector(state => state.hinhThucKhenThuongs)
    const {loaiDanhHieuThiDuas} = useSelector(state => state.loaiDanhHieuThiDuas)
    const handleRecord = (_actionName, _item) => {
        let date = new dayjs();
        let item = Object.assign({}, _item);
        date = date.format(DATE_FORMAT.YYYYMMDD);
        item.thoi_gian = item.thoi_gian===''?date:item.thoi_gian;
        dispatch(
            kyLuatSlice.actions.handleKyLuat({
                item: {
                    ...item,
                    ma_can_bo
                },
                actionName: _actionName,
                pageSize: pageSize,
                pageNumber: pageNumber,

            })
        );
    }

    const onRecordInputChange = (key, event) => {
        if (key) {
            let clone = Object.assign({}, selectedKyLuat);
            clone[key] = event.target.value;
            dispatch(kyLuatSlice.actions.updateSelectedKyLuatInput(clone));
        }
    }
    const onRecordDateInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedKyLuat);
          clone[key] = event.format(DATE_FORMAT.YYYYMMDD);
          dispatch(
            kyLuatSlice.actions.updateSelectedKyLuatInput(clone)
          );
        }
      };

      const onRecordSelectInputChange = (key, event) => {
        if (key) {
            let clone = Object.assign({}, selectedKyLuat);
            clone[key] = event;
            dispatch(selectedKyLuat.actions.updateSelectedKyLuatInput(clone));
        }
    }

    //side effect
    useEffect(() => {
        dispatch(hinhThucKhenThuongSlice.actions.getHinhThucKhenThuongs({
            pageSize: 1000,
            pageNumber: 1
        }))
    }, [dispatch]);

    useEffect(() => {
        dispatch(loaiDanhHieuThiDuaSlice.actions.getLoaiDanhHieuThiDuas({
            pageSize: 1000,
            pageNumber: 1
        }))
    }, [dispatch]);
    return <CustomeModal
        open={modalActive}
        onCancel={() => handleModal(null)}
        onOk={
            selectedKyLuat?.id
                ? () => handleRecord(ACTION_NAME.UPDATE, selectedKyLuat)
                : () => handleRecord(ACTION_NAME.CREATE, selectedKyLuat)
        }
        title={selectedKyLuat?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
        okText="Chấp nhận"
        cancelText="Từ chối"

    >
        {/* <TextInput
            title="Hình thức"
            placeholder="Nhập vào hình thức"
            onChange={onRecordInputChange}
            property={"hinh_thuc"}
            value={selectedKyLuat?.hinh_thuc}
        /> */}
        <SelectInput
        title="Hình thức khen thưởng"
        onChange={onRecordSelectInputChange}
        property={"ma_hinh_thuc_ky_luat"}
        value={selectedKyLuat?.ma_hinh_thuc_khen_thuong}
        options={hinhThucKhenThuongs.map((e) => ({
          label: e?.ten,
          value: e?.id,
        }))}
        isNull={false}
      />
      {/* <SelectInput
        title="Loại danh hiệu thi đua"
        onChange={onRecordSelectInputChange}
        property={"ma_loai_danh_hieu_thi_dua"}
        value={selectedKyLuat?.ma_loai_danh_hieu_thi_dua}
        options={loaiDanhHieuThiDuas.map((e) => ({
          label: e?.ten,
          value: e?.id,
        }))}
        isNull={false}
      /> */}
        <TextInput
            title="Nội dung"
            placeholder="Nhập vào nội dung"
            onChange={onRecordInputChange}
            property={"noi_dung"}
            value={selectedKyLuat?.noi_dung}
        />
        <TextInput
            title="Số quyết định"
            placeholder="Nhập vào số quyết định"
            onChange={onRecordInputChange}
            property={"so_quyet_dinh"}
            value={selectedKyLuat?.so_quyet_dinh}
        />
        <DateInput
        title="Thời gian"
        placeholder="Nhập vào thời gian"
        onChange={onRecordDateInputChange}
        property={"thoi_gian"}
        value={selectedKyLuat?.thoi_gian}
      />
        <TextInput
            title="Ghi chú"
            placeholder="Nhập vào ghi chú"
            onChange={onRecordInputChange}
            property={"ghi_chu"}
            value={selectedKyLuat?.ghi_chu}
        />
    </CustomeModal>
}


export default ModalItem