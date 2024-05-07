import { all, call, put, select, takeEvery } from "redux-saga/effects";
import dieuDongCanBoSlice from "./slice.js";
import canBoCoBanSlice from "../../QuanLyCanBo/ThongTinCoBan/slice.js";
import { ACTION_NAME } from "../../../utils/common.js";
import { create } from "../../../apis/DieuDongCanBo/dieuDongCanBo.api.js";

const getDonViSelector = (state) => state.donVis;

function* _handleItem({ payload }) {
  try {
    const { actionName, item } = payload;
    let data, status;

    if (actionName === ACTION_NAME.CREATE) {
      ({ data, status } = yield call(create, item));
    }

    const isSuccess = status === 200 || status === 201;

    yield put(
      isSuccess
        ? dieuDongCanBoSlice.actions.handleDieuDongCanBoSuccess()
        : dieuDongCanBoSlice.actions.handleDieuDongCanBoError([])
    );

    if (isSuccess) {
      const donViState = yield select(getDonViSelector);
      const { selectedDonVi } = donViState;

      yield put(
        canBoCoBanSlice.actions.getCanBoByMaDonVi({
          ma_don_vi: selectedDonVi.id,
        })
      );
    }
  } catch (error) {
    yield put(dieuDongCanBoSlice.actions.handleDieuDongCanBoError());
    console.log(error);
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      dieuDongCanBoSlice.actions.handleDieuDongCanBo().type,
      _handleItem
    ),
  ]);
}
