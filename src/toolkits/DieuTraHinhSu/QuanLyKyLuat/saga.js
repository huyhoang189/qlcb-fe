import {all, call, put, takeEvery} from "redux-saga/effects";
import quanLyKyLuatSlice from "./slice.js";
import {ACTION_NAME,} from "../../../utils/common.js";
import {create, deleteItem, getAll, detail, deleteItemDetail} from "../../../apis/khenThuongKyLuat.js";

function* _getAll({payload}) {
    try {
        const {data, status} = yield call(getAll, payload);
        const {metadata} = data
        if (status === 200 || status === 201) {
            yield put(quanLyKyLuatSlice.actions.getQuanLyKyLuatsSuccess(metadata));
        } else {
            yield put(quanLyKyLuatSlice.actions.getQuanLyKyLuatsError([]));
        }
    } catch (error) {
        yield put(quanLyKyLuatSlice.actions.getQuanLyKyLuatsError([]));
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
                ? quanLyKyLuatSlice.actions.handleQuanLyKyLuatSuccess()
                : quanLyKyLuatSlice.actions.handleQuanLyKyLuatError([])
        );

        if (isSuccess) {
            yield put(quanLyKyLuatSlice.actions.getQuanLyKyLuats(item));
        }
    } catch (error) {
        yield put(quanLyKyLuatSlice.actions.handleQuanLyKyLuatError());
    }
}

export default function* saga() {
    yield all([
        yield takeEvery(quanLyKyLuatSlice.actions.getQuanLyKyLuats().type, _getAll),
        yield takeEvery(quanLyKyLuatSlice.actions.handleQuanLyKyLuat().type, _handleItem),
    ]);
}