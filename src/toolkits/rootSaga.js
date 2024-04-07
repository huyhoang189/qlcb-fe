import {all} from "redux-saga/effects";

import chucDanhKhoaHocSaga from "./quanLyDanhMuc/chucDanhKhoaHoc/saga.js"
import donViSaga from "./quanLyDanhMuc/donVi/saga.js"
import canBoCoBanSaga from "./quanLyCanBo/thongTinCoBan/saga.js"
import lyLichKhoaHocSaga from "../toolkits/quanLyCanBo/lyLichKhoaHoc/saga.js";

export default function* rootSaga() {
    yield all([
        chucDanhKhoaHocSaga(),
        donViSaga(),
        canBoCoBanSaga(),
        lyLichKhoaHocSaga()
    ]);
}
