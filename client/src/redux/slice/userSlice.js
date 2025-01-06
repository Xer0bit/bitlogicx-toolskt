import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const isLocalStorageAvailable =
  typeof window !== "undefined" && window.localStorage;

const Data = {
  access: isLocalStorageAvailable
    ? JSON.parse(localStorage.getItem("access"))
    : null,
  refresh: isLocalStorageAvailable
    ? JSON.parse(localStorage.getItem("refresh"))
    : null,
};

const initialState = {
  user: null,
  isAuthenticated: Data.access ? true : false,
  token: {
    access: Data?.access,
    refresh: Data?.refresh,
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = {
        access: null,
        refresh: null,
      };
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;

export const signupUser = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/users/register/",
      credentials
    );
    const { access, refresh } = response.data;
    const decodedAccess = jwtDecode(access);
    const userResponse = await axios.post(
      `http://127.0.0.1:5000/users/current/${decodedAccess.user_id}`
    );

    if (userResponse.status === 200) {
      const user = userResponse.data;
      dispatch(setUser({ user, token: { access, refresh } }));

      if (isLocalStorageAvailable) {
        localStorage.setItem("access", JSON.stringify(access));
        localStorage.setItem("refresh", JSON.stringify(refresh));
      }
    }
  } catch (error) {
    console.error("Signup error:", error);
    dispatch(setError("Failed to signup"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/users/token/",
      credentials
    );
    const { access, refresh } = response.data;

    const decodedAccess = jwtDecode(access);
    const userResponse = await axios.post(
      `http://127.0.0.1:5000/users/current/${decodedAccess.user_id}`
    );

    if (userResponse.status === 200) {
      const user = userResponse.data;
      dispatch(setUser({ user, token: { access, refresh } }));

      if (isLocalStorageAvailable) {
        localStorage.setItem("access", JSON.stringify(access));
        localStorage.setItem("refresh", JSON.stringify(refresh));
      }
    }
  } catch (error) {
    console.error("Login error:", error);
    dispatch(setError("Failed to login"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(clearUser());
  if (isLocalStorageAvailable) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }
};

export const initialUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    if (Data.access && Data.refresh) {
      const decodedAccess = jwtDecode(Data.access);
      const response = await axios.post(
        `http://127.0.0.1:5000/users/current/${decodedAccess.user_id}`
      );
      if (response.status === 200) {
        dispatch(setUser({ user: response.data, token: Data }));
      }
    }
  } catch (error) {
    console.error("Initial user data fetch error:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

// Add this new selector function at the end of the file, before the export default statement
export const selectIsUserLoggedIn = (state) => {
  return state.user.isAuthenticated && state.user.user !== null;
};

export default userSlice.reducer;
