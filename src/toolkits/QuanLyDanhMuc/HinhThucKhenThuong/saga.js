import { all, call, put, takeEvery } from "redux-saga/effects";
import hinhThucKhenThuongSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/hinhThucKhenThuong.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(
        hinhThucKhenThuongSlice.actions.getHinhThucKhenThuongsSuccess(metadata)
      );
    } else {
      yield put(hinhThucKhenThuongSlice.actions.getHinhThucKhenThuongsError([]));
    }
  } catch (error) {
    yield put(hinhThucKhenThuongSlice.actions.getHinhThucKhenThuongsError([]));
  }
}

function* _handleItem({ payload }) {
  try {
    const { actionName, item } = payload;
    let data, status;

    if (actionName === ACTION_NAME.CREATE) {
      ({ data, status } = yield call(create, item));
    } else if (actionName === ACTION_NAME.UPDATE) {
      ({ data, status } = yield call(update, item));
    } else if (actionName === ACTION_NAME.DELETE) {
      ({ data, status } = yield call(deleteItem, { id: item.id }));
    }

    const isSuccess = status === 200 || status === 201;

    yield put(
      isSuccess
        ? hinhThucKhenThuongSlice.actions.handleHinhThucKhenThuongSuccess()
        : hinhThucKhenThuongSlice.actions.handleHinhThucKhenThuongError([])
    );

    if (isSuccess) {
      yield put(hinhThucKhenThuongSlice.actions.getHinhThucKhenThuongs(payload));
    }
  } catch (error) {
    yield put(hinhThucKhenThuongSlice.actions.handleHinhThucKhenThuongError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      hinhThucKhenThuongSlice.actions.getHinhThucKhenThuongs().type,
      _getAll
    ),
    yield takeEvery(
      hinhThucKhenThuongSlice.actions.handleHinhThucKhenThuong().type,
      _handleItem
    ),
  ]);
}
