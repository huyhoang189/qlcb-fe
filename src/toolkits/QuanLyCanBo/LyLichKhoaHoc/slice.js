import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    lyLichKhoaHocs: [],
    lyLichKhoaHoc: {
        id: "",
        ten_chuyen_nganh: "",
        ma_chuc_danh: "",
        ma_can_bo: "",
        thoi_gian: "",
        ghi_chu: '',
        created_at: "",
        updated_at: ""
    },
    selectedLyLichKhoaHoc: {},
    errorMassage: false,
    isLoading: false,
    modalActive: false,
    count: 0,
    pageSize: 10,
    pageNumber: 1,
    totalPage: 0,

};

const reducer = createSlice({
    name: "lyLichKhoaHocs",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.modalActive = !state.modalActive;
            state.selectedLyLichKhoaHoc =
                action.payload !== null ? action.payload : initialState.lyLichKhoaHoc;
        },
        getLyLichKhoaHocById: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
            state.pageSize = action.payload.pageSize;
        },
        getLyLichKhoaHocByIdSuccess: (state, action) => {
            state.errorMassage = false;
            state.selectedLyLichKhoaHoc = action.payload;
        },
        getLyLichKhoaHocByIdError: (state, action) => {
            state.errorMassage = "Error";
            state.selectedLyLichKhoaHoc = action.payload
                ? action.payload
                : state.lyLichKhoaHoc;
        },
        getLyLichKhoaHocs: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getLyLichKhoaHocsSuccess: (state, action) => {
            state.errorMassage = false;
            state.lyLichKhoaHocs = action.payload.data;
            state.totalItem = action.payload.count;
            state.pageNumber = action.payload.pageNumber;
            state.totalPage = action.payload.totalPage;
            state.pageSize = action.payload.pageSize;
            state.isLoading = false;
        },
        getLyLichKhoaHocsError: (state, action) => {
            state.errorMassage = "Error";
            state.lyLichKhoaHocs = action.payload
                ? action.payload
                : state.lyLichKhoaHocs;
            state.isLoading = false;
        },
        handleLyLichKhoaHoc: (state, action) => {
        },
        handleLyLichKhoaHocSuccess: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.selectedLyLichKhoaHoc = action.payload;
        },
        handleLyLichKhoaHocError: (state, action) => {
        },
        updateSelectedLyLichKhoaHocInput: (state, action) => {
            state.selectedLyLichKhoaHoc = action.payload;
        },

    },
});

export default reducer;