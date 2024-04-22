import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

import appSlice from "./App/slice";
import chucDanhKhoaHocSlice from "./QuanLyDanhMuc/ChucDanhKhoaHoc/slice.js";
import donViSlice from "./QuanLyDanhMuc/DonVi/slice.js";
import canBoCoBanSlice from "./QuanLyCanBo/ThongTinCoBan/slice.js";
import lyLichKhoaHocSlice from "./QuanLyCanBo/LyLichKhoaHoc/slice.js";
import truongHocSlice from "./QuanLyDanhMuc/TruongHoc/slice.js";
import chucVuChinhQuyenSlice from "./QuanLyDanhMuc/ChucVuChinhQuyen/slice.js";
import chuyenNganhSlice from "./QuanLyDanhMuc/ChuyenNganh/slice.js";
import loaiHinhDaoTaoSlice from "./QuanLyDanhMuc/LoaiHinhDaoTao/slice.js";
import quaTrinhDaoTaoSlice from "./QuanLyCanBo/QuaTrinhDaoTao/slice.js";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    chucDanhKhoaHocs: chucDanhKhoaHocSlice.reducer,
    donVis: donViSlice.reducer,
    canBoCoBans: canBoCoBanSlice.reducer,
    lyLichKhoaHocs: lyLichKhoaHocSlice.reducer,
    truongHocs: truongHocSlice.reducer,
    chucVuChinhQuyens: chucVuChinhQuyenSlice.reducer,
    chuyenNganhs: chuyenNganhSlice.reducer,
    loaiHinhDaoTaos: loaiHinhDaoTaoSlice.reducer,
    quaTrinhDaoTaos: quaTrinhDaoTaoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
