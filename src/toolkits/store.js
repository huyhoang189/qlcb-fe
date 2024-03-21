import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

import appSlice from "./app/slice";
import chucDanhKhoaHocSlice from "./chuc-danh-khoa-hoc/slice.js"
import donViSlice from "./don-vi/slice.js"


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        chucDanhKhoaHocs: chucDanhKhoaHocSlice.reducer,
        donVis: donViSlice.reducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
