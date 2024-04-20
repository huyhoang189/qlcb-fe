import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    chucVuChinhQuyens: [],
    chucVuChinhQuyen: {
        id: '',
        ten_chuc_danh: '',
        ghi_chu: '',
        created_at: "",
        updated_at: ""
    },
    selectedChucVuChinhQuyen: {},
    errorMassage: false,
    isLoading: false,
    modalActive: false,
    count: 0,
    pageSize: 10,
    pageNumber: 1,
    totalPage: 0,

};

const reducer = createSlice({
    name: "chucVuChinhQuyens",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.modalActive = !state.modalActive;
            state.selectedChucVuChinhQuyen =
                action.payload !== null ? action.payload : initialState.chucVuChinhQuyen;
        },
        getChucVuChinhQuyenById: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
            state.pageSize = action.payload.pageSize;
        },
        getChucVuChinhQuyenByIdSuccess: (state, action) => {
            state.errorMassage = false;
            state.selectedChucVuChinhQuyen = action.payload;
        },
        getChucVuChinhQuyenByIdError: (state, action) => {
            state.errorMassage = "Error";
            state.selectedChucVuChinhQuyen = action.payload
                ? action.payload
                : state.chucVuChinhQuyen;
        },
        getChucVuChinhQuyens: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getChucVuChinhQuyensSuccess: (state, action) => {
            state.errorMassage = false;
            state.chucVuChinhQuyens = action.payload.data;
            state.totalItem = action.payload.count;
            state.pageNumber = action.payload.pageNumber;
            state.totalPage = action.payload.totalPage;
            state.pageSize = action.payload.pageSize;
            state.isLoading = false;
        },
        getChucVuChinhQuyensError: (state, action) => {
            state.errorMassage = "Error";
            state.chucVuChinhQuyens = action.payload
                ? action.payload
                : state.chucVuChinhQuyens;
            state.isLoading = false;
        },
        handleChucVuChinhQuyen: (state, action) => {
        },
        handleChucVuChinhQuyenSuccess: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.selectedChucVuChinhQuyen = action.payload;
        },
        handleChucVuChinhQuyenError: (state, action) => {
        },
        updateSelectedChucVuChinhQuyenInput: (state, action) => {
            state.selectedChucVuChinhQuyen = action.payload;
        },

    },
});

export default reducer;