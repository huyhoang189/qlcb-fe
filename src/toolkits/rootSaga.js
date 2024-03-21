import {all} from "redux-saga/effects";

import chucDanhKhoaHocSaga from "./quan-ly-chuc-danh-khoa-hoc/saga.js"

export default function* rootSaga() {
    yield all([
        chucDanhKhoaHocSaga()
    ]);
}
