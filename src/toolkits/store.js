import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

import appSlice from "./app/slice";
import chucDanhKhoaHocSlice from "./quanLyDanhMuc/chucDanhKhoaHoc/slice.js"
import donViSlice from "./quanLyDanhMuc/donVi/slice.js"
import canBoCoBanSlice from "./quanLyCanBo/thongTinCoBan/slice.js"
import lyLichKhoaHocSlice from "./quanLyCanBo/lyLichKhoaHoc/slice.js";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        chucDanhKhoaHocs: chucDanhKhoaHocSlice.reducer,
        donVis: donViSlice.reducer,
        canBoCoBans: canBoCoBanSlice.reducer,
        lyLichKhoaHocs: lyLichKhoaHocSlice.reducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
