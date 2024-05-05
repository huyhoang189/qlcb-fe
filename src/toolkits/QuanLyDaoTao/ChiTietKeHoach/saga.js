import { all, call, put, takeEvery } from "redux-saga/effects";
import chiTietKeHoachSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/QuanLyDaoTao/chiTietKeHoach.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(chiTietKeHoachSlice.actions.getChiTietKeHoachsSuccess(metadata));
    } else {
      yield put(chiTietKeHoachSlice.actions.getChiTietKeHoachsError([]));
    }
  } catch (error) {
    yield put(chiTietKeHoachSlice.actions.getChiTietKeHoachsError([]));
  }
}

function* _handleItem({ payload }) {
  try {
    const { actionName, item } = payload;
    let data, status;
    payload.ma_ke_hoach = item.ma_ke_hoach;
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
        ? chiTietKeHoachSlice.actions.handleChiTietKeHoachSuccess()
        : chiTietKeHoachSlice.actions.handleChiTietKeHoachError([])
    );

    if (isSuccess) {
      yield put(chiTietKeHoachSlice.actions.getChiTietKeHoachs(payload));
    }
  } catch (error) {
    yield put(chiTietKeHoachSlice.actions.handleChiTietKeHoachError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(chiTietKeHoachSlice.actions.getChiTietKeHoachs().type, _getAll),
    yield takeEvery(
      chiTietKeHoachSlice.actions.handleChiTietKeHoach().type,
      _handleItem
    ),
  ]);
}
