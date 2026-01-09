import { createSlice } from "@reduxjs/toolkit";

// Only SAFE fields are persisted
const persistedUser =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
  userInfo: null,          // AUTH IDENTITY (redux)
  persistedUser,           // SAFE fallback (localStorage)
  authChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 🔐 LOGIN / AUTH ONLY
    setCredentials: (state, action) => {
      const identity = action.payload;

      state.userInfo = identity;
      state.authChecked = true;

      const safePersist = {
        fullName: identity.fullName ?? null,
        email: identity.email ?? null,
        mobileNo: identity.mobileNo ?? null,
      };

      state.persistedUser = safePersist;

      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(safePersist));
      }
    },

    // 🧩 PROFILE / KYC / PARTIAL UPDATES
    updateUserPartial: (state, action) => {
      if (!state.userInfo) return;

      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
    },

    setAuthChecked: (state) => {
      state.authChecked = true;
    },

    logout: (state) => {
      state.userInfo = null;
      state.persistedUser = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
      }
    },
  },
});


export const { setCredentials, logout,setAuthChecked, updateUserPartial } = authSlice.actions;
export default authSlice.reducer;
