import {all} from "redux-saga/effects";

import chucDanhKhoaHocSaga from "./QuanLyDanhMuc/ChucDanhKhoaHoc/saga.js"
import donViSaga from "./QuanLyDanhMuc/DonVi/saga.js"
import canBoCoBanSaga from "./QuanLyCanBo/ThongTinCoBan/saga.js"
import lyLichKhoaHocSaga from "./QuanLyCanBo/LyLichKhoaHoc/saga.js";

export default function* rootSaga() {
    yield all([
        chucDanhKhoaHocSaga(),
        donViSaga(),
        canBoCoBanSaga(),
        lyLichKhoaHocSaga()
    ]);
}
