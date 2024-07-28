import CustomeModal from "../../../components/Form/modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import { Image } from "antd";
import {ACTION_NAME} from "../../../utils/common.js";
import TextInput from "../../../components/Form/textinput.jsx";
import SelectInput from "../../../components/Form/selectinput.jsx";
import dayjs from "dayjs";
import { useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import DateInput from "../../../components/Form/dateinput.jsx";
import { DATE_FORMAT, LOAI_TRINH_DO_CHINH_TRI } from "../../../utils/common.js";
import { generateTrees } from "../../../utils/tree.js";
import TreeInput from "../../../components/Form/treeInput.jsx";
import banThanSlice from "../../../toolkits/T63/BanThan/slice.js";
import donViSlice from "../../../toolkits/QuanLyDanhMuc/DonVi/slice.js";
const ModalItem = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const {ma_can_bo} = params
    const {modalActive, selectedBanThan} = useSelector(state => state.banThans)

    const handleModal = () => {
        dispatch(banThanSlice.actions.toggleModal())
    }
    const [tree, setTree] = useState([]);
    const { donVis } = useSelector((state) => state.donVis);
    const handleRecord = (_actionName, _item) => {
        let date = new dayjs(); 
        let item = Object.assign({}, _item);
        date = date.format(DATE_FORMAT.YYYYMMDD);
        item.ngay_thang_nam_sinh = item.ngay_thang_nam_sinh===''?date:item.ngay_thang_nam_sinh;
        item.ngay_tham_gia_cach_mang = item.ngay_tham_gia_cach_mang===''?date:item.ngay_tham_gia_cach_mang;
        item.ngay_tuyen_dung = item.ngay_tuyen_dung===''?date:item.ngay_tuyen_dung;
        item.ngay_nhap_ngu = item.ngay_nhap_ngu===''?date:item.ngay_nhap_ngu;
        item.ngay_xuat_ngu = item.ngay_xuat_ngu===''?date:item.ngay_xuat_ngu;
        item.ngay_tai_ngu = item.ngay_tai_ngu===''?date:item.ngay_tai_ngu;
        item.ngay_vao_dang = item.ngay_vao_dang===''?date:item.ngay_vao_dang;
        item.ngay_chinh_thuc = item.ngay_chinh_thuc===''?date:item.ngay_chinh_thuc;

        dispatch(
            banThanSlice.actions.handleBanThan({
                item: {
                    ...item,
                    ma_can_bo
                },
                actionName: _actionName,
                pageSize: 10,
                pageNumber: 1,

            })
        );
    }
    const onRecordInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedBanThan);
          clone[key] = event.target.value;
          dispatch(banThanSlice.actions.updateSelectedBanThanInput(clone));
        }
      };
      const onRecordDateInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedBanThan);
          clone[key] = event.format(DATE_FORMAT.YYYYMMDD);
          dispatch(
            banThanSlice.actions.updateSelectedBanThanInput(clone)
          );
        }
      };
      const onRecordSelectInputChange = (key, event) => {
        if (key) {
          let clone = Object.assign({}, selectedBanThan);
          clone[key] = event;
          dispatch(
            banThanSlice.actions.updateSelectedBanThanInput(clone)
          );
        }
      };
      useEffect(() => {
        
        dispatch(
            banThanSlice.actions.getBanThans({
            ma_can_bo,
          })
        );
      }, [dispatch]);

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
    return <CustomeModal
        open={modalActive}
        onCancel={() => handleModal()}
        onOk={
                () => handleRecord(ACTION_NAME.UPDATE, selectedBanThan)
        }
        title={"Cập nhật dữ liệu"}
        okText="Chấp nhận"
        cancelText="Từ chối"

    >
        <Image
    width={200}
    height={200}
    src="error"
    />
    <TextInput
            title="Họ tên khai sinh:"
            placeholder="Nhập vào họ tên khai sinh"
            onChange={onRecordInputChange}
            property={"ho_ten_khai_sinh"}
            value={selectedBanThan?.ho_ten_khai_sinh}
        />
    <TextInput
            title="Họ tên khác:"
            placeholder="Nhập vào họ tên khác"
            onChange={onRecordInputChange}
            property={"ho_ten_khac"}
            value={selectedBanThan?.ho_ten_khac}
        />
    <TextInput
            title="Số hiệu quân nhân:"
            placeholder="Nhập vào số hiệu"
            onChange={onRecordInputChange}
            property={"so_hieu_quan_nhan"}
            value={selectedBanThan?.so_hieu_quan_nhan}
        />
        <TextInput
            title="Cấp bậc:"
            placeholder="Nhập vào cấp bậc"
            onChange={onRecordInputChange}
            property={"cap_bac"}
            value={selectedBanThan?.cap_bac}
        />
    <DateInput
            direction=""
            boldText={false}
            align={"center"}
            title="Sinh ngày:"
            placeholder="Nhập vào ngày sinh"
            onChange={onRecordDateInputChange}
            property={"ngay_thang_nam_sinh"}
            value={selectedBanThan?.ngay_thang_nam_sinh}
      />
        <TextInput
            title="Dân tộc:"
            placeholder="Nhập vào dân tộc"
            onChange={onRecordInputChange}
            property={"dan_toc"}
            value={selectedBanThan?.dan_toc}
        />
        <TextInput
            title="Tôn giáo:"
            placeholder="Nhập vào tôn giáo"
            onChange={onRecordInputChange}
            property={"ton_giao"}
            value={selectedBanThan?.ton_giao}
        />
        <TextInput
            title="Quê quán:"
            placeholder="Nhập vào quê quán"
            onChange={onRecordInputChange}
            property={"que_quan"}
            value={selectedBanThan?.que_quan}
        />
        <TextInput
            title="Nơi ở hiện nay:"
            placeholder="Nhập vào nơi ở hiện nay"
            onChange={onRecordInputChange}
            property={"noi_o_hien_nay"}
            value={selectedBanThan?.noi_o_hien_nay}
        />
        <DateInput
            title="Ngày tham gia cách mạng:"
            placeholder="Nhập vào ngày"
            onChange={onRecordDateInputChange}
            property={"ngay_tham_gia_cach_mang"}
            value={selectedBanThan?.ngay_tham_gia_cach_mang}
      />
      <DateInput
            title="Ngày tuyển dụng:"
            placeholder="Nhập vào ngày"
            onChange={onRecordDateInputChange}
            property={"ngay_tuyen_dung"}
            value={selectedBanThan?.ngay_tuyen_dung}
      />
       <DateInput
            title="Ngày nhập ngũ:"
            placeholder="Nhập vào ngày"
            onChange={onRecordDateInputChange}
            property={"ngay_nhap_ngu"}
            value={selectedBanThan?.ngay_nhap_ngu}
      />
      <DateInput
            title="Xuất ngũ:"
            placeholder="Nhập vào ngày"
            onChange={onRecordDateInputChange}
            property={"ngay_xuat_ngu"}
            value={selectedBanThan?.ngay_xuat_ngu}
      />
      <DateInput
            title="Tái ngũ:"
            placeholder="Nhập vào ngày"
            onChange={onRecordDateInputChange}
            property={"ngay_tai_ngu"}
            value={selectedBanThan?.ngay_tai_ngu}
      />
      <DateInput
            title="Ngày vào Đảng:"
            placeholder="Nhập vào ngày"
            onChange={onRecordDateInputChange}
            property={"ngay_vao_dang"}
            value={selectedBanThan?.ngay_vao_dang}
      />
      <DateInput
            title="Ngày chính thức:"
            placeholder="Nhập vào ngày"
            onChange={onRecordDateInputChange}
            property={"ngay_chinh_thuc"}
            value={selectedBanThan?.ngay_chinh_thuc}
      />
      <TextInput
            title="Giáo dục phổ thông:"
            placeholder="Nhập vào giáo dục phổ thông:"
            onChange={onRecordInputChange}
            property={"trinh_do_giao_duc_pho_thong"}
            value={selectedBanThan?.trinh_do_giao_duc_pho_thong}
        />
        <SelectInput
            title="Chứng nhận"
            onChange={onRecordSelectInputChange}
            property={"trinh_do_chi_huy_quan_ly"}
            value={selectedBanThan?.trinh_do_chi_huy_quan_ly}
            isNull={false}
            options={LOAI_TRINH_DO_CHINH_TRI}
        />
        <SelectInput
            title="Chứng nhận"
            onChange={onRecordSelectInputChange}
            property={"trinh_do_ly_luan_chinh_tri"}
            value={selectedBanThan?.trinh_do_ly_luan_chinh_tri}
            isNull={false}
            options={LOAI_TRINH_DO_CHINH_TRI}
        />
        <SelectInput
            title="Chứng nhận"
            onChange={onRecordSelectInputChange}
            property={"trinh_do_ly_chuyen_mon_ky_thuat"}
            value={selectedBanThan?.trinh_do_ly_chuyen_mon_ky_thuat}
            isNull={false}
            options={LOAI_TRINH_DO_CHINH_TRI}
        />
        <SelectInput
        title="Giới tính"
        onChange={onRecordSelectInputChange}
        property={"gioi_tinh"}
        value={selectedBanThan?.gioi_tinh}
        options={[
          { value: "NAM", label: "Nam" },
          { value: "NU", label: "Nữ" },
        ]}
      />
        <TreeInput
        title="Đơn vị cha"
        onChange={onRecordSelectInputChange}
        property={"ma_don_vi_hien_tai"}
        value={selectedBanThan?.ma_don_vi_hien_tai}
        options={tree}
      />
        <TextInput
            title="Ghi chú"
            placeholder="Nhập vào ghi chú"
            onChange={onRecordInputChange}
            property={"ghi_chu"}
            value={selectedBanThan?.ghi_chu}
        />
    </CustomeModal>
}


export default ModalItem