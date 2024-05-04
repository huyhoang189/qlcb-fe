import {all, call, put, takeEvery} from "redux-saga/effects";
import quanLyKhenThuongSlice from "./slice.js";
import {ACTION_NAME,LOAI_KHEN_THUONG_KY_LUAT} from "../../../utils/common.js";
import {create, deleteItem, getAll} from "../../../apis/khenThuongKyLuat.js";

function* _getAll({payload}) {
    try {
        payload.type = LOAI_KHEN_THUONG_KY_LUAT.KHEN_THUONG;
        const {data, status} = yield call(getAll, payload);
        const {metadata} = data
        if (status === 200 || status === 201) {
            yield put(quanLyKhenThuongSlice.actions.getQuanLyKhenThuongsSuccess(metadata));
        } else {
            yield put(quanLyKhenThuongSlice.actions.getQuanLyKhenThuongsError([]));
        }
    } catch (error) {
        yield put(quanLyKhenThuongSlice.actions.getQuanLyKhenThuongsError([]));
    }
}

function* _handleItem({payload}) {
    try {
        const {actionName, item} = payload;
        let data, status;
        item.loai = LOAI_KHEN_THUONG_KY_LUAT.KHEN_THUONG
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
                ? quanLyKhenThuongSlice.actions.handleQuanLyKhenThuongSuccess()
                : quanLyKhenThuongSlice.actions.handleQuanLyKhenThuongError([])
        );

        if (isSuccess) {
            yield put(quanLyKhenThuongSlice.actions.getQuanLyKhenThuongs(item));
        }
    } catch (error) {
        yield put(quanLyKhenThuongSlice.actions.handleQuanLyKhenThuongError());
    }
}

export default function* saga() {
    yield all([
        yield takeEvery(quanLyKhenThuongSlice.actions.getQuanLyKhenThuongs().type, _getAll),
        yield takeEvery(quanLyKhenThuongSlice.actions.handleQuanLyKhenThuong().type, _handleItem),
    ]);
}