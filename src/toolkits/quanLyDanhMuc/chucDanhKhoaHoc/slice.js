import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    chucDanhKhoaHocs: [],
    chucDanhKhoaHoc: {
        id: '',
        ten_chuc_danh: '',
        ghi_chu: '',
        created_at: "",
        updated_at: ""
    },
    selectedChucDanhKhoaHoc: {},
    errorMassage: false,
    isLoading: false,
    modalActive: false,
    count: 0,
    pageSize: 10,
    pageNumber: 1,
    totalPage: 0,

};

const reducer = createSlice({
    name: "chucDanhKhoaHocs",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.modalActive = !state.modalActive;
            state.selectedChucDanhKhoaHoc =
                action.payload !== null ? action.payload : initialState.chucDanhKhoaHoc;
        },
        getChucDanhKhoaHocById: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
            state.pageSize = action.payload.pageSize;
        },
        getChucDanhKhoaHocByIdSuccess: (state, action) => {
            state.errorMassage = false;
            state.selectedChucDanhKhoaHoc = action.payload;
        },
        getChucDanhKhoaHocByIdError: (state, action) => {
            state.errorMassage = "Error";
            state.selectedChucDanhKhoaHoc = action.payload
                ? action.payload
                : state.chucDanhKhoaHoc;
        },
        getChucDanhKhoaHocs: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getChucDanhKhoaHocsSuccess: (state, action) => {
            state.errorMassage = false;
            state.chucDanhKhoaHocs = action.payload.data;
            state.totalItem = action.payload.count;
            state.pageNumber = action.payload.pageNumber;
            state.totalPage = action.payload.totalPage;
            state.pageSize = action.payload.pageSize;
            state.isLoading = false;
        },
        getChucDanhKhoaHocsError: (state, action) => {
            state.errorMassage = "Error";
            state.chucDanhKhoaHocs = action.payload
                ? action.payload
                : state.chucDanhKhoaHocs;
            state.isLoading = false;
        },
        handleChucDanhKhoaHoc: (state, action) => {
        },
        handleChucDanhKhoaHocSuccess: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.selectedChucDanhKhoaHoc = action.payload;
        },
        handleChucDanhKhoaHocError: (state, action) => {
        },
        updateSelectedChucDanhKhoaHocInput: (state, action) => {
            state.selectedChucDanhKhoaHoc = action.payload;
        },

    },
});

export default reducer;