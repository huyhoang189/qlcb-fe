import {all, call, put, takeEvery} from "redux-saga/effects";
import chungNhanCapSlice from "./slice.js";
import {ACTION_NAME,} from "../../../utils/common.js";
import {create, deleteItem, getAll, update} from "../../../apis/QuanLyCanBo/chungNhanCap.js";

function* _getAll({payload}) {
    try {
        const {data, status} = yield call(getAll, payload);
        const {metadata} = data
        if (status === 200 || status === 201) {
            yield put(chungNhanCapSlice.actions.getChungNhanCapsSuccess(metadata));
        } else {
            yield put(chungNhanCapSlice.actions.getChungNhanCapsError([]));
        }
    } catch (error) {
        yield put(chungNhanCapSlice.actions.getChungNhanCapsError([]));
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
                ? chungNhanCapSlice.actions.handleChungNhanCapSuccess()
                : chungNhanCapSlice.actions.handleChungNhanCapError([])
        );

        if (isSuccess) {
            yield put(chungNhanCapSlice.actions.getChungNhanCaps(item));
        }
    } catch (error) {
        yield put(chungNhanCapSlice.actions.handleChungNhanCapError());
    }
}

export default function* saga() {
    yield all([
        yield takeEvery(chungNhanCapSlice.actions.getChungNhanCaps().type, _getAll),
        yield takeEvery(chungNhanCapSlice.actions.handleChungNhanCap().type, _handleItem),
    ]);
}