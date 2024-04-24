import {all, call, put, takeEvery} from "redux-saga/effects";
import trinhDoNgoaiNguSlice from "./slice.js";
import {ACTION_NAME,} from "../../../utils/common.js";
import {create, deleteItem, getAll, update} from "../../../apis/QuanLyCanBo/trinhDoNgoaiNgu.js";

function* _getAll({payload}) {
    try {
        const {data, status} = yield call(getAll, payload);
        const {metadata} = data
        if (status === 200 || status === 201) {
            yield put(trinhDoNgoaiNguSlice.actions.getTrinhDoNgoaiNgusSuccess(metadata));
        } else {
            yield put(trinhDoNgoaiNguSlice.actions.getTrinhDoNgoaiNgusError([]));
        }
    } catch (error) {
        yield put(trinhDoNgoaiNguSlice.actions.getTrinhDoNgoaiNgusError([]));
    }
}

function* _handleItem({payload}) {
    try {
        const {actionName, item} = payload;
        let data, status;

        if (actionName === ACTION_NAME.CREATE && item.ma_ngon_ngu !== "") {
            ({data, status} = yield call(create, item));
        } else if (actionName === ACTION_NAME.UPDATE) {
            ({data, status} = yield call(update, item));
        } else if (actionName === ACTION_NAME.DELETE) {
            ({data, status} = yield call(deleteItem, {id: item.id}));
        }

        const isSuccess = status === 200 || status === 201;

        yield put(
            isSuccess
                ? trinhDoNgoaiNguSlice.actions.handleTrinhDoNgoaiNguSuccess()
                : trinhDoNgoaiNguSlice.actions.handleTrinhDoNgoaiNguError([])
        );

        if (isSuccess) {
            yield put(trinhDoNgoaiNguSlice.actions.getTrinhDoNgoaiNgus(item));
        }
    } catch (error) {
        yield put(trinhDoNgoaiNguSlice.actions.handleTrinhDoNgoaiNguError());
    }
}

export default function* saga() {
    yield all([
        yield takeEvery(trinhDoNgoaiNguSlice.actions.getTrinhDoNgoaiNgus().type, _getAll),
        yield takeEvery(trinhDoNgoaiNguSlice.actions.handleTrinhDoNgoaiNgu().type, _handleItem),
    ]);
}