import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCanBo: {},
  selectedDonVi: {},
  dieuDongCanBos: [],
  selectedDieuDongCanBo: {},
  dieuDongCanBo: {},
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "dieuDongCanBos",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedCanBo = action.payload !== null ? action.payload : {};
      state.selectedDieuDongCanBo = {};
    },
    updateSelectedDieuDongCanBoInput: (state, action) => {
      state.selectedDieuDongCanBo = action.payload;
    },
    updateSelectedDonVi: (state, action) => {
      state.selectedDonVi = action.payload;
    },
    handleDieuDongCanBo: (state, action) => {},
    handleDieuDongCanBoSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
    },
    handleDieuDongCanBoError: (state, action) => {},
  },
});

export default reducer;
