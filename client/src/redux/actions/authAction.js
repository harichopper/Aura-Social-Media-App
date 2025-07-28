import { GLOBALTYPES } from './globalTypes';
import { postDataAPI } from '../../utils/fetchData';
import valid from '../../utils/valid';

// 🔐 Login
export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI('login', data);
    const { access_token, user, msg } = res.data || {};

    if (!access_token || !user) {
      throw new Error("Login response malformed");
    }

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { token: access_token, user },
    });

    localStorage.setItem("firstLogin", true);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: msg || "Login successful" },
    });

  } catch (err) {
    console.error("❌ Login Error:", err.response?.data || err.message);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response?.data?.msg || err.message,
      },
    });
  }
};

// 🔄 Refresh Token
export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (!firstLogin) return;

  dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

  try {
    const res = await postDataAPI('refresh_token', {});
    const { access_token, user } = res.data || {};

    if (!access_token || !user) {
      throw new Error("Refresh token response malformed");
    }

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { token: access_token, user },
    });

    dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response?.data?.msg || err.message,
      },
    });
  }
};

// 📝 Register
export const register = (data) => async (dispatch) => {
  const check = valid(data);
  if (check.errLength > 0)
    return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI('register', data);
    const { access_token, user, msg } = res.data || {};

    if (!access_token || !user) {
      throw new Error("Register response malformed");
    }

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { token: access_token, user },
    });

    localStorage.setItem("firstLogin", true);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: msg || "Registration successful" },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response?.data?.msg || err.message,
      },
    });
  }
};

// 🚪 Logout
export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("firstLogin");
    await postDataAPI("logout");
    window.location.href = "/";
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response?.data?.msg || err.message,
      },
    });
  }
};
