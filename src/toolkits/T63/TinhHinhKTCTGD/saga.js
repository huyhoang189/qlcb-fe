import { all, call, put, takeEvery } from "redux-saga/effects";
import tinhHinhKTCTGDSlice from "./slice.js";
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
        tinhHinhKTCTGDSlice.actions.getTinhHinhKTCTGDsSuccess(metadata)
      );
    } else {
      yield put(tinhHinhKTCTGDSlice.actions.getTinhHinhKTCTGDsError([]));
    }
  } catch (error) {
    yield put(tinhHinhKTCTGDSlice.actions.getTinhHinhKTCTGDsError([]));
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
        ? tinhHinhKTCTGDSlice.actions.handleTinhHinhKTCTGDSuccess()
        : tinhHinhKTCTGDSlice.actions.handleTinhHinhKTCTGDError([])
    );

    if (isSuccess) {
      yield put(tinhHinhKTCTGDSlice.actions.getTinhHinhKTCTGDs(item));
    }
  } catch (error) {
    yield put(tinhHinhKTCTGDSlice.actions.handleTinhHinhKTCTGDError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      tinhHinhKTCTGDSlice.actions.getTinhHinhKTCTGDs().type,
      _getAll
    ),
    yield takeEvery(
      tinhHinhKTCTGDSlice.actions.handleTinhHinhKTCTGD().type,
      _handleItem
    ),
  ]);
}
