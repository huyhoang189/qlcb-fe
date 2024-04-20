import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuCollapse: false,
};

const reducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSiderbar: (state, action) => {
      state.menuCollapse = !state.menuCollapse;
    },
  },
});

export default reducer;
