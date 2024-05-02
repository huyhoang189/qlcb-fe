import {all, call, put, takeEvery} from "redux-saga/effects";
import quaTrinhCongTacSlice from "./slice.js";
import {ACTION_NAME,} from "../../../utils/common.js";
import {create, deleteItem, getAll, update} from "../../../apis/QuanLyCanBo/quaTrinhCongTac.js";

function* _getAll({payload}) {
    try {
        const {data, status} = yield call(getAll, payload);
        const {metadata} = data
        if (status === 200 || status === 201) {
            yield put(quaTrinhCongTacSlice.actions.getQuaTrinhCongTacsSuccess(metadata));
        } else {
            yield put(quaTrinhCongTacSlice.actions.getQuaTrinhCongTacsError([]));
        }
    } catch (error) {
        yield put(quaTrinhCongTacSlice.actions.getQuaTrinhCongTacsError([]));
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
                ? quaTrinhCongTacSlice.actions.handleQuaTrinhCongTacSuccess()
                : quaTrinhCongTacSlice.actions.handleQuaTrinhCongTacError([])
        );

        if (isSuccess) {
            yield put(quaTrinhCongTacSlice.actions.getQuaTrinhCongTacs(item));
        }
    } catch (error) {
        yield put(quaTrinhCongTacSlice.actions.handleQuaTrinhCongTacError());
    }
}

export default function* saga() {
    yield all([
        yield takeEvery(quaTrinhCongTacSlice.actions.getQuaTrinhCongTacs().type, _getAll),
        yield takeEvery(quaTrinhCongTacSlice.actions.handleQuaTrinhCongTac().type, _handleItem),
    ]);
}