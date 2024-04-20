import {all, call, put, takeEvery} from "redux-saga/effects";
import chucVuChinhQuyenSlice from "./slice.js";
import {ACTION_NAME,} from "../../../utils/common.js";
import {create, deleteItem, getAll, update} from "../../../apis/chucVuChinhQuyen.js";

function* _getAll({payload}) {
    try {
        const {data, status} = yield call(getAll, payload);
        const {metadata} = data
        if (status === 200 || status === 201) {
            yield put(chucVuChinhQuyenSlice.actions.getChucVuChinhQuyensSuccess(metadata));
        } else {
            yield put(chucVuChinhQuyenSlice.actions.getChucVuChinhQuyensError([]));
        }
    } catch (error) {
        yield put(chucVuChinhQuyenSlice.actions.getChucVuChinhQuyensError([]));
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
                ? chucVuChinhQuyenSlice.actions.handleChucVuChinhQuyenSuccess()
                : chucVuChinhQuyenSlice.actions.handleChucVuChinhQuyenError([])
        );

        if (isSuccess) {
            yield put(chucVuChinhQuyenSlice.actions.getChucVuChinhQuyens(payload));
        }
    } catch (error) {
        yield put(chucVuChinhQuyenSlice.actions.handleChucVuChinhQuyenError());
    }
}

export default function* saga() {
    yield all([
        yield takeEvery(chucVuChinhQuyenSlice.actions.getChucVuChinhQuyens().type, _getAll),
        yield takeEvery(chucVuChinhQuyenSlice.actions.handleChucVuChinhQuyen().type, _handleItem),
    ]);
}