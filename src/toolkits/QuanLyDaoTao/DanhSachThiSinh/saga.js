import { all, call, put, takeEvery } from "redux-saga/effects";
import danhSachThiSinhSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/QuanLyDaoTao/danhSachThiSinh.api.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(
        danhSachThiSinhSlice.actions.getDanhSachThiSinhsSuccess(metadata)
      );
    } else {
      yield put(danhSachThiSinhSlice.actions.getDanhSachThiSinhsError([]));
    }
  } catch (error) {
    yield put(danhSachThiSinhSlice.actions.getDanhSachThiSinhsError([]));
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
        ? danhSachThiSinhSlice.actions.handleDanhSachThiSinhSuccess()
        : danhSachThiSinhSlice.actions.handleDanhSachThiSinhError([])
    );

    if (isSuccess) {
      yield put(danhSachThiSinhSlice.actions.getDanhSachThiSinhs(payload));
    }
  } catch (error) {
    yield put(danhSachThiSinhSlice.actions.handleDanhSachThiSinhError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      danhSachThiSinhSlice.actions.getDanhSachThiSinhs().type,
      _getAll
    ),
    yield takeEvery(
      danhSachThiSinhSlice.actions.handleDanhSachThiSinh().type,
      _handleItem
    ),
  ]);
}
