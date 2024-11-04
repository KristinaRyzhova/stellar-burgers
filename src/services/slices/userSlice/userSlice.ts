import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getCookie, deleteCookie, setCookie } from '../../../utils/cookie';

export interface userState {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
}

export const initialState: userState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

export const setUser = createAction<TUser | null, 'SET_USER'>('SET_USER');

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => dispatch(setUser(res.user)))
        .finally(() => dispatch(authChecked(true)));
    } else {
      dispatch(authChecked(true));
    }
  }
);

export const fetchRegisterUser = createAsyncThunk(
  'user/fetchRegisterUser',
  (data: TRegisterData) => registerUserApi(data)
);

export const fetchLoginUser = createAsyncThunk(
  'user/fetchLoginUser',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

export const fetchGetUser = createAsyncThunk('user/fetchGetUser', getUserApi);

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  (user: TRegisterData) => updateUserApi(user)
);

export const fetchLogoutUser = createAsyncThunk(
  'user/fetchLogoutUser',
  async () => {
    const res = await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    return res;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    getIsAuthChecked: (state) => state.isAuthChecked,
    getUser: (state) => state.user
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      // login
      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      // get user
      .addCase(fetchGetUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthChecked = false;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      // update user
      .addCase(fetchUpdateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      // logout
      .addCase(fetchLogoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLogoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.user = null;
        state.isAuthChecked = false;
      });
  }
});

export const { authChecked } = userSlice.actions;
export const { getIsAuthChecked, getUser } = userSlice.selectors;
