import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  banThans: [],
  banThan: {
    ma_can_bo: "",
    ma_chuc_vu_chinh_quyen: "",
    thoi_gian_bat_dau: "",
    don_vi_full_text : ""
  },
  selectedBanThan: {},
  errorMassage: false,
  isLoading: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "banThans",
  initialState,
  reducers: {
    openTab: (state, action) => {
      state.selectedBanThan =
        action.payload !== null ? action.payload : initialState.banThan;
    },
    getBanThanById: (state, action) => {
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getBanThanByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedBanThan = action.payload;
    },
    getBanThanByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedBanThan = action.payload
        ? action.payload
        : state.banThan;
    },
    getBanThans: (state, action) => {
      state.errorMassage = false;
      state.isLoading = true;
    },
    getBanThansSuccess: (state, action) => {
      state.errorMassage = false;
      state.banThans = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getBanThansError: (state, action) => {
      state.errorMassage = "Error";
      state.banThans = action.payload
        ? action.payload
        : state.banThans;
      state.isLoading = false;
    },
    handleBanThan: (state, action) => {},
    handleBanThanSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedBanThan = action.payload;
    },
    handleBanThanError: (state, action) => {},
    updateSelectedBanThanInput: (state, action) => {
      state.selectedBanThan = action.payload;
    },
  },
});

export default reducer;
