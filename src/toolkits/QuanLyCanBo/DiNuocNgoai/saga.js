import {all, call, put, takeEvery} from "redux-saga/effects";
import diNuocNgoaiSlice from "./slice.js";
import {ACTION_NAME,} from "../../../utils/common.js";
import {create, deleteItem, getAll, update} from "../../../apis/QuanLyCanBo/diNuocNgoai.js";

function* _getAll({payload}) {
    try {
        const {data, status} = yield call(getAll, payload);
        const {metadata} = data
        if (status === 200 || status === 201) {
            yield put(diNuocNgoaiSlice.actions.getDiNuocNgoaisSuccess(metadata));
        } else {
            yield put(diNuocNgoaiSlice.actions.getDiNuocNgoaisError([]));
        }
    } catch (error) {
        yield put(diNuocNgoaiSlice.actions.getDiNuocNgoaisError([]));
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
                ? diNuocNgoaiSlice.actions.handleDiNuocNgoaiSuccess()
                : diNuocNgoaiSlice.actions.handleDiNuocNgoaiError([])
        );

        if (isSuccess) {
            yield put(diNuocNgoaiSlice.actions.getDiNuocNgoais(item));
        }
    } catch (error) {
        yield put(diNuocNgoaiSlice.actions.handleDiNuocNgoaiError());
    }
}

export default function* saga() {
    yield all([
        yield takeEvery(diNuocNgoaiSlice.actions.getDiNuocNgoais().type, _getAll),
        yield takeEvery(diNuocNgoaiSlice.actions.handleDiNuocNgoai().type, _handleItem),
    ]);
}