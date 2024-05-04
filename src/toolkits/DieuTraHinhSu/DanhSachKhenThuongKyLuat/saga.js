import { all, call, put, takeEvery } from "redux-saga/effects";
import danhSachKhenThuongKyLuatSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  deleteItem,
  getAll,
} from "../../../apis/DieuTraHinhSu/danhSachKhenThuongKyLuat.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(
        danhSachKhenThuongKyLuatSlice.actions.getDanhSachKhenThuongKyLuatsSuccess(metadata)
      );
    } else {
      yield put(danhSachKhenThuongKyLuatSlice.actions.getDanhSachKhenThuongKyLuatsError([]));
    }
  } catch (error) {
    yield put(danhSachKhenThuongKyLuatSlice.actions.getDanhSachKhenThuongKyLuatsError([]));
  }
}

function* _handleItem({ payload }) {
  try {
    const { actionName, item } = payload;
    console.log(payload);
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
        ? danhSachKhenThuongKyLuatSlice.actions.handleDanhSachKhenThuongKyLuatSuccess()
        : danhSachKhenThuongKyLuatSlice.actions.handleDanhSachKhenThuongKyLuatError([])
    );

    if (isSuccess) {
      yield put(danhSachKhenThuongKyLuatSlice.actions.getDanhSachKhenThuongKyLuats(payload));
    }
  } catch (error) {
    yield put(danhSachKhenThuongKyLuatSlice.actions.handleDanhSachKhenThuongKyLuatError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      danhSachKhenThuongKyLuatSlice.actions.getDanhSachKhenThuongKyLuats().type,
      _getAll
    ),
    yield takeEvery(
      danhSachKhenThuongKyLuatSlice.actions.handleDanhSachKhenThuongKyLuat().type,
      _handleItem
    ),
  ]);
}
