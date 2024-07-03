import { all, call, put, takeEvery } from "redux-saga/effects";
import tinhHinhKTCTCCSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/T63/tinhhinhktcgd.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    console.log(payload,"test")
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(
        tinhHinhKTCTCCSlice.actions.getTinhHinhKTCTCCsSuccess(metadata)
      );
    } else {
      yield put(tinhHinhKTCTCCSlice.actions.getTinhHinhKTCTCCsError([]));
    }
  } catch (error) {
    yield put(tinhHinhKTCTCCSlice.actions.getTinhHinhKTCTCCsError([]));
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
        ? tinhHinhKTCTCCSlice.actions.handleTinhHinhKTCTCCSuccess()
        : tinhHinhKTCTCCSlice.actions.handleTinhHinhKTCTCCError([])
    );

    if (isSuccess) {
      yield put(tinhHinhKTCTCCSlice.actions.getTinhHinhKTCTCCs(item));
    }
  } catch (error) {
    yield put(tinhHinhKTCTCCSlice.actions.handleTinhHinhKTCTCCError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      tinhHinhKTCTCCSlice.actions.getTinhHinhKTCTCCs().type,
      _getAll
    ),
    yield takeEvery(
      tinhHinhKTCTCCSlice.actions.handleTinhHinhKTCTCC().type,
      _handleItem
    ),
  ]);
}
