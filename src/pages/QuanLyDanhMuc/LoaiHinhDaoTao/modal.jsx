import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import loaiHinhDaoTaoSlice from "../../../toolkits/QuanLyDanhMuc/LoaiHinhDaoTao/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const { modalActive, selectedLoaiHinhDaoTao, pageSize, pageNumber } =
    useSelector((state) => state.loaiHinhDaoTaos);

  const handleModal = (_item) => {
    dispatch(loaiHinhDaoTaoSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      loaiHinhDaoTaoSlice.actions.handleLoaiHinhDaoTao({
        item: item,
        actionName: _actionName,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedLoaiHinhDaoTao);
      clone[key] = event.target.value;
      dispatch(
        loaiHinhDaoTaoSlice.actions.updateSelectedLoaiHinhDaoTaoInput(clone)
      );
    }
  };

  return (
    <CustomeModal
      open={modalActive}
      onCancel={() => handleModal(null)}
      onOk={
        selectedLoaiHinhDaoTao?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedLoaiHinhDaoTao)
          : () => handleRecord(ACTION_NAME.CREATE, selectedLoaiHinhDaoTao)
      }
      title={
        selectedLoaiHinhDaoTao?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"
      }
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Tên chức danh"
        placeholder="Nhập vào tên chức danh"
        onChange={onRecordInputChange}
        property={"ten_chuc_danh"}
        value={selectedLoaiHinhDaoTao?.ten_chuc_danh}
      />
      <TextInput
        title="Ghi chú"
        placeholder="Nhập vào ghi chú"
        onChange={onRecordInputChange}
        property={"ghi_chu"}
        value={selectedLoaiHinhDaoTao?.ghi_chu}
      />
    </CustomeModal>
  );
};

export default ModalItem;
