import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loaiHinhDaoTaos: [],
  loaiHinhDaoTao: {
    id: "",
    ten_chuc_danh: "",
    ghi_chu: "",
    created_at: "",
    updated_at: "",
  },
  selectedLoaiHinhDaoTao: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "loaiHinhDaoTaos",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedLoaiHinhDaoTao =
        action.payload !== null ? action.payload : initialState.loaiHinhDaoTao;
    },
    getLoaiHinhDaoTaoById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getLoaiHinhDaoTaoByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedLoaiHinhDaoTao = action.payload;
    },
    getLoaiHinhDaoTaoByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedLoaiHinhDaoTao = action.payload
        ? action.payload
        : state.loaiHinhDaoTao;
    },
    getLoaiHinhDaoTaos: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getLoaiHinhDaoTaosSuccess: (state, action) => {
      state.errorMassage = false;
      state.loaiHinhDaoTaos = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getLoaiHinhDaoTaosError: (state, action) => {
      state.errorMassage = "Error";
      state.loaiHinhDaoTaos = action.payload
        ? action.payload
        : state.loaiHinhDaoTaos;
      state.isLoading = false;
    },
    handleLoaiHinhDaoTao: (state, action) => {},
    handleLoaiHinhDaoTaoSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedLoaiHinhDaoTao = action.payload;
    },
    handleLoaiHinhDaoTaoError: (state, action) => {},
    updateSelectedLoaiHinhDaoTaoInput: (state, action) => {
      state.selectedLoaiHinhDaoTao = action.payload;
    },
  },
});

export default reducer;
