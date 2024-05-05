import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  canBos: [],
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
      state.selectedDieuDongCanBo =
        action.payload !== null ? action.payload : initialState.dieuDongCanBo;
    },
  },
});

export default reducer;
