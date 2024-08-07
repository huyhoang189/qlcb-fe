import { all, call, put, takeEvery } from "redux-saga/effects";
import permissionSlice from "./slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import {
  create,
  deletePermission,
  getAll,
  update,
} from "../../../apis/QuanTriHeThong/permission.api.js";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(permissionSlice.actions.getPermissionsSuccess(metadata));
    } else {
      yield put(permissionSlice.actions.getPermissionsError([]));
    }
  } catch (error) {
    yield put(permissionSlice.actions.getPermissionsError([]));
  }
}

function* _handleItem({ payload }) {
  try {
    const { actionName, item, group_id } = payload;
    let data, status;

    if (actionName === ACTION_NAME.CREATE) {
      ({ data, status } = yield call(create, {
        role_id: item?.id,
        group_id: group_id,
      }));
    } else if (actionName === ACTION_NAME.DELETE) {
      ({ data, status } = yield call(deletePermission, {
        role_id: item?.id,
        group_id: group_id,
      }));
    }

    const isSuccess = status === 200 || status === 201;

    yield put(
      isSuccess
        ? permissionSlice.actions.handlePermissionSuccess()
        : permissionSlice.actions.handlePermissionError([])
    );

    if (isSuccess) {
      yield put(permissionSlice.actions.getPermissions(payload));
    }
  } catch (error) {
    console.log(error);
    yield put(permissionSlice.actions.handlePermissionError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(permissionSlice.actions.getPermissions().type, _getAll),
    yield takeEvery(
      permissionSlice.actions.handlePermission().type,
      _handleItem
    ),
  ]);
}
