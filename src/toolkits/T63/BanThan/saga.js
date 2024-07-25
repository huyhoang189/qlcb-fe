import { all, call, put, takeEvery } from "redux-saga/effects";
import banThanSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/T63/banthan.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    console.log("ok")
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

    // yield put(
    //   isSuccess
    //     ? banThanSlice.actions.handleBanThanSuccess()
    //     : banThanSlice.actions.handleBanThanError([])
    // );

    if (isSuccess) {
      yield put(banThanSlice.actions.getBanThans(item));
    }
  } catch (error) {
    yield put(banThanSlice.actions.handleBanThanError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      banThanSlice.actions.getBanThans().type,
      _getAll
    ),
    yield takeEvery(
      banThanSlice.actions.handleBanThan().type,
      _handleItem
    ),
  ]);
}
