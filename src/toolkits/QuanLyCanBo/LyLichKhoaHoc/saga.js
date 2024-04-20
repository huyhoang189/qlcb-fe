import {all, call, put, takeEvery} from "redux-saga/effects";
import lyLichKhoaHocSlice from "./slice.js";
import {ACTION_NAME,} from "../../../utils/common.js";
import {create, deleteItem, getAll, update} from "../../../apis/lyLichKhoaHoc.js";

function* _getAll({payload}) {
    try {
        const {data, status} = yield call(getAll, payload);
        const {metadata} = data
        if (status === 200 || status === 201) {
            yield put(lyLichKhoaHocSlice.actions.getLyLichKhoaHocsSuccess(metadata));
        } else {
            yield put(lyLichKhoaHocSlice.actions.getLyLichKhoaHocsError([]));
        }
    } catch (error) {
        yield put(lyLichKhoaHocSlice.actions.getLyLichKhoaHocsError([]));
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
                ? lyLichKhoaHocSlice.actions.handleLyLichKhoaHocSuccess()
                : lyLichKhoaHocSlice.actions.handleLyLichKhoaHocError([])
        );

        if (isSuccess) {
            yield put(lyLichKhoaHocSlice.actions.getLyLichKhoaHocs(item));
        }
    } catch (error) {
        yield put(lyLichKhoaHocSlice.actions.handleLyLichKhoaHocError());
    }
}

export default function* saga() {
    yield all([
        yield takeEvery(lyLichKhoaHocSlice.actions.getLyLichKhoaHocs().type, _getAll),
        yield takeEvery(lyLichKhoaHocSlice.actions.handleLyLichKhoaHoc().type, _handleItem),
    ]);
}