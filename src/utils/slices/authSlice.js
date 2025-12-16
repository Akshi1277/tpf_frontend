import { createSlice } from "@reduxjs/toolkit";

// Only SAFE fields are persisted
const persistedUser =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
  userInfo: null,          // AUTH IDENTITY (redux)
  persistedUser,           // SAFE fallback (localStorage)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const identity = action.payload;

      // 1️⃣ Store identity in redux (used everywhere)
      state.userInfo = identity;

      // 2️⃣ Persist ONLY minimal safe fields
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

    logout: (state) => {
      state.userInfo = null;
      state.persistedUser = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
