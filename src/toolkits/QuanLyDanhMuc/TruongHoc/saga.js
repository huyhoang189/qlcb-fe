import { all, call, put, takeEvery } from "redux-saga/effects";
import truongHocSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import { create, deleteItem, getAll, update } from "../../../apis/truongHoc.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(truongHocSlice.actions.getTruongHocsSuccess(metadata));
    } else {
      yield put(truongHocSlice.actions.getTruongHocsError([]));
    }
  } catch (error) {
    yield put(truongHocSlice.actions.getTruongHocsError([]));
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
        ? truongHocSlice.actions.handleTruongHocSuccess()
        : truongHocSlice.actions.handleTruongHocError([])
    );

    if (isSuccess) {
      yield put(truongHocSlice.actions.getTruongHocs(payload));
    }
  } catch (error) {
    yield put(truongHocSlice.actions.handleTruongHocError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(truongHocSlice.actions.getTruongHocs().type, _getAll),
    yield takeEvery(truongHocSlice.actions.handleTruongHoc().type, _handleItem),
  ]);
}
