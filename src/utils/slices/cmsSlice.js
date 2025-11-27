import { createSlice } from "@reduxjs/toolkit";

const cmsSlice = createSlice({
  name: "cms",
  initialState: { data: [] },
  reducers: {
    setCMS: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCMS } = cmsSlice.actions;
export default cmsSlice.reducer;
