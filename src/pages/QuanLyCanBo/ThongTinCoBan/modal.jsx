import CustomeModal from "../../../components/Form/modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import canBoCoBanSlice from "../../../toolkits/QuanLyCanBo/ThongTinCoBan/slice.js";
import donViSlice from "../../../toolkits/QuanLyDanhMuc/DonVi/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import { useEffect, useState } from "react";
import SelectInput from "../../../components/Form/selectinput.jsx";
import { useParams } from "react-router-dom";
import { generateTrees } from "../../../utils/tree.js";
import TreeInput from "../../../components/Form/treeInput.jsx";

const ModalItem = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { ma_can_bo } = params;
  const { modalActive, selectedCanBoCoBan, pageSize, pageNumber } = useSelector(
    (state) => state.canBoCoBans
  );
  const { donVis } = useSelector((state) => state.donVis);

  const [tree, setTree] = useState([]);

  const handleModal = (_item) => {
    dispatch(canBoCoBanSlice.actions.toggleModal(_item));
  };

  const handleRecord = (_actionName, _item) => {
    let item = Object.assign({}, _item);
    dispatch(
      canBoCoBanSlice.actions.handleCanBoCoBan({
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
      let clone = Object.assign({}, selectedCanBoCoBan);
      clone[key] = event.target.value;
      dispatch(canBoCoBanSlice.actions.updateSelectedCanBoCoBanInput(clone));
    }
  };

  const onRecordSelectInputChange = (key, event) => {
    if (key) {
      let clone = Object.assign({}, selectedCanBoCoBan);
      clone[key] = event;
      dispatch(canBoCoBanSlice.actions.updateSelectedCanBoCoBanInput(clone));
    }
  };

  //side effect
  useEffect(() => {
    if (modalActive)
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
        selectedCanBoCoBan?.id
          ? () => handleRecord(ACTION_NAME.UPDATE, selectedCanBoCoBan)
          : () => handleRecord(ACTION_NAME.CREATE, selectedCanBoCoBan)
      }
      title={selectedCanBoCoBan?.id ? "Cập nhật dữ liệu" : "Thêm mới dữ liệu"}
      okText="Chấp nhận"
      cancelText="Từ chối"
    >
      <TextInput
        title="Họ và tên khai sinh"
        placeholder="Nhập vào họ và tên khai sinh"
        onChange={onRecordInputChange}
        property={"ho_ten_khai_sinh"}
        value={selectedCanBoCoBan?.ho_ten_khai_sinh}
        isNull={false}
      />

      <TextInput
        title="Số hiệu quân nhân"
        placeholder="Nhập vào số hiệu quân nhân"
        onChange={onRecordInputChange}
        property={"so_hieu_quan_nhan"}
        value={selectedCanBoCoBan?.so_hieu_quan_nhan}
        isNull={false}
      />

      <TextInput
        title="Ngày tháng năm sinh"
        placeholder="Nhập vào ngày thấng năm sinh"
        onChange={onRecordInputChange}
        property={"ngay_thang_nam_sinh"}
        value={selectedCanBoCoBan?.ngay_thang_nam_sinh}
      />

      <TextInput
        title="Ngày vào đảng"
        placeholder="Nhập vào ngày vào đảng"
        onChange={onRecordInputChange}
        property={"ngay_vao_dang"}
        value={selectedCanBoCoBan?.ngay_vao_dang}
      />

      <TextInput
        title="Ngày nhập ngũ"
        placeholder="Nhập vào ngày nhập ngũ"
        onChange={onRecordInputChange}
        property={"ngay_nhap_ngu"}
        value={selectedCanBoCoBan?.ngay_nhap_ngu}
      />

      <TextInput
        title="Quê quán"
        placeholder="Nhập vào quê quán"
        onChange={onRecordInputChange}
        property={"que_quan"}
        value={selectedCanBoCoBan?.que_quan}
      />

      <TextInput
        title="Nơi ở hiện nay"
        placeholder="Nhập vào nơi ở hiện nay"
        onChange={onRecordInputChange}
        property={"noi_o_hien_nay"}
        value={selectedCanBoCoBan?.noi_o_hien_nay}
      />

      <TextInput
        title="Trình độ giáo dục phổ thông"
        placeholder="Nhập vào trình độ giáo dục phổ thông"
        onChange={onRecordInputChange}
        property={"trinh_do_giao_duc_pho_thong"}
        value={selectedCanBoCoBan?.trinh_do_giao_duc_pho_thong}
      />

      <TreeInput
        title="Đơn vị cha"
        onChange={onRecordSelectInputChange}
        property={"ma_don_vi_hien_tai"}
        value={selectedCanBoCoBan?.ma_don_vi_hien_tai}
        options={tree}
      />
    </CustomeModal>
  );
};

export default ModalItem;
