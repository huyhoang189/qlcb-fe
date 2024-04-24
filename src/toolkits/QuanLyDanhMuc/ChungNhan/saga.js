import { all, call, put, takeEvery } from "redux-saga/effects";
import chungNhanSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import { create, deleteItem, getAll, update } from "../../../apis/chungNhan.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(chungNhanSlice.actions.getChungNhansSuccess(metadata));
    } else {
      yield put(chungNhanSlice.actions.getChungNhansError([]));
    }
  } catch (error) {
    yield put(chungNhanSlice.actions.getChungNhansError([]));
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
        ? chungNhanSlice.actions.handleChungNhanSuccess()
        : chungNhanSlice.actions.handleChungNhanError([])
    );

    if (isSuccess) {
      yield put(chungNhanSlice.actions.getChungNhans(payload));
    }
  } catch (error) {
    yield put(chungNhanSlice.actions.handleChungNhanError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(chungNhanSlice.actions.getChungNhans().type, _getAll),
    yield takeEvery(chungNhanSlice.actions.handleChungNhan().type, _handleItem),
  ]);
}
