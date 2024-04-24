import { all, call, put, takeEvery } from "redux-saga/effects";
import ngoaiNguSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import { create, deleteItem, getAll, update } from "../../../apis/ngoaiNgu.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(ngoaiNguSlice.actions.getNgoaiNgusSuccess(metadata));
    } else {
      yield put(ngoaiNguSlice.actions.getNgoaiNgusError([]));
    }
  } catch (error) {
    yield put(ngoaiNguSlice.actions.getNgoaiNgusError([]));
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
        ? ngoaiNguSlice.actions.handleNgoaiNguSuccess()
        : ngoaiNguSlice.actions.handleNgoaiNguError([])
    );

    if (isSuccess) {
      yield put(ngoaiNguSlice.actions.getNgoaiNgus(payload));
    }
  } catch (error) {
    yield put(ngoaiNguSlice.actions.handleNgoaiNguError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(ngoaiNguSlice.actions.getNgoaiNgus().type, _getAll),
    yield takeEvery(ngoaiNguSlice.actions.handleNgoaiNgu().type, _handleItem),
  ]);
}
