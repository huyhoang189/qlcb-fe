import { all, call, put, takeEvery } from "redux-saga/effects";
import userSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  changeActive,
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/QuanTriHeThong/nguoiDung.api.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(userSlice.actions.getUsersSuccess(metadata));
    } else {
      yield put(userSlice.actions.getUsersError([]));
    }
  } catch (error) {
    yield put(userSlice.actions.getUsersError([]));
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
    } else if (actionName === ACTION_NAME.ACTIVE) {
      ({ data, status } = yield call(changeActive, { id: item.id }));
    }

    const isSuccess = status === 200 || status === 201;

    yield put(
      isSuccess
        ? userSlice.actions.handleUserSuccess()
        : userSlice.actions.handleUserError([])
    );

    if (isSuccess) {
      yield put(userSlice.actions.getUsers(payload));
    }
  } catch (error) {
    console.log(error);
    yield put(userSlice.actions.handleUserError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(userSlice.actions.getUsers().type, _getAll),
    yield takeEvery(userSlice.actions.handleUser().type, _handleItem),
  ]);
}
