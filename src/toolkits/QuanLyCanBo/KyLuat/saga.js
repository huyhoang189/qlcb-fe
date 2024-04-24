import {all, call, put, takeEvery} from "redux-saga/effects";
import kyLuatSlice from "./slice.js";
import {ACTION_NAME,} from "../../../utils/common.js";
import {create, deleteItem, getAll, update} from "../../../apis/QuanLyCanBo/kyLuat.js";

function* _getAll({payload}) {
    try {
        const {data, status} = yield call(getAll, payload);
        const {metadata} = data
        if (status === 200 || status === 201) {
            yield put(kyLuatSlice.actions.getKyLuatsSuccess(metadata));
        } else {
            yield put(kyLuatSlice.actions.getKyLuatsError([]));
        }
    } catch (error) {
        yield put(kyLuatSlice.actions.getKyLuatsError([]));
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
                ? kyLuatSlice.actions.handleKyLuatSuccess()
                : kyLuatSlice.actions.handleKyLuatError([])
        );

        if (isSuccess) {
            yield put(kyLuatSlice.actions.getKyLuats(item));
        }
    } catch (error) {
        yield put(kyLuatSlice.actions.handleKyLuatError());
    }
}

export default function* saga() {
    yield all([
        yield takeEvery(kyLuatSlice.actions.getKyLuats().type, _getAll),
        yield takeEvery(kyLuatSlice.actions.handleKyLuat().type, _handleItem),
    ]);
}