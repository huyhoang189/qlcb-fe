import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    chucDanhPhapLys: [],
    chucDanhPhapLy: {
        id: '',
        ten_chuc_danh: '',
        ghi_chu: '',
        created_at: "",
        updated_at: ""
    },
    selectedChucDanhPhapLy: {},
    errorMassage: false,
    isLoading: false,
    modalActive: false,
    count: 0,
    pageSize: 10,
    pageNumber: 1,
    totalPage: 0,

};

const reducer = createSlice({
    name: "chucDanhPhapLys",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.modalActive = !state.modalActive;
            state.selectedChucDanhPhapLy =
                action.payload !== null ? action.payload : initialState.chucDanhPhapLy;
        },
        getChucDanhPhapLyById: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
            state.pageSize = action.payload.pageSize;
        },
        getChucDanhPhapLyByIdSuccess: (state, action) => {
            state.errorMassage = false;
            state.selectedChucDanhPhapLy = action.payload;
        },
        getChucDanhPhapLyByIdError: (state, action) => {
            state.errorMassage = "Error";
            state.selectedChucDanhPhapLy = action.payload
                ? action.payload
                : state.chucDanhPhapLy;
        },
        getChucDanhPhapLys: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getChucDanhPhapLysSuccess: (state, action) => {
            state.errorMassage = false;
            state.chucDanhPhapLys = action.payload.data;
            state.totalItem = action.payload.count;
            state.pageNumber = action.payload.pageNumber;
            state.totalPage = action.payload.totalPage;
            state.pageSize = action.payload.pageSize;
            state.isLoading = false;
        },
        getChucDanhPhapLysError: (state, action) => {
            state.errorMassage = "Error";
            state.chucDanhPhapLys = action.payload
                ? action.payload
                : state.chucDanhPhapLys;
            state.isLoading = false;
        },
        handleChucDanhPhapLy: (state, action) => {
        },
        handleChucDanhPhapLySuccess: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.selectedChucDanhPhapLy = action.payload;
        },
        handleChucDanhPhapLyError: (state, action) => {
        },
        updateSelectedChucDanhPhapLyInput: (state, action) => {
            state.selectedChucDanhPhapLy = action.payload;
        },

    },
});

export default reducer;