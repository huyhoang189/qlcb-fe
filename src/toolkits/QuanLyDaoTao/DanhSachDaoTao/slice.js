import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  danhSachDaoTaos: [],
  danhSachDaoTao: {
    id: "",
    ma_chi_tiet: "",
    ma_hoc_vien: "",
    ghi_chu: null,
    can_bo: {
        id: "",
        ho_ten_khai_sinh: "",
        don_vi: {
            id: "",
            ten_don_vi: ""
        }
    },
    created_at: "",
    updated_at: "",
  },
  selectedDanhSachDaoTao: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "danhSachDaoTaos",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedDanhSachDaoTao =
        action.payload !== null ? action.payload : initialState.danhSachDaoTao;
    },
    getDanhSachDaoTaoById: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
      state.pageSize = action.payload.pageSize;
    },
    getDanhSachDaoTaoByIdSuccess: (state, action) => {
      state.errorMassage = false;
      state.selectedDanhSachDaoTao = action.payload;
    },
    getDanhSachDaoTaoByIdError: (state, action) => {
      state.errorMassage = "Error";
      state.selectedDanhSachDaoTao = action.payload
        ? action.payload
        : state.danhSachDaoTao;
    },
    getDanhSachDaoTaos: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getDanhSachDaoTaosSuccess: (state, action) => {
      state.errorMassage = false;
      state.danhSachDaoTaos = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getDanhSachDaoTaosError: (state, action) => {
      state.errorMassage = "Error";
      state.danhSachDaoTaos = action.payload ? action.payload : state.danhSachDaoTaos;
      state.isLoading = false;
    },
    handleDanhSachDaoTao: (state, action) => {},
    handleDanhSachDaoTaoSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedDanhSachDaoTao = action.payload;
    },
    handleDanhSachDaoTaoError: (state, action) => {},
    updateSelectedDanhSachDaoTaoInput: (state, action) => {
      state.selectedDanhSachDaoTao = action.payload;
    },
  },
});

export default reducer;
