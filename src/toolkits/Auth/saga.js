import { call, put, all, takeEvery } from "redux-saga/effects";
import authSlice from "./slice";
import { login, getSessionUser } from "../../apis/QuanTriHeThong/nguoiDung.api";
import {
  clearCookieToken,
  getCookieToken,
  insertCookieToken,
} from "../../utils/cookie";
import { TOKEN_VERIFY } from "../../utils/common";

// import jwt_decode from "jwt-decode";
export const getAuth = (state) => state.Auth;

function* _checkAuthentication() {
  try {
    const user = getCookieToken(TOKEN_VERIFY);
    if (user) {
      yield put(authSlice.actions.loginSuccess(user));
    } else {
      window.location.pathname = "./dang-nhap";
    }
  } catch (error) {
    yield put(
      authSlice.actions.loginError({ error: "Đăng nhập lại hệ thống!" })
    );
    window.location.pathname = "./dang-nhap";
  }
}

function* _login({ payload }) {
  try {
    let data, status;
    ({ data, status } = yield call(login, payload));
    const { metadata } = data;
    // console.log(data);
    if (status === 200 || status === 201) {
      yield put(authSlice.actions.loginSuccess(metadata?.data));
      insertCookieToken(
        TOKEN_VERIFY,
        metadata?.data?.acccessToken,
        metadata?.data?.timeExpired
      );
      window.location.pathname = "./";
    }
  } catch (error) {
    //console.log(error);
    yield put(
      authSlice.actions.loginError({
        error: "Tài khoản hoặc mật khẩu không chính xác!",
      })
    );
  }
}

function* _logout() {
  try {
    yield clearCookieToken(TOKEN_VERIFY);
    yield put(authSlice.actions.checkAuthentication());
  } catch (error) {
    console.log(error);
  } finally {
    // yield call(logout);
  }
}

function* _getSessionUser({ payload }) {
  try {
    let data, status;
    ({ data, status } = yield call(getSessionUser, payload));
    const { metadata } = data;
    if (status === 200 || status === 201) {
      yield put(authSlice.actions.getSessionUserSucces(metadata.data));
    }
  } catch (error) {
    //console.log(error);
    yield put(
      authSlice.actions.getSessionUserError({
        error: "Không tìm thấy thông tin!",
      })
    );
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      authSlice.actions.checkAuthentication().type,
      _checkAuthentication
    ),
    yield takeEvery(authSlice.actions.login().type, _login),
    yield takeEvery(authSlice.actions.logout().type, _logout),
    yield takeEvery(authSlice.actions.loginSuccess().type, _getSessionUser),
  ]);
}
