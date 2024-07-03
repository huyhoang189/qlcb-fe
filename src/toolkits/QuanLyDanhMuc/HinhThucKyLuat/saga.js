import { all, call, put, takeEvery } from "redux-saga/effects";
import hinhThucKyLuatSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/hinhThucKyLuat.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(
        hinhThucKyLuatSlice.actions.getHinhThucKyLuatsSuccess(metadata)
      );
    } else {
      yield put(hinhThucKyLuatSlice.actions.getHinhThucKyLuatsError([]));
    }
  } catch (error) {
    yield put(hinhThucKyLuatSlice.actions.getHinhThucKyLuatsError([]));
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
        ? hinhThucKyLuatSlice.actions.handleHinhThucKyLuatSuccess()
        : hinhThucKyLuatSlice.actions.handleHinhThucKyLuatError([])
    );

    if (isSuccess) {
      yield put(hinhThucKyLuatSlice.actions.getHinhThucKyLuats(payload));
    }
  } catch (error) {
    yield put(hinhThucKyLuatSlice.actions.handleHinhThucKyLuatError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      hinhThucKyLuatSlice.actions.getHinhThucKyLuats().type,
      _getAll
    ),
    yield takeEvery(
      hinhThucKyLuatSlice.actions.handleHinhThucKyLuat().type,
      _handleItem
    ),
  ]);
}
