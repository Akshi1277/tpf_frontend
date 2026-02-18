import { createSlice } from "@reduxjs/toolkit";

// Only SAFE fields are persisted
const persistedUser =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
  userInfo: persistedUser,   // ✅ IMPORTANT
  persistedUser,
  authChecked: false,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 🔐 LOGIN / AUTH ONLY
    setCredentials: (state, action) => {
      const identity = action.payload;

      const isOrg = identity.type === "organization";

      const normalized = {
        ...identity,

        // 🔥 NORMALIZATION LAYER
        fullName: isOrg
          ? identity.organizationName
          : identity.fullName,

        email: isOrg
          ? identity.organizationEmail
          : identity.email,

        mobileNo: isOrg
          ? identity.contactDetails?.contactNumber ?? null
          : identity.mobileNo ?? null,
      };

      state.userInfo = normalized;
      state.authChecked = true;

      const safePersist = {
        fullName: normalized.fullName ?? null,
        email: normalized.email ?? null,
        mobileNo: normalized.mobileNo ?? null,
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

      // ✅ persist SAFE identity again
      const safePersist = {
        fullName: state.userInfo.fullName ?? null,
        email: state.userInfo.email ?? null,
        mobileNo: state.userInfo.mobileNo ?? null,
      };

      state.persistedUser = safePersist;

      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(safePersist));
      }
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


export const { setCredentials, logout, setAuthChecked, updateUserPartial } = authSlice.actions;
export default authSlice.reducer;
