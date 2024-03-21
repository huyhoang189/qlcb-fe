import {all, call, put, takeEvery} from "redux-saga/effects";
import donViSlice from "./slice";
import {ACTION_NAME,} from "../../utils/common.js";
import {create, deleteItem, getAll, update} from "../../apis/don-vi.js";

function* _getAll({payload}) {
    try {
        const {data, status} = yield call(getAll, payload);
        const {metadata} = data
        if (status === 200 || status === 201) {
            yield put(donViSlice.actions.getDonVisSuccess(metadata));
        } else {
            yield put(donViSlice.actions.getDonVisError([]));
        }
    } catch (error) {
        yield put(donViSlice.actions.getDonVisError([]));
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
                ? donViSlice.actions.handleDonViSuccess()
                : donViSlice.actions.handleDonViError([])
        );

        if (isSuccess) {
            yield put(donViSlice.actions.getDonVis(payload));
        }
    } catch (error) {
        yield put(donViSlice.actions.handleDonViError());
    }
}

export default function* saga() {
    yield all([
        yield takeEvery(donViSlice.actions.getDonVis().type, _getAll),
        yield takeEvery(donViSlice.actions.handleDonVi().type, _handleItem),
    ]);
}