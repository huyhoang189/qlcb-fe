import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    quanHams: [],
    quanHam: {
        id: "",
        ma_can_bo: "",
        he_so: "",
        quan_ham: "",
        thoi_gian: "",
        ghi_chu: '',
        created_at: "",
        updated_at: ""
    },
    selectedQuanHam: {},
    errorMassage: false,
    isLoading: false,
    modalActive: false,
    count: 0,
    pageSize: 10,
    pageNumber: 1,
    totalPage: 0,

};

const reducer = createSlice({
    name: "quanHams",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.modalActive = !state.modalActive;
            state.selectedQuanHam =
                action.payload !== null ? action.payload : initialState.quanHam;
        },
        getQuanHamById: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
            state.pageSize = action.payload.pageSize;
        },
        getQuanHamByIdSuccess: (state, action) => {
            state.errorMassage = false;
            state.selectedQuanHam = action.payload;
        },
        getQuanHamByIdError: (state, action) => {
            state.errorMassage = "Error";
            state.selectedQuanHam = action.payload
                ? action.payload
                : state.quanHam;
        },
        getQuanHams: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getQuanHamsSuccess: (state, action) => {
            state.errorMassage = false;
            state.quanHams = action.payload.data;
            state.totalItem = action.payload.count;
            state.pageNumber = action.payload.pageNumber;
            state.totalPage = action.payload.totalPage;
            state.pageSize = action.payload.pageSize;
            state.isLoading = false;
        },
        getQuanHamsError: (state, action) => {
            state.errorMassage = "Error";
            state.quanHams = action.payload
                ? action.payload
                : state.quanHams;
            state.isLoading = false;
        },
        handleQuanHam: (state, action) => {
        },
        handleQuanHamSuccess: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.selectedQuanHam = action.payload;
        },
        handleQuanHamError: (state, action) => {
        },
        updateSelectedQuanHamInput: (state, action) => {
            state.selectedQuanHam = action.payload;
        },

    },
});

export default reducer;