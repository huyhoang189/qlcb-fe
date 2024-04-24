import {all, call, put, takeEvery} from "redux-saga/effects";
import chucDanhPhapLySlice from "./slice.js";
import {ACTION_NAME,} from "../../../utils/common.js";
import {create, deleteItem, getAll, update} from "../../../apis/chucDanhPhapLy.js";

function* _getAll({payload}) {
    try {
        const {data, status} = yield call(getAll, payload);
        const {metadata} = data
        if (status === 200 || status === 201) {
            yield put(chucDanhPhapLySlice.actions.getChucDanhPhapLysSuccess(metadata));
        } else {
            yield put(chucDanhPhapLySlice.actions.getChucDanhPhapLysError([]));
        }
    } catch (error) {
        yield put(chucDanhPhapLySlice.actions.getChucDanhPhapLysError([]));
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
                ? chucDanhPhapLySlice.actions.handleChucDanhPhapLySuccess()
                : chucDanhPhapLySlice.actions.handleChucDanhPhapLyError([])
        );

        if (isSuccess) {
            yield put(chucDanhPhapLySlice.actions.getChucDanhPhapLys(payload));
        }
    } catch (error) {
        yield put(chucDanhPhapLySlice.actions.handleChucDanhPhapLyError());
    }
}

export default function* saga() {
    yield all([
        yield takeEvery(chucDanhPhapLySlice.actions.getChucDanhPhapLys().type, _getAll),
        yield takeEvery(chucDanhPhapLySlice.actions.handleChucDanhPhapLy().type, _handleItem),
    ]);
}