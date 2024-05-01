import { all, call, put, takeEvery } from "redux-saga/effects";
import danhSachBoNhiemSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/BoNhiemCanBo/danhSachBoNhiem.api.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(
        danhSachBoNhiemSlice.actions.getDanhSachBoNhiemsSuccess(metadata)
      );
    } else {
      yield put(danhSachBoNhiemSlice.actions.getDanhSachBoNhiemsError([]));
    }
  } catch (error) {
    yield put(danhSachBoNhiemSlice.actions.getDanhSachBoNhiemsError([]));
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
        ? danhSachBoNhiemSlice.actions.handleDanhSachBoNhiemSuccess()
        : danhSachBoNhiemSlice.actions.handleDanhSachBoNhiemError([])
    );

    if (isSuccess) {
      yield put(danhSachBoNhiemSlice.actions.getDanhSachBoNhiems(payload));
    }
  } catch (error) {
    yield put(danhSachBoNhiemSlice.actions.handleDanhSachBoNhiemError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      danhSachBoNhiemSlice.actions.getDanhSachBoNhiems().type,
      _getAll
    ),
    yield takeEvery(
      danhSachBoNhiemSlice.actions.handleDanhSachBoNhiem().type,
      _handleItem
    ),
  ]);
}
