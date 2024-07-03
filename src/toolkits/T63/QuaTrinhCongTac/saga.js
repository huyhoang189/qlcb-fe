import { all, call, put, takeEvery } from "redux-saga/effects";
import quaTrinhCongTacT63Slice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/T63/quatrinhcongtac.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(
        quaTrinhCongTacT63Slice.actions.getQuaTrinhCongTacT63sSuccess(metadata)
      );
    } else {
      yield put(quaTrinhCongTacT63Slice.actions.getQuaTrinhCongTacT63sError([]));
    }
  } catch (error) {
    yield put(quaTrinhCongTacT63Slice.actions.getQuaTrinhCongTacT63sError([]));
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
        ? quaTrinhCongTacT63Slice.actions.handleQuaTrinhCongTacT63Success()
        : quaTrinhCongTacT63Slice.actions.handleQuaTrinhCongTacT63Error([])
    );

    if (isSuccess) {
      yield put(quaTrinhCongTacT63Slice.actions.getQuaTrinhCongTacT63s(item));
    }
  } catch (error) {
    yield put(quaTrinhCongTacT63Slice.actions.handleQuaTrinhCongTacT63Error());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      quaTrinhCongTacT63Slice.actions.getQuaTrinhCongTacT63s().type,
      _getAll
    ),
    yield takeEvery(
      quaTrinhCongTacT63Slice.actions.handleQuaTrinhCongTacT63().type,
      _handleItem
    ),
  ]);
}
