import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

import appSlice from "./App/slice";
import chucDanhKhoaHocSlice from "./QuanLyDanhMuc/ChucDanhKhoaHoc/slice.js";
import donViSlice from "./QuanLyDanhMuc/DonVi/slice.js";
import canBoCoBanSlice from "./QuanLyCanBo/ThongTinCoBan/slice.js";
import lyLichKhoaHocSlice from "./QuanLyCanBo/LyLichKhoaHoc/slice.js";
import trinhDoNgoaiNguSlice from "./QuanLyCanBo/TrinhDoNgoaiNgu/slice.js";
import khenThuongSlice from "./QuanLyCanBo/KhenThuong/slice.js";
import kyLuatSlice from "./QuanLyCanBo/KyLuat/slice.js";
import diNuocNgoaiSlice from "./QuanLyCanBo/DiNuocNgoai/slice.js";
import tinhTrangSucKhoeSlice from "./QuanLyCanBo/TinhTrangSucKhoe/slice.js";
import baoHiemSlice from "./QuanLyCanBo/BaoHiem/slice.js";
import tinhHinhNhaOSlice from "./QuanLyCanBo/TinhHinhNhaO/slice.js";
import chungNhanCapSlice from "./QuanLyCanBo/ChungNhanCap/slice.js";
import quanHamSlice from "./QuanLyCanBo/QuanHam/slice.js";
import quaTrinhCongTacSlice from "./QuanLyCanBo/QuaTrinhCongTac/slice.js";
import lyLichChucDanhPhapLySlice from "./QuanLyCanBo/LyLichChucDanhPhapLy/slice.js";
import truongHocSlice from "./QuanLyDanhMuc/TruongHoc/slice.js";
import chucVuChinhQuyenSlice from "./QuanLyDanhMuc/ChucVuChinhQuyen/slice.js";
import chuyenNganhSlice from "./QuanLyDanhMuc/ChuyenNganh/slice.js";
import loaiHinhDaoTaoSlice from "./QuanLyDanhMuc/LoaiHinhDaoTao/slice.js";
import ngoaiNguSlice from "./QuanLyDanhMuc/NgoaiNgu/slice.js";
import chungNhanSlice from "./QuanLyDanhMuc/ChungNhan/slice.js";
import chucDanhPhapLySlice from "./QuanLyDanhMuc/ChucDanhPhapLy/slice.js";
import quaTrinhDaoTaoSlice from "./QuanLyCanBo/QuaTrinhDaoTao/slice.js";
import boNhiemCanBoSlice from "./DieuDongBoNhiem/BoNhiemCanBo/slice.js";
import danhSachBoNhiemSlice from "./DieuDongBoNhiem/DanhSachBoNhiem/slice.js";
import quanLyKhenThuongSlice from "./DieuTraHinhSu/QuanLyKhenThuong/slice.js";
import quanLyKyLuatSlice from "./DieuTraHinhSu/QuanLyKyLuat/slice.js";
import danhSachKhenThuongKyLuatSlice from "./DieuTraHinhSu/DanhSachKhenThuongKyLuat/slice.js";
import keHoachSlice from "./QuanLyDaoTao/QuanLyKeHoach/slice.js";
import chiTietKeHoachSlice from "./QuanLyDaoTao/ChiTietKeHoach/slice.js";
import danhSachDaoTaoSlice from "./QuanLyDaoTao/DanhSachDaoTao/slice.js";
import dieuDongCanBoSlice from "./DieuDongBoNhiem/DieuDongCanBo/slice.js";
import kyThiSlice from "./QuanLyDaoTao/QuanLyKyThi/slice.js";
import danhSachThiSinhSlice from "./QuanLyDaoTao/DanhSachThiSinh/slice.js";
import lichSuDieuDongSlice from "./DieuDongBoNhiem/LichSuDieuDong/slice.js";
import hinhThucKhenThuongSlice from "./QuanLyDanhMuc/HinhThucKhenThuong/slice.js";
import hinhThucKyLuatSlice from "./QuanLyDanhMuc/HinhThucKyLuat/slice.js";
import loaiDanhHieuThiDuaSlice from "./QuanLyDanhMuc/LoaiDanhHieuThiDua/slice.js";
import tinhHinhKTCTGDSlice from "./T63/TinhHinhKTCTGD/slice.js";
import tinhHinhKTCTCCSlice from "./T63/TinhHinhKTCTCC/slice.js";
import tinhHinhKTCTVCSlice from "./T63/TinhHinhKTCTVC/slice.js";
import quaTrinhCongTacT63Slice from "./T63/QuaTrinhCongTac/slice.js";
import banThanSlice from "./T63/BanThan/slice.js";

import authSlice from "./Auth/slice";
import roleSlice from "./QuanTriHeThong/Role/slice.js";
import groupSlice from "./QuanTriHeThong/Group/slice.js";
import permissionSlice from "./QuanTriHeThong/Permission/slice.js";
import userSlice from "./QuanTriHeThong/User/slice.js";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    chucDanhKhoaHocs: chucDanhKhoaHocSlice.reducer,
    donVis: donViSlice.reducer,
    canBoCoBans: canBoCoBanSlice.reducer,
    lyLichKhoaHocs: lyLichKhoaHocSlice.reducer,
    trinhDoNgoaiNgus: trinhDoNgoaiNguSlice.reducer,
    khenThuongs: khenThuongSlice.reducer,
    kyLuats: kyLuatSlice.reducer,
    diNuocNgoais: diNuocNgoaiSlice.reducer,
    tinhTrangSucKhoes: tinhTrangSucKhoeSlice.reducer,
    baoHiems: baoHiemSlice.reducer,
    tinhHinhNhaOs: tinhHinhNhaOSlice.reducer,
    chungNhanCaps: chungNhanCapSlice.reducer,
    quanHams: quanHamSlice.reducer,
    quaTrinhCongTacs: quaTrinhCongTacSlice.reducer,
    lyLichChucDanhPhapLys: lyLichChucDanhPhapLySlice.reducer,
    truongHocs: truongHocSlice.reducer,
    chucVuChinhQuyens: chucVuChinhQuyenSlice.reducer,
    chuyenNganhs: chuyenNganhSlice.reducer,
    loaiHinhDaoTaos: loaiHinhDaoTaoSlice.reducer,
    ngoaiNgus: ngoaiNguSlice.reducer,
    chungNhans: chungNhanSlice.reducer,
    chucDanhPhapLys: chucDanhPhapLySlice.reducer,
    quaTrinhDaoTaos: quaTrinhDaoTaoSlice.reducer,
    boNhiemCanBos: boNhiemCanBoSlice.reducer,
    danhSachBoNhiems: danhSachBoNhiemSlice.reducer,
    quanLyKhenThuongs: quanLyKhenThuongSlice.reducer,
    quanLyKyLuats: quanLyKyLuatSlice.reducer,
    danhSachKhenThuongKyLuats: danhSachKhenThuongKyLuatSlice.reducer,
    keHoachs: keHoachSlice.reducer,
    chiTietKeHoachs: chiTietKeHoachSlice.reducer,
    danhSachDaoTaos: danhSachDaoTaoSlice.reducer,
    dieuDongCanBos: dieuDongCanBoSlice.reducer,
    kyThis: kyThiSlice.reducer,
    lichSuDieuDongs: lichSuDieuDongSlice.reducer,
    danhSachThiSinhs: danhSachThiSinhSlice.reducer,
    hinhThucKhenThuongs: hinhThucKhenThuongSlice.reducer,
    hinhThucKyLuats: hinhThucKyLuatSlice.reducer,
    loaiDanhHieuThiDuas: loaiDanhHieuThiDuaSlice.reducer,
    tinhHinhKTCTGDs: tinhHinhKTCTGDSlice.reducer,
    tinhHinhKTCTVCs: tinhHinhKTCTVCSlice.reducer,
    quaTrinhCongTacT63s: quaTrinhCongTacT63Slice.reducer,
    tinhHinhKTCTCCs: tinhHinhKTCTCCSlice.reducer,
    banThans: banThanSlice.reducer,
    auths: authSlice.reducer,
    roles: roleSlice.reducer,
    groups: groupSlice.reducer,
    permissions: permissionSlice.reducer,
    users: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
