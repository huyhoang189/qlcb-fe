import {all, call, put, takeEvery} from "redux-saga/effects";
import tinhTrangSucKhoeSlice from "./slice.js";
import {ACTION_NAME,} from "../../../utils/common.js";
import {create, deleteItem, getAll, update} from "../../../apis/QuanLyCanBo/tinhTrangSucKhoe.js";

function* _getAll({payload}) {
    try {
        const {data, status} = yield call(getAll, payload);
        const {metadata} = data
        if (status === 200 || status === 201) {
            yield put(tinhTrangSucKhoeSlice.actions.getTinhTrangSucKhoesSuccess(metadata));
        } else {
            yield put(tinhTrangSucKhoeSlice.actions.getTinhTrangSucKhoesError([]));
        }
    } catch (error) {
        yield put(tinhTrangSucKhoeSlice.actions.getTinhTrangSucKhoesError([]));
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
                ? tinhTrangSucKhoeSlice.actions.handleTinhTrangSucKhoeSuccess()
                : tinhTrangSucKhoeSlice.actions.handleTinhTrangSucKhoeError([])
        );

        if (isSuccess) {
            yield put(tinhTrangSucKhoeSlice.actions.getTinhTrangSucKhoes(item));
        }
    } catch (error) {
        yield put(tinhTrangSucKhoeSlice.actions.handleTinhTrangSucKhoeError());
    }
}

export default function* saga() {
    yield all([
        yield takeEvery(tinhTrangSucKhoeSlice.actions.getTinhTrangSucKhoes().type, _getAll),
        yield takeEvery(tinhTrangSucKhoeSlice.actions.handleTinhTrangSucKhoe().type, _handleItem),
    ]);
}