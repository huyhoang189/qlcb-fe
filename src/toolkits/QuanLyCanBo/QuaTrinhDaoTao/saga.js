import { all, call, put, takeEvery } from "redux-saga/effects";
import quaTrinhDaoTaoSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/quaTrinhDaoTao.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(
        quaTrinhDaoTaoSlice.actions.getQuaTrinhDaoTaosSuccess(metadata)
      );
    } else {
      yield put(quaTrinhDaoTaoSlice.actions.getQuaTrinhDaoTaosError([]));
    }
  } catch (error) {
    yield put(quaTrinhDaoTaoSlice.actions.getQuaTrinhDaoTaosError([]));
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
        ? quaTrinhDaoTaoSlice.actions.handleQuaTrinhDaoTaoSuccess()
        : quaTrinhDaoTaoSlice.actions.handleQuaTrinhDaoTaoError([])
    );

    if (isSuccess) {
      yield put(quaTrinhDaoTaoSlice.actions.getQuaTrinhDaoTaos(item));
    }
  } catch (error) {
    yield put(quaTrinhDaoTaoSlice.actions.handleQuaTrinhDaoTaoError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      quaTrinhDaoTaoSlice.actions.getQuaTrinhDaoTaos().type,
      _getAll
    ),
    yield takeEvery(
      quaTrinhDaoTaoSlice.actions.handleQuaTrinhDaoTao().type,
      _handleItem
    ),
  ]);
}
