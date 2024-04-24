import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chungNhans: [],
  chungNhan: {
    id: null,
    ten_chung_nhan: "",
    ghi_chu: "",
    created_at: "",
    updated_at: "",
  },
  selectedChungNhan: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "chungNhans",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedChungNhan =
        action.payload !== null ? action.payload : initialState.chungNhan;
    },
    getChungNhanById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getChungNhanByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedChungNhan = action.payload;
    },
    getChungNhanByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedChungNhan = action.payload
        ? action.payload
        : state.chungNhan;
    },
    getChungNhans: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getChungNhansSuccess: (state, action) => {
      state.errorMassage = false;
      state.chungNhans = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getChungNhansError: (state, action) => {
      state.errorMassage = "Error";
      state.chungNhans = action.payload ? action.payload : state.chungNhans;
      state.isLoading = false;
    },
    handleChungNhan: (state, action) => {},
    handleChungNhanSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedChungNhan = action.payload;
    },
    handleChungNhanError: (state, action) => {},
    updateSelectedChungNhanInput: (state, action) => {
      state.selectedChungNhan = action.payload;
    },
  },
});

export default reducer;
