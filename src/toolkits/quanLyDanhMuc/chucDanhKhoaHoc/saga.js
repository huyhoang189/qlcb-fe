import {all, call, put, takeEvery} from "redux-saga/effects";
import chucDanhKhoaHocSlice from "./slice.js";
import {ACTION_NAME,} from "../../../utils/common.js";
import {create, deleteItem, getAll, update} from "../../../apis/chucDanhKhoaHoc.js";

function* _getAll({payload}) {
    try {
        const {data, status} = yield call(getAll, payload);
        const {metadata} = data
        if (status === 200 || status === 201) {
            yield put(chucDanhKhoaHocSlice.actions.getChucDanhKhoaHocsSuccess(metadata));
        } else {
            yield put(chucDanhKhoaHocSlice.actions.getChucDanhKhoaHocsError([]));
        }
    } catch (error) {
        yield put(chucDanhKhoaHocSlice.actions.getChucDanhKhoaHocsError([]));
    }
}

function* _handleItem({payload}) {
    try {
        const {actionName, item} = payload;
        let data, status;

        if (actionName === ACTION_NAME.CREATE) {
            ({data, status} = yield call(create, item));
        } else if (actionName === ACTION_NAME.UPDATE) {
            ({data, status} = yield call(update, item));
        } else if (actionName === ACTION_NAME.DELETE) {
            ({data, status} = yield call(deleteItem, {id: item.id}));
        }

        const isSuccess = status === 200 || status === 201;

        yield put(
            isSuccess
                ? chucDanhKhoaHocSlice.actions.handleChucDanhKhoaHocSuccess()
                : chucDanhKhoaHocSlice.actions.handleChucDanhKhoaHocError([])
        );

        if (isSuccess) {
            yield put(chucDanhKhoaHocSlice.actions.getChucDanhKhoaHocs(payload));
        }
    } catch (error) {
        yield put(chucDanhKhoaHocSlice.actions.handleChucDanhKhoaHocError());
    }
}

export default function* saga() {
    yield all([
        yield takeEvery(chucDanhKhoaHocSlice.actions.getChucDanhKhoaHocs().type, _getAll),
        yield takeEvery(chucDanhKhoaHocSlice.actions.handleChucDanhKhoaHoc().type, _handleItem),
    ]);
}