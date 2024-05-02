import {all, call, put, takeEvery} from "redux-saga/effects";
import lyLichChucDanhPhapLySlice from "./slice.js";
import {ACTION_NAME,} from "../../../utils/common.js";
import {create, deleteItem, getAll, update} from "../../../apis/QuanLyCanBo/lyLichChucDanhPhapLy.js";

function* _getAll({payload}) {
    try {
        const {data, status} = yield call(getAll, payload);
        const {metadata} = data
        if (status === 200 || status === 201) {
            yield put(lyLichChucDanhPhapLySlice.actions.getLyLichChucDanhPhapLysSuccess(metadata));
        } else {
            yield put(lyLichChucDanhPhapLySlice.actions.getLyLichChucDanhPhapLysError([]));
        }
    } catch (error) {
        yield put(lyLichChucDanhPhapLySlice.actions.getLyLichChucDanhPhapLysError([]));
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
                ? lyLichChucDanhPhapLySlice.actions.handleLyLichChucDanhPhapLySuccess()
                : lyLichChucDanhPhapLySlice.actions.handleLyLichChucDanhPhapLyError([])
        );

        if (isSuccess) {
            yield put(lyLichChucDanhPhapLySlice.actions.getLyLichChucDanhPhapLys(item));
        }
    } catch (error) {
        yield put(lyLichChucDanhPhapLySlice.actions.handleLyLichChucDanhPhapLyError());
    }
}

export default function* saga() {
    yield all([
        yield takeEvery(lyLichChucDanhPhapLySlice.actions.getLyLichChucDanhPhapLys().type, _getAll),
        yield takeEvery(lyLichChucDanhPhapLySlice.actions.handleLyLichChucDanhPhapLy().type, _handleItem),
    ]);
}