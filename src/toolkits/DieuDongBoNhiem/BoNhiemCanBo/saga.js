import { all, call, put, takeEvery } from "redux-saga/effects";
import boNhiemCanBoSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/BoNhiemCanBo/boNhiemCanBo.api.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(boNhiemCanBoSlice.actions.getBoNhiemCanBosSuccess(metadata));
    } else {
      yield put(boNhiemCanBoSlice.actions.getBoNhiemCanBosError([]));
    }
  } catch (error) {
    yield put(boNhiemCanBoSlice.actions.getBoNhiemCanBosError([]));
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
        ? boNhiemCanBoSlice.actions.handleBoNhiemCanBoSuccess()
        : boNhiemCanBoSlice.actions.handleBoNhiemCanBoError([])
    );

    if (isSuccess) {
      yield put(boNhiemCanBoSlice.actions.getBoNhiemCanBos(payload));
    }
  } catch (error) {
    yield put(boNhiemCanBoSlice.actions.handleBoNhiemCanBoError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(boNhiemCanBoSlice.actions.getBoNhiemCanBos().type, _getAll),
    yield takeEvery(
      boNhiemCanBoSlice.actions.handleBoNhiemCanBo().type,
      _handleItem
    ),
  ]);
}
