import { all, call, put, takeEvery } from "redux-saga/effects";
import danhSachDaoTaoSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/QuanLyDaoTao/danhSachDaoTao.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(danhSachDaoTaoSlice.actions.getDanhSachDaoTaosSuccess(metadata));
    } else {
      yield put(danhSachDaoTaoSlice.actions.getDanhSachDaoTaosError([]));
    }
  } catch (error) {
    yield put(danhSachDaoTaoSlice.actions.getDanhSachDaoTaosError([]));
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
        ? danhSachDaoTaoSlice.actions.handleDanhSachDaoTaoSuccess()
        : danhSachDaoTaoSlice.actions.handleDanhSachDaoTaoError([])
    );

    if (isSuccess) {
      yield put(danhSachDaoTaoSlice.actions.getDanhSachDaoTaos(payload));
    }
  } catch (error) {
    yield put(danhSachDaoTaoSlice.actions.handleDanhSachDaoTaoError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(danhSachDaoTaoSlice.actions.getDanhSachDaoTaos().type, _getAll),
    yield takeEvery(
      danhSachDaoTaoSlice.actions.handleDanhSachDaoTao().type,
      _handleItem
    ),
  ]);
}
