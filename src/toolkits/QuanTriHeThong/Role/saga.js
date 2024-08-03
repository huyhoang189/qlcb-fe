import { all, call, put, takeEvery } from "redux-saga/effects";
import roleSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/QuanTriHeThong/role.api.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(roleSlice.actions.getRolesSuccess(metadata));
    } else {
      yield put(roleSlice.actions.getRolesError([]));
    }
  } catch (error) {
    yield put(roleSlice.actions.getRolesError([]));
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
        ? roleSlice.actions.handleRoleSuccess()
        : roleSlice.actions.handleRoleError([])
    );

    if (isSuccess) {
      yield put(roleSlice.actions.getRoles(payload));
    }
  } catch (error) {
    console.log(error);
    yield put(roleSlice.actions.handleRoleError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(roleSlice.actions.getRoles().type, _getAll),
    yield takeEvery(roleSlice.actions.handleRole().type, _handleItem),
  ]);
}
