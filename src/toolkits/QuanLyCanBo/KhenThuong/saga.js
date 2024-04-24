import {all, call, put, takeEvery} from "redux-saga/effects";
import khenThuongSlice from "./slice.js";
import {ACTION_NAME,} from "../../../utils/common.js";
import {create, deleteItem, getAll, update} from "../../../apis/QuanLyCanBo/khenThuong.js";

function* _getAll({payload}) {
    try {
        const {data, status} = yield call(getAll, payload);
        const {metadata} = data
        if (status === 200 || status === 201) {
            yield put(khenThuongSlice.actions.getKhenThuongsSuccess(metadata));
        } else {
            yield put(khenThuongSlice.actions.getKhenThuongsError([]));
        }
    } catch (error) {
        yield put(khenThuongSlice.actions.getKhenThuongsError([]));
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
                ? khenThuongSlice.actions.handleKhenThuongSuccess()
                : khenThuongSlice.actions.handleKhenThuongError([])
        );

        if (isSuccess) {
            yield put(khenThuongSlice.actions.getKhenThuongs(item));
        }
    } catch (error) {
        yield put(khenThuongSlice.actions.handleKhenThuongError());
    }
}

export default function* saga() {
    yield all([
        yield takeEvery(khenThuongSlice.actions.getKhenThuongs().type, _getAll),
        yield takeEvery(khenThuongSlice.actions.handleKhenThuong().type, _handleItem),
    ]);
}