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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
