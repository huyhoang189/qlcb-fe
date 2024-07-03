import { all, call, put, takeEvery } from "redux-saga/effects";
import loaiDanhHieuThiDuaSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/loaiDanhHieuThiDua.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(
        loaiDanhHieuThiDuaSlice.actions.getLoaiDanhHieuThiDuasSuccess(metadata)
      );
    } else {
      yield put(loaiDanhHieuThiDuaSlice.actions.getLoaiDanhHieuThiDuasError([]));
    }
  } catch (error) {
    yield put(loaiDanhHieuThiDuaSlice.actions.getLoaiDanhHieuThiDuasError([]));
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
        ? loaiDanhHieuThiDuaSlice.actions.handleLoaiDanhHieuThiDuaSuccess()
        : loaiDanhHieuThiDuaSlice.actions.handleLoaiDanhHieuThiDuaError([])
    );

    if (isSuccess) {
      yield put(loaiDanhHieuThiDuaSlice.actions.getLoaiDanhHieuThiDuas(payload));
    }
  } catch (error) {
    yield put(loaiDanhHieuThiDuaSlice.actions.handleLoaiDanhHieuThiDuaError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      loaiDanhHieuThiDuaSlice.actions.getLoaiDanhHieuThiDuas().type,
      _getAll
    ),
    yield takeEvery(
      loaiDanhHieuThiDuaSlice.actions.handleLoaiDanhHieuThiDua().type,
      _handleItem
    ),
  ]);
}
