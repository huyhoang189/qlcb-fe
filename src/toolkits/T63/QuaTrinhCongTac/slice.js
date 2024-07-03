import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quaTrinhCongTacT63s: [],
  quaTrinhCongTacT63: {
    ma_can_bo: "",
    ma_chuc_vu_chinh_quyen: "",
    thoi_gian_bat_dau: "",
    don_vi_full_text : ""
  },
  selectedQuaTrinhCongTacT63: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "quaTrinhCongTacT63s",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedQuaTrinhCongTacT63 =
        action.payload !== null ? action.payload : initialState.quaTrinhCongTacT63;
    },
    getQuaTrinhCongTacT63ById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getQuaTrinhCongTacT63ByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedQuaTrinhCongTacT63 = action.payload;
    },
    getQuaTrinhCongTacT63ByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedQuaTrinhCongTacT63 = action.payload
        ? action.payload
        : state.quaTrinhCongTacT63;
    },
    getQuaTrinhCongTacT63s: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getQuaTrinhCongTacT63sSuccess: (state, action) => {
      state.errorMassage = false;
      state.quaTrinhCongTacT63s = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getQuaTrinhCongTacT63sError: (state, action) => {
      state.errorMassage = "Error";
      state.quaTrinhCongTacT63s = action.payload
        ? action.payload
        : state.quaTrinhCongTacT63s;
      state.isLoading = false;
    },
    handleQuaTrinhCongTacT63: (state, action) => {},
    handleQuaTrinhCongTacT63Success: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedQuaTrinhCongTacT63 = action.payload;
    },
    handleQuaTrinhCongTacT63Error: (state, action) => {},
    updateSelectedQuaTrinhCongTacT63Input: (state, action) => {
      state.selectedQuaTrinhCongTacT63 = action.payload;
    },
  },
});

export default reducer;
