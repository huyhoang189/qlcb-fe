import { all, call, put, takeEvery } from "redux-saga/effects";
import banThanSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  getAll,
} from "../../../apis/T63/banthan.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(
        banThanSlice.actions.getBanThansSuccess(metadata)
      );
    } else {
      yield put(banThanSlice.actions.getBanThansError([]));
    }
  } catch (error) {
    yield put(banThanSlice.actions.getBanThansError([]));
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      banThanSlice.actions.getBanThans().type,
      _getAll
    ),
  ]);
}
