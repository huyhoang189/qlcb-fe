import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

import appSlice from "./app/slice";
import chucDanhKhoaHocSlice from "./quan-ly-chuc-danh-khoa-hoc/slice.js"

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        chucDanhKhoaHocs: chucDanhKhoaHocSlice.reducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
