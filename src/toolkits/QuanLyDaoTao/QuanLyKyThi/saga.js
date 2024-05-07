import { all, call, put, takeEvery } from "redux-saga/effects";
import kyThiSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/QuanLyDaoTao/kyThi.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(kyThiSlice.actions.getKyThisSuccess(metadata));
    } else {
      yield put(kyThiSlice.actions.getKyThisError([]));
    }
  } catch (error) {
    yield put(kyThiSlice.actions.getKyThisError([]));
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
        ? kyThiSlice.actions.handleKyThiSuccess()
        : kyThiSlice.actions.handleKyThiError([])
    );

    if (isSuccess) {
      yield put(kyThiSlice.actions.getKyThis(payload));
    }
  } catch (error) {
    yield put(kyThiSlice.actions.handleKyThiError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(kyThiSlice.actions.getKyThis().type, _getAll),
    yield takeEvery(
      kyThiSlice.actions.handleKyThi().type,
      _handleItem
    ),
  ]);
}
