import { all, call, put, takeEvery } from "redux-saga/effects";
import loaiHinhDaoTaoSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/loaiHinhDaoTao.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(
        loaiHinhDaoTaoSlice.actions.getLoaiHinhDaoTaosSuccess(metadata)
      );
    } else {
      yield put(loaiHinhDaoTaoSlice.actions.getLoaiHinhDaoTaosError([]));
    }
  } catch (error) {
    yield put(loaiHinhDaoTaoSlice.actions.getLoaiHinhDaoTaosError([]));
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
        ? loaiHinhDaoTaoSlice.actions.handleLoaiHinhDaoTaoSuccess()
        : loaiHinhDaoTaoSlice.actions.handleLoaiHinhDaoTaoError([])
    );

    if (isSuccess) {
      yield put(loaiHinhDaoTaoSlice.actions.getLoaiHinhDaoTaos(payload));
    }
  } catch (error) {
    yield put(loaiHinhDaoTaoSlice.actions.handleLoaiHinhDaoTaoError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      loaiHinhDaoTaoSlice.actions.getLoaiHinhDaoTaos().type,
      _getAll
    ),
    yield takeEvery(
      loaiHinhDaoTaoSlice.actions.handleLoaiHinhDaoTao().type,
      _handleItem
    ),
  ]);
}
