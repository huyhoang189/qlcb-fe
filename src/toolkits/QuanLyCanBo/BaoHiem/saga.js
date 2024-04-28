import {all, call, put, takeEvery} from "redux-saga/effects";
import baoHiemSlice from "./slice.js";
import {ACTION_NAME,} from "../../../utils/common.js";
import {create, deleteItem, getAll, update} from "../../../apis/QuanLyCanBo/baoHiem.js";

function* _getAll({payload}) {
    try {
        const {data, status} = yield call(getAll, payload);
        const {metadata} = data
        if (status === 200 || status === 201) {
            yield put(baoHiemSlice.actions.getBaoHiemsSuccess(metadata));
        } else {
            yield put(baoHiemSlice.actions.getBaoHiemsError([]));
        }
    } catch (error) {
        yield put(baoHiemSlice.actions.getBaoHiemsError([]));
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
                ? baoHiemSlice.actions.handleBaoHiemSuccess()
                : baoHiemSlice.actions.handleBaoHiemError([])
        );

        if (isSuccess) {
            yield put(baoHiemSlice.actions.getBaoHiems(item));
        }
    } catch (error) {
        yield put(baoHiemSlice.actions.handleBaoHiemError());
    }
}

export default function* saga() {
    yield all([
        yield takeEvery(baoHiemSlice.actions.getBaoHiems().type, _getAll),
        yield takeEvery(baoHiemSlice.actions.handleBaoHiem().type, _handleItem),
    ]);
}