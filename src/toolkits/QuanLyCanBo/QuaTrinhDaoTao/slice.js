import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quaTrinhDaoTaos: [],
  quaTrinhDaoTao: {},
  selectedQuaTrinhDaoTao: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "quaTrinhDaoTaos",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedQuaTrinhDaoTao =
        action.payload !== null ? action.payload : initialState.quaTrinhDaoTao;
    },
    getQuaTrinhDaoTaoById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getQuaTrinhDaoTaoByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedQuaTrinhDaoTao = action.payload;
    },
    getQuaTrinhDaoTaoByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedQuaTrinhDaoTao = action.payload
        ? action.payload
        : state.quaTrinhDaoTao;
    },
    getQuaTrinhDaoTaos: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getQuaTrinhDaoTaosSuccess: (state, action) => {
      state.errorMassage = false;
      state.quaTrinhDaoTaos = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getQuaTrinhDaoTaosError: (state, action) => {
      state.errorMassage = "Error";
      state.quaTrinhDaoTaos = action.payload
        ? action.payload
        : state.quaTrinhDaoTaos;
      state.isLoading = false;
    },
    handleQuaTrinhDaoTao: (state, action) => {},
    handleQuaTrinhDaoTaoSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedQuaTrinhDaoTao = action.payload;
    },
    handleQuaTrinhDaoTaoError: (state, action) => {},
    updateSelectedQuaTrinhDaoTaoInput: (state, action) => {
      state.selectedQuaTrinhDaoTao = action.payload;
    },
  },
});

export default reducer;
