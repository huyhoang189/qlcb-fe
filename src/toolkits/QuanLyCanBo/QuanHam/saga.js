import {all, call, put, takeEvery} from "redux-saga/effects";
import quanHamSlice from "./slice.js";
import {ACTION_NAME,} from "../../../utils/common.js";
import {create, deleteItem, getAll, update} from "../../../apis/QuanLyCanBo/quanHam.js";

function* _getAll({payload}) {
    try {
        const {data, status} = yield call(getAll, payload);
        const {metadata} = data
        if (status === 200 || status === 201) {
            yield put(quanHamSlice.actions.getQuanHamsSuccess(metadata));
        } else {
            yield put(quanHamSlice.actions.getQuanHamsError([]));
        }
    } catch (error) {
        yield put(quanHamSlice.actions.getQuanHamsError([]));
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
                ? quanHamSlice.actions.handleQuanHamSuccess()
                : quanHamSlice.actions.handleQuanHamError([])
        );

        if (isSuccess) {
            yield put(quanHamSlice.actions.getQuanHams(item));
        }
    } catch (error) {
        yield put(quanHamSlice.actions.handleQuanHamError());
    }
}

export default function* saga() {
    yield all([
        yield takeEvery(quanHamSlice.actions.getQuanHams().type, _getAll),
        yield takeEvery(quanHamSlice.actions.handleQuanHam().type, _handleItem),
    ]);
}