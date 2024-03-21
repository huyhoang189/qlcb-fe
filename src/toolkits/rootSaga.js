import {all} from "redux-saga/effects";

import chucDanhKhoaHocSaga from "./chuc-danh-khoa-hoc/saga.js"
import donViSaga from "./don-vi/saga.js"

export default function* rootSaga() {
    yield all([
        chucDanhKhoaHocSaga(),
        donViSaga()
    ]);
}
