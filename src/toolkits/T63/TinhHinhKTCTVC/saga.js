import { all, call, put, takeEvery } from "redux-saga/effects";
import tinhHinhKTCTVCSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/T63/tinhhinhktvc.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(
        tinhHinhKTCTVCSlice.actions.getTinhHinhKTCTVCsSuccess(metadata)
      );
    } else {
      yield put(tinhHinhKTCTVCSlice.actions.getTinhHinhKTCTVCsError([]));
    }
  } catch (error) {
    yield put(tinhHinhKTCTVCSlice.actions.getTinhHinhKTCTVCsError([]));
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
        ? tinhHinhKTCTVCSlice.actions.handleTinhHinhKTCTVCSuccess()
        : tinhHinhKTCTVCSlice.actions.handleTinhHinhKTCTVCError([])
    );

    if (isSuccess) {
      yield put(tinhHinhKTCTVCSlice.actions.getTinhHinhKTCTVCs(item));
    }
  } catch (error) {
    yield put(tinhHinhKTCTVCSlice.actions.handleTinhHinhKTCTVCError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      tinhHinhKTCTVCSlice.actions.getTinhHinhKTCTVCs().type,
      _getAll
    ),
    yield takeEvery(
      tinhHinhKTCTVCSlice.actions.handleTinhHinhKTCTVC().type,
      _handleItem
    ),
  ]);
}
