import { all, call, put, takeEvery } from "redux-saga/effects";
import lichSuDieuDongSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/DieuDongCanBo/dieuDongCanBo.api.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(
        lichSuDieuDongSlice.actions.getLichSuDieuDongsSuccess(metadata)
      );
    } else {
      yield put(lichSuDieuDongSlice.actions.getLichSuDieuDongsError([]));
    }
  } catch (error) {
    yield put(lichSuDieuDongSlice.actions.getLichSuDieuDongsError([]));
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
        ? lichSuDieuDongSlice.actions.handleLichSuDieuDongSuccess()
        : lichSuDieuDongSlice.actions.handleLichSuDieuDongError([])
    );

    if (isSuccess) {
      yield put(lichSuDieuDongSlice.actions.getLichSuDieuDongs(payload));
    }
  } catch (error) {
    yield put(lichSuDieuDongSlice.actions.handleLichSuDieuDongError());
    console.log(error);
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      lichSuDieuDongSlice.actions.getLichSuDieuDongs().type,
      _getAll
    ),
    yield takeEvery(
      lichSuDieuDongSlice.actions.handleLichSuDieuDong().type,
      _handleItem
    ),
  ]);
}
