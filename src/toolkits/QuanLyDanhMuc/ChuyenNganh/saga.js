import { all, call, put, takeEvery } from "redux-saga/effects";
import chuyenNganhSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/chuyenNganh.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(chuyenNganhSlice.actions.getChuyenNganhsSuccess(metadata));
    } else {
      yield put(chuyenNganhSlice.actions.getChuyenNganhsError([]));
    }
  } catch (error) {
    yield put(chuyenNganhSlice.actions.getChuyenNganhsError([]));
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
        ? chuyenNganhSlice.actions.handleChuyenNganhSuccess()
        : chuyenNganhSlice.actions.handleChuyenNganhError([])
    );

    if (isSuccess) {
      yield put(chuyenNganhSlice.actions.getChuyenNganhs(payload));
    }
  } catch (error) {
    yield put(chuyenNganhSlice.actions.handleChuyenNganhError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(chuyenNganhSlice.actions.getChuyenNganhs().type, _getAll),
    yield takeEvery(
      chuyenNganhSlice.actions.handleChuyenNganh().type,
      _handleItem
    ),
  ]);
}
