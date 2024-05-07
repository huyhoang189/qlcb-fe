import { all, call, put, takeEvery } from "redux-saga/effects";
import keHoachSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/QuanLyDaoTao/keHoach.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(keHoachSlice.actions.getKeHoachsSuccess(metadata));
    } else {
      yield put(keHoachSlice.actions.getKeHoachsError([]));
    }
  } catch (error) {
    yield put(keHoachSlice.actions.getKeHoachsError([]));
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
        ? keHoachSlice.actions.handleKeHoachSuccess()
        : keHoachSlice.actions.handleKeHoachError([])
    );

    if (isSuccess) {
      yield put(keHoachSlice.actions.getKeHoachs(payload));
    }
  } catch (error) {
    yield put(keHoachSlice.actions.handleKeHoachError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(keHoachSlice.actions.getKeHoachs().type, _getAll),
    yield takeEvery(
      keHoachSlice.actions.handleKeHoach().type,
      _handleItem
    ),
  ]);
}
