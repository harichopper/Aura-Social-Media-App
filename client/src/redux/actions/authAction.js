import { GLOBALTYPES } from './globalTypes';
import { postDataAPI } from '../../utils/fetchData';
import valid from '../../utils/valid';

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI('login', data);
    console.log("🔐 Login Response:", res); // ✅ Debug: check the structure

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token, // or res.access_token depending on fetchData.js
        user: res.data.user,
      },
    });

    localStorage.setItem("firstLogin", true);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
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


export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

        try {
            const res = await postDataAPI('refresh_token', {});  // send empty object!

            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    token: res.data.access_token,
                    user: res.data.user,
                },
            });

            dispatch({ type: GLOBALTYPES.ALERT, payload: {} });

        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: err?.response?.data?.msg || err.message,
                },
            });
        }
    }
};

export const register = (data) => async (dispatch) => {
    const check = valid(data)
    if (check.errLength > 0)
        return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg })

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        const res = await postDataAPI('register', data)

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })

        localStorage.setItem("firstLogin", true)

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg
            }
        })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err?.response?.data?.msg || err.message
            }
        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('firstLogin')
        await postDataAPI('logout')
        window.location.href = "/"
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err?.response?.data?.msg || err.message
            }
        })
    }
}
