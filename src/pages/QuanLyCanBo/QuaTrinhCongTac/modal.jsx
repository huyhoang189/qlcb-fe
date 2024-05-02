import CustomeModal from "../../../components/Form/modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import quaTrinhCongTacSlice from "../../../toolkits/QuanLyCanBo/QuaTrinhCongTac/slice.js"
import chucVuChinhQuyenSlice from "../../../toolkits/QuanLyDanhMuc/ChucVuChinhQuyen/slice.js";
import {useEffect} from "react";
import {ACTION_NAME} from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import dayjs from "dayjs";
import {useParams} from "react-router-dom";
import DateInput from "../../../components/Form/dateinput.jsx";
import SelectInput from "../../../components/Form/selectinput.jsx";
import { DATE_FORMAT } from "../../../utils/common.js";
const ModalItem = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const {ma_can_bo} = params
    const {modalActive, selectedQuaTrinhCongTac, pageSize, pageNumber} = useSelector(state => state.quaTrinhCongTacs)
    const {chucVuChinhQuyens} = useSelector(state => state.chucVuChinhQuyens)
    const handleModal = (_item) => {
        dispatch(quaTrinhCongTacSlice.actions.toggleModal(_item))
    }

    const handleRecord = (_actionName, _item) => {
        let date = new dayjs(); 
        let item = Object.assign({}, _item);
        date = date.format(DATE_FORMAT.DDMMYYYY);
        item.thoi_gian_bat_dau = item.thoi_gian_bat_dau===''?date:item.thoi_gian_bat_dau;
        item.thoi_gian_ket_thuc = item.thoi_gian_ket_thuc===''||item.thoi_gian_ket_thuc===null?date:item.thoi_gian_ket_thuc;
        dispatch(
            quaTrinhCongTacSlice.actions.handleQuaTrinhCongTac({
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

    const onRecordSelectInputChange = (key, event) => {
        if (key) {
            let clone = Object.assign({}, selectedQuaTrinhCongTac);
            clone[key] = event;
            dispatch(quaTrinhCongTacSlice.actions.updateSelectedQuaTrinhCongTacInput(clone));
        }
    }

    const onRecordInputChange = (key, event) => {
        if (key) {
            let clone = Object.assign({}, selectedQuaTrinhCongTac);
            clone[key] = event.target.value;
            dispatch(quaTrinhCongTacSlice.actions.updateSelectedQuaTrinhCongTacInput(clone));
        }
    }
    const onRecordDateInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedQuaTrinhCongTac);
          clone[key] = event.format(DATE_FORMAT.DDMMYYYY);
          dispatch(
            quaTrinhCongTacSlice.actions.updateSelectedQuaTrinhCongTacInput(clone)
          );
        }
      };

      const requestTimeEnd = () =>(
        selectedQuaTrinhCongTac?.id &&
        <DateInput
        title="Thời gian kết thúc"
        placeholder="Nhập vào thời gian kết thúc"
        onChange={onRecordDateInputChange}
        property={"thoi_gian_ket_thuc"}
        value={selectedQuaTrinhCongTac?.thoi_gian_ket_thuc}
      />
    )
       //side effect
    useEffect(() => {
        dispatch(chucVuChinhQuyenSlice.actions.getChucVuChinhQuyens({
            pageSize: 1000,
            pageNumber: 1
        }))
    }, [dispatch]);

    return <CustomeModal
        open={modalActive}
        onCancel={() => handleModal(null)}
        onOk={
            selectedQuaTrinhCongTac?.id
                ? () => handleRecord(ACTION_NAME.UPDATE, selectedQuaTrinhCongTac)
                : () => handleRecord(ACTION_NAME.CREATE, selectedQuaTrinhCongTac)
        }
        title={selectedQuaTrinhCongTac?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
        okText="Chấp nhận"
        cancelText="Từ chối"

    >
        <SelectInput
            title="Chức vụ"
            onChange={onRecordSelectInputChange}
            property={"ma_chuc_vu_chinh_quyen"}
            value={selectedQuaTrinhCongTac?.ma_chuc_vu_chinh_quyen}
            isNull={false}
            options={chucVuChinhQuyens.map((e) => ({
                label: e?.ten_chuc_vu,
                value: e?.id
            }))}
        />
        <DateInput
        title="Thời gian bắt đầu"
        placeholder="Nhập vào thời gian bắt đầu"
        onChange={onRecordDateInputChange}
        property={"thoi_gian_bat_dau"}
        value={selectedQuaTrinhCongTac?.thoi_gian_bat_dau}
      />
      {
        requestTimeEnd()
      }
      <TextInput
            title="Đơn vị công tác"
            placeholder="Nhập vào đơn vị công tác"
            onChange={onRecordInputChange}
            property={"don_vi_full_text"}
            value={selectedQuaTrinhCongTac?.don_vi_full_text}
        />
        <TextInput
            title="Ghi chú"
            placeholder="Nhập vào ghi chú"
            onChange={onRecordInputChange}
            property={"ghi_chu"}
            value={selectedQuaTrinhCongTac?.ghi_chu}
        />
    </CustomeModal>
}


export default ModalItem