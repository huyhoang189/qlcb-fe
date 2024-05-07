import CustomeModal from "../../../components/Form/modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import quanLyKyLuatSlice from "../../../toolkits/DieuTraHinhSu/QuanLyKyLuat/slice.js"
import canBoCoBanSlice from "../../../toolkits/QuanLyCanBo/ThongTinCoBan/slice.js";
import donViSlice from "../../../toolkits/QuanLyDanhMuc/DonVi/slice.js";
import SelectInput from "../../../components/Form/selectinput.jsx";
import AutoCompleteSearch from "../../../components/Form/autocompletesearch.jsx";
import {ACTION_NAME} from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import {useEffect,useState} from "react";
import dayjs from "dayjs";
import {useParams} from "react-router-dom";
import DateInput from "../../../components/Form/dateinput.jsx";
import TableObjKhenThuongKyLuat from "../DanhSachKhenThuongKyLuat/table.jsx"
import { DATE_FORMAT, HINH_THUC_THUONG_KY_LUAT } from "../../../utils/common";
import { Row, Col } from 'antd'
import {
    ButtonBasic,
  } from "../../../components/Button/index.jsx";
const ModalItem = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const {ma_can_bo} = params
    const {modalActive, selectedQuanLyKyLuat, pageSize, pageNumber} = useSelector(state => state.quanLyKyLuats)
    const { canBoCoBans } = useSelector((state) => state.canBoCoBans);
    const { donVis } = useSelector((state) => state.donVis);
    const [listObjKhenThuongKyLuat, setListObjKhenThuongKyLuat] = useState({ListObjKhenThuongKyLuat: [], ids: []});
    const [inputValue, setInputValue] = useState('');
    const [inputOption, setInputOption] = useState();
    const [optionObjKhenThuongKyLuat, setOptionObjKhenThuongKyLuat] = useState()
    const handleModal = (_item) => {
        setListObjKhenThuongKyLuat({ListObjKhenThuongKyLuat: [], ids: []})
        setInputOption([]);
        setInputValue('');
        dispatch(quanLyKyLuatSlice.actions.toggleModal(_item))
    }

    const handleRecord = (_actionName, _item) => {
        let date = new dayjs(); 
        let item = Object.assign({}, _item);
        date = date.format(DATE_FORMAT.DDMMYYYY);
        item.thoi_gian = item.thoi_gian===''?date:item.thoi_gian;
        if(item.hinh_thuc==="CA_NHAN")
        item.chi_tiet = listObjKhenThuongKyLuat.ids.map((e)=>{
            return {ma_can_bo: e}
        })
        else
            item.chi_tiet = listObjKhenThuongKyLuat.ids.map((e)=>{
            return {ma_to_chuc: e}
        })
        dispatch(
            quanLyKyLuatSlice.actions.handleQuanLyKyLuat({
                item: {
                    ...item,
                    ma_can_bo
                },
                actionName: _actionName,
                pageSize: pageSize,
                pageNumber: pageNumber,

            })
        );
        setListObjKhenThuongKyLuat({ListObjKyLuat: [], ids: []})
        setInputOption([]);
        setInputValue('');
    }
    const onRecordSelectObjKhenThuongKyLuatChange = () => {
        if(!listObjKhenThuongKyLuat.ids.find((id) => id === inputOption.value) && inputOption.value){
          const IdObjKhenThuongKyLuatSelect = [...listObjKhenThuongKyLuat.ids, inputOption.value];
          const ObjKhenThuongKyLuat =
            selectedQuanLyKyLuat?.hinh_thuc === "CA_NHAN" ? canBoCoBans : donVis;
          const SelectedItem = ObjKhenThuongKyLuat.find((tg) => tg.id === inputOption.value);
          const ObjKhenThuongKyLuatSelected = [...listObjKhenThuongKyLuat.ListObjKhenThuongKyLuat,SelectedItem]
          onChangeOptionObjKhenThuongKyLuat(ObjKhenThuongKyLuatSelected);
          setListObjKhenThuongKyLuat({
            ListObjKhenThuongKyLuat: ObjKhenThuongKyLuatSelected,
            ids: IdObjKhenThuongKyLuatSelect,
          });
          setInputValue('');
          setInputOption([]);
        }
      }
    const onRecordSelectInputChange = (key, event) => {
        if (key) {
            setListObjKhenThuongKyLuat({ListObjKhenThuongKyLuat: [], ids: []})
            setInputOption([]);
            setInputValue('');
            let clone = Object.assign({}, selectedQuanLyKyLuat);
            clone[key] = event;
            dispatch(quanLyKyLuatSlice.actions.updateSelectedQuanLyKyLuatInput(clone));
        }
    }
    const onRecordInputChange = (key, event) => {
        if (key) {
            let clone = Object.assign({}, selectedQuanLyKyLuat);
            clone[key] = event.target.value;
            dispatch(quanLyKyLuatSlice.actions.updateSelectedQuanLyKyLuatInput(clone));
        }
    }
    const onRecordDateInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedQuanLyKyLuat);
          clone[key] = event.format(DATE_FORMAT.DDMMYYYY);
          dispatch(
            quanLyKyLuatSlice.actions.updateSelectedQuanLyKyLuatInput(clone)
          );
        }
      };
    const defaultOptionObjKTKL = selectedQuanLyKyLuat?.hinh_thuc==="CA_NHAN"?
            canBoCoBans.map((e) => ({
                label: e?.so_hieu_quan_nhan + " -- "+ e?.ho_ten_khai_sinh + " -- "+ e?.don_vi,
                value: e?.id
            }))
       :
            donVis.map((e) => ({
                label: e?.ma_don_vi + " -- "+ e?.ten_don_vi + " -- "+ e?.don_vi?.ten_don_vi,
                value: e?.id
            }))

    const onChange = (data, option) => {
        setInputValue(data)
        setInputOption(option)
    };
    const onSelect = (data, option) => {
        setInputValue(option.label)
        setInputOption(option)
        };
    const onChangeOptionObjKhenThuongKyLuat = (listSelected) => {
    const option = defaultOptionObjKTKL.map((e)=>{
      if(listSelected.find(tg => tg.id === e.value))
        {
          return {...e, disabled: 'true'}
        }
      else return {...e}
    })
    setOptionObjKhenThuongKyLuat(option)
  }
      //side effect
    useEffect(() => {
        dispatch(canBoCoBanSlice.actions.getCanBoCoBans({
            pageSize: 1000,
            pageNumber: 1
        }))
        dispatch(donViSlice.actions.getDonVis({
            pageSize: 1000,
            pageNumber: 1
        }))
    }, [dispatch]);

    useEffect(()=>{
        setOptionObjKhenThuongKyLuat(defaultOptionObjKTKL)
    }, [selectedQuanLyKyLuat?.hinh_thuc])
    return <CustomeModal
        width={950}
        open={modalActive}
        onCancel={() => handleModal(null)}
        onOk={
            selectedQuanLyKyLuat?.id
                ? () => handleRecord(ACTION_NAME.UPDATE, selectedQuanLyKyLuat)
                : () => handleRecord(ACTION_NAME.CREATE, selectedQuanLyKyLuat)
        }
        title={selectedQuanLyKyLuat?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
        okText="Chấp nhận"
        cancelText="Từ chối"

    >
        <Row gutter={16} style={{ width: '100%' }}>
        <Col span={8}>
        <TextInput
            title="Quyết định"
            placeholder="Nhập vào số quyết định"
            onChange={onRecordInputChange}
            property={"quyet_dinh_so"}
            value={selectedQuanLyKyLuat?.quyet_dinh_so}
        />
        <SelectInput
            title="Hình thức"
            onChange={onRecordSelectInputChange}
            property={"hinh_thuc"}
            value={selectedQuanLyKyLuat?.hinh_thuc}
            isNull={false}
            options={HINH_THUC_THUONG_KY_LUAT}
        />
        <TextInput
            title="Nội dụng"
            placeholder="Nhập vào nội dụng"
            onChange={onRecordInputChange}
            property={"noi_dung"}
            value={selectedQuanLyKyLuat?.noi_dung}
        />
        <DateInput
        title="Thời gian"
        placeholder="Nhập vào thời gian"
        onChange={onRecordDateInputChange}
        property={"thoi_gian"}
        value={selectedQuanLyKyLuat?.thoi_gian}
      />
      <TextInput
            title="Lý do"
            placeholder="Nhập vào lý do"
            onChange={onRecordInputChange}
            property={"ly_do"}
            value={selectedQuanLyKyLuat?.ly_do}
        />
        <TextInput
            title="Ghi chú"
            placeholder="Nhập vào ghi chú"
            onChange={onRecordInputChange}
            property={"ghi_chu"}
            value={selectedQuanLyKyLuat?.ghi_chu}
        />
        </Col>
        <Col span={16}>
        <Row gutter={[0,8,8,8]} style={{ width: "100%", margin: 0 }}>
        <Col flex="auto">
          <AutoCompleteSearch
            onChange={onChange}
            onSelect={onSelect}
            title="Danh sách"
            options={optionObjKhenThuongKyLuat}
            value={inputValue}
            filterOption={(inputValue, option) =>
              option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          />
          </Col>
          <Col flex="65px" style={{textAlign:"end", paddingRight:0}}>
            <div style={{ marginTop: 19, marginBottom: 5}}>
          <ButtonBasic
            text = {"Thêm"}
            onClick={() => onRecordSelectObjKhenThuongKyLuatChange()}
          />
          </div>
          </Col>
          </Row>
        <TableObjKhenThuongKyLuat
            ListKhenThuongKyLuat={listObjKhenThuongKyLuat}
            SetListKhenThuongKyLuat={setListObjKhenThuongKyLuat}
            OnChangeOptionObjKhenThuongKyLuat={onChangeOptionObjKhenThuongKyLuat}
            HinhThuc={selectedQuanLyKyLuat?.hinh_thuc}
          />
        </Col>
        </Row>
    </CustomeModal>
}


export default ModalItem