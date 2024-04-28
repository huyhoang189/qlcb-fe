import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    diNuocNgoais: [],
    diNuocNgoai: {
        id: "",
        ma_can_bo: "",
        ten_nuoc: "",
        thoi_gian_bat_dau: "",
        thoi_gian_ket_thuc: "",
        ghi_chu: '',
        created_at: "",
        updated_at: "",
        ly_do:"",
    },
    selectedDiNuocNgoai: {},
    errorMassage: false,
    isLoading: false,
    modalActive: false,
    count: 0,
    pageSize: 10,
    pageNumber: 1,
    totalPage: 0,

};

const reducer = createSlice({
    name: "diNuocNgoais",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.modalActive = !state.modalActive;
            state.selectedDiNuocNgoai =
                action.payload !== null ? action.payload : initialState.diNuocNgoai;
        },
        getDiNuocNgoaiById: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
            state.pageSize = action.payload.pageSize;
        },
        getDiNuocNgoaiByIdSuccess: (state, action) => {
            state.errorMassage = false;
            state.selectedDiNuocNgoai = action.payload;
        },
        getDiNuocNgoaiByIdError: (state, action) => {
            state.errorMassage = "Error";
            state.selectedDiNuocNgoai = action.payload
                ? action.payload
                : state.diNuocNgoai;
        },
        getDiNuocNgoais: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getDiNuocNgoaisSuccess: (state, action) => {
            state.errorMassage = false;
            state.diNuocNgoais = action.payload.data;
            state.totalItem = action.payload.count;
            state.pageNumber = action.payload.pageNumber;
            state.totalPage = action.payload.totalPage;
            state.pageSize = action.payload.pageSize;
            state.isLoading = false;
        },
        getDiNuocNgoaisError: (state, action) => {
            state.errorMassage = "Error";
            state.diNuocNgoais = action.payload
                ? action.payload
                : state.diNuocNgoais;
            state.isLoading = false;
        },
        handleDiNuocNgoai: (state, action) => {
        },
        handleDiNuocNgoaiSuccess: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.selectedDiNuocNgoai = action.payload;
        },
        handleDiNuocNgoaiError: (state, action) => {
        },
        updateSelectedDiNuocNgoaiInput: (state, action) => {
            state.selectedDiNuocNgoai = action.payload;
        },

    },
});

export default reducer;