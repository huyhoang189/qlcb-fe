import { all, call, put, takeEvery } from "redux-saga/effects";
import canBoCoBanSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAllBase,
  getById,
  update,
  getAllByMaDonVi,
} from "../../../apis/canBo.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAllBase, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(canBoCoBanSlice.actions.getCanBoCoBansSuccess(metadata));
    } else {
      yield put(canBoCoBanSlice.actions.getCanBoCoBansError([]));
    }
  } catch (error) {
    yield put(canBoCoBanSlice.actions.getCanBoCoBansError([]));
  }
}

function* _getByMaDonVi({ payload }) {
  try {
    const { data, status } = yield call(getAllByMaDonVi, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(canBoCoBanSlice.actions.getCanBobyMaDonViSuccess(metadata));
    } else {
      yield put(canBoCoBanSlice.actions.getCanBoByMaDonViError([]));
    }
  } catch (error) {
    yield put(canBoCoBanSlice.actions.getCanBoByMaDonViError([]));
  }
}

function* _getById({ payload }) {
  try {
    const { data, status } = yield call(getById, payload);
    console.log(data);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(
        canBoCoBanSlice.actions.getCanBoCoBanByIdSuccess(metadata?.data)
      );
    } else {
      yield put(canBoCoBanSlice.actions.getCanBoCoBanByIdError({}));
    }
  } catch (error) {
    yield put(canBoCoBanSlice.actions.getCanBoCoBanByIdError({}));
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
        ? canBoCoBanSlice.actions.handleCanBoCoBanSuccess()
        : canBoCoBanSlice.actions.handleCanBoCoBanError([])
    );

    if (isSuccess) {
      yield put(canBoCoBanSlice.actions.getCanBoCoBans(payload));
    }
  } catch (error) {
    yield put(canBoCoBanSlice.actions.handleCanBoCoBanError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(canBoCoBanSlice.actions.getCanBoCoBans().type, _getAll),
    yield takeEvery(
      canBoCoBanSlice.actions.handleCanBoCoBan().type,
      _handleItem
    ),
    yield takeEvery(canBoCoBanSlice.actions.getCanBoCoBanById().type, _getById),
    yield takeEvery(
      canBoCoBanSlice.actions.getCanBoByMaDonVi().type,
      _getByMaDonVi
    ),
  ]);
}
