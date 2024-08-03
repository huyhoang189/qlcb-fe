import { all, call, put, takeEvery } from "redux-saga/effects";
import groupSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deleteItem,
  getAll,
  update,
} from "../../../apis/QuanTriHeThong/group.api.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(groupSlice.actions.getGroupsSuccess(metadata));
    } else {
      yield put(groupSlice.actions.getGroupsError([]));
    }
  } catch (error) {
    yield put(groupSlice.actions.getGroupsError([]));
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
        ? groupSlice.actions.handleGroupSuccess()
        : groupSlice.actions.handleGroupError([])
    );

    if (isSuccess) {
      yield put(groupSlice.actions.getGroups(payload));
    }
  } catch (error) {
    console.log(error);
    yield put(groupSlice.actions.handleGroupError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(groupSlice.actions.getGroups().type, _getAll),
    yield takeEvery(groupSlice.actions.handleGroup().type, _handleItem),
  ]);
}
