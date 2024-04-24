import { all } from "redux-saga/effects";

import chucDanhKhoaHocSaga from "./QuanLyDanhMuc/ChucDanhKhoaHoc/saga.js";
import donViSaga from "./QuanLyDanhMuc/DonVi/saga.js";
import canBoCoBanSaga from "./QuanLyCanBo/ThongTinCoBan/saga.js";
import lyLichKhoaHocSaga from "./QuanLyCanBo/LyLichKhoaHoc/saga.js";
import trinhDoNgoaiNguSaga from "./QuanLyCanBo/TrinhDoNgoaiNgu/saga.js";
import khenThuongSaga from "./QuanLyCanBo/KhenThuong/saga.js";
import kyLuatSaga from "./QuanLyCanBo/KyLuat/saga.js";
import chucVuChinhQuyenSaga from "./QuanLyDanhMuc/ChucVuChinhQuyen/saga.js";
import truongHocSaga from "./QuanLyDanhMuc/TruongHoc/saga.js";
import loaiHinhDaoTaoSaga from "./QuanLyDanhMuc/LoaiHinhDaoTao/saga.js";
import chuyenNganhSaga from "./QuanLyDanhMuc/ChuyenNganh/saga.js";
import ngoaiNguSaga from "./QuanLyDanhMuc/NgoaiNgu/saga.js";
import chungNhanSaga from "./QuanLyDanhMuc/ChungNhan/saga.js";
import chucDanhPhapLySaga from "./QuanLyDanhMuc/ChucDanhPhapLy/saga.js";
import quaTrinhDaoTaoSaga from "./QuanLyCanBo/QuaTrinhDaoTao/saga.js";

export default function* rootSaga() {
  yield all([
    chucDanhKhoaHocSaga(),
    donViSaga(),
    canBoCoBanSaga(),
    lyLichKhoaHocSaga(),
    trinhDoNgoaiNguSaga(),
    khenThuongSaga(),
    kyLuatSaga(),
    chucVuChinhQuyenSaga(),
    truongHocSaga(),
    loaiHinhDaoTaoSaga(),
    chuyenNganhSaga(),
    ngoaiNguSaga(),
    chungNhanSaga(),
    chucDanhPhapLySaga(),
    quaTrinhDaoTaoSaga(),
  ]);
}
