import {all, call, put, takeEvery} from "redux-saga/effects";
import tinhHinhNhaOSlice from "./slice.js";
import {ACTION_NAME,} from "../../../utils/common.js";
import {create, deleteItem, getAll, update} from "../../../apis/QuanLyCanBo/tinhHinhNhaO.js";

function* _getAll({payload}) {
    try {
        const {data, status} = yield call(getAll, payload);
        const {metadata} = data
        if (status === 200 || status === 201) {
            yield put(tinhHinhNhaOSlice.actions.getTinhHinhNhaOsSuccess(metadata));
        } else {
            yield put(tinhHinhNhaOSlice.actions.getTinhHinhNhaOsError([]));
        }
    } catch (error) {
        yield put(tinhHinhNhaOSlice.actions.getTinhHinhNhaOsError([]));
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
                ? tinhHinhNhaOSlice.actions.handleTinhHinhNhaOSuccess()
                : tinhHinhNhaOSlice.actions.handleTinhHinhNhaOError([])
        );

        if (isSuccess) {
            yield put(tinhHinhNhaOSlice.actions.getTinhHinhNhaOs(item));
        }
    } catch (error) {
        yield put(tinhHinhNhaOSlice.actions.handleTinhHinhNhaOError());
    }
}

export default function* saga() {
    yield all([
        yield takeEvery(tinhHinhNhaOSlice.actions.getTinhHinhNhaOs().type, _getAll),
        yield takeEvery(tinhHinhNhaOSlice.actions.handleTinhHinhNhaO().type, _handleItem),
    ]);
}