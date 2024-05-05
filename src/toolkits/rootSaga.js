import { all } from "redux-saga/effects";

import chucDanhKhoaHocSaga from "./QuanLyDanhMuc/ChucDanhKhoaHoc/saga.js";
import donViSaga from "./QuanLyDanhMuc/DonVi/saga.js";
import canBoCoBanSaga from "./QuanLyCanBo/ThongTinCoBan/saga.js";
import lyLichKhoaHocSaga from "./QuanLyCanBo/LyLichKhoaHoc/saga.js";
import trinhDoNgoaiNguSaga from "./QuanLyCanBo/TrinhDoNgoaiNgu/saga.js";
import khenThuongSaga from "./QuanLyCanBo/KhenThuong/saga.js";
import kyLuatSaga from "./QuanLyCanBo/KyLuat/saga.js";
import diNuocNgoaiSaga from "./QuanLyCanBo/DiNuocNgoai/saga.js";
import tinhTrangSucKhoeSaga from "./QuanLyCanBo/TinhTrangSucKhoe/saga.js";
import baoHiemSaga from "./QuanLyCanBo/BaoHiem/saga.js";
import tinhHinhNhaOSaga from "./QuanLyCanBo/TinhHinhNhaO/saga.js";
import chungNhanCapSaga from "./QuanLyCanBo/ChungNhanCap/saga.js";
import quanHamSaga from "./QuanLyCanBo/QuanHam/saga.js";
import quaTrinhCongTacSaga from "./QuanLyCanBo/QuaTrinhCongTac/saga.js";
import lyLichChucDanhPhapLySaga from "./QuanLyCanBo/LyLichChucDanhPhapLy/saga.js";
import chucVuChinhQuyenSaga from "./QuanLyDanhMuc/ChucVuChinhQuyen/saga.js";
import truongHocSaga from "./QuanLyDanhMuc/TruongHoc/saga.js";
import loaiHinhDaoTaoSaga from "./QuanLyDanhMuc/LoaiHinhDaoTao/saga.js";
import chuyenNganhSaga from "./QuanLyDanhMuc/ChuyenNganh/saga.js";
import ngoaiNguSaga from "./QuanLyDanhMuc/NgoaiNgu/saga.js";
import chungNhanSaga from "./QuanLyDanhMuc/ChungNhan/saga.js";
import chucDanhPhapLySaga from "./QuanLyDanhMuc/ChucDanhPhapLy/saga.js";
import quaTrinhDaoTaoSaga from "./QuanLyCanBo/QuaTrinhDaoTao/saga.js";
import boNhiemCanBoSaga from "./DieuDongBoNhiem/BoNhiemCanBo/saga.js";
import danhSachBoNhiemSaga from "./DieuDongBoNhiem/DanhSachBoNhiem/saga.js";
import quanLyKhenThuongSaga from "./DieuTraHinhSu/QuanLyKhenThuong/saga.js";
import quanLyKyLuatSaga from "./DieuTraHinhSu/QuanLyKyLuat/saga.js";
import danhSachKhenThuongKyLuatSaga from "./DieuTraHinhSu/DanhSachKhenThuongKyLuat/saga.js";
import keHoachSaga from "./QuanLyDaoTao/KeHoach/saga.js";
import chiTietKeHoachSaga from "./QuanLyDaoTao/ChiTietKeHoach/saga.js";
export default function* rootSaga() {
  yield all([
    chucDanhKhoaHocSaga(),
    donViSaga(),
    canBoCoBanSaga(),
    lyLichKhoaHocSaga(),
    trinhDoNgoaiNguSaga(),
    khenThuongSaga(),
    kyLuatSaga(),
    diNuocNgoaiSaga(),
    tinhTrangSucKhoeSaga(),
    baoHiemSaga(),
    tinhHinhNhaOSaga(),
    chungNhanCapSaga(),
    quanHamSaga(),
    quaTrinhCongTacSaga(),
    chucVuChinhQuyenSaga(),
    lyLichChucDanhPhapLySaga(),
    truongHocSaga(),
    loaiHinhDaoTaoSaga(),
    chuyenNganhSaga(),
    ngoaiNguSaga(),
    chungNhanSaga(),
    chucDanhPhapLySaga(),
    quaTrinhDaoTaoSaga(),
    boNhiemCanBoSaga(),
    danhSachBoNhiemSaga(),
    quanLyKhenThuongSaga(),
    quanLyKyLuatSaga(),
    danhSachKhenThuongKyLuatSaga(),
    keHoachSaga(),
    chiTietKeHoachSaga()
  ]);
}
