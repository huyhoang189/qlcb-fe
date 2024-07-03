import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    kyLuats: [],
    kyLuat: {
        id: "",
        ma_can_bo: "",
        ma_hinh_thuc_khen_thuong:"",
        noi_dung: "",
        thoi_gian: "",
        so_quyet_dinh: "",
        loai: "",
        ghi_chu: '',
        created_at: "",
        updated_at: "",
        chi_tiet:[]
    },
    selectedKyLuat: {},
    errorMassage: false,
    isLoading: false,
    modalActive: false,
    count: 0,
    pageSize: 10,
    pageNumber: 1,
    totalPage: 0,

};

const reducer = createSlice({
    name: "kyLuats",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.modalActive = !state.modalActive;
            state.selectedKyLuat =
                action.payload !== null ? action.payload : initialState.kyLuat;
        },
        getKyLuatById: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
            state.pageSize = action.payload.pageSize;
        },
        getKyLuatByIdSuccess: (state, action) => {
            state.errorMassage = false;
            state.selectedKyLuat = action.payload;
        },
        getKyLuatByIdError: (state, action) => {
            state.errorMassage = "Error";
            state.selectedKyLuat = action.payload
                ? action.payload
                : state.kyLuat;
        },
        getKyLuats: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getKyLuatsSuccess: (state, action) => {
            state.errorMassage = false;
            state.kyLuats = action.payload.data;
            state.totalItem = action.payload.count;
            state.pageNumber = action.payload.pageNumber;
            state.totalPage = action.payload.totalPage;
            state.pageSize = action.payload.pageSize;
            state.isLoading = false;
        },
        getKyLuatsError: (state, action) => {
            state.errorMassage = "Error";
            state.kyLuats = action.payload
                ? action.payload
                : state.kyLuats;
            state.isLoading = false;
        },
        handleKyLuat: (state, action) => {
        },
        handleKyLuatSuccess: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.selectedKyLuat = action.payload;
        },
        handleKyLuatError: (state, action) => {
        },
        updateSelectedKyLuatInput: (state, action) => {
            state.selectedKyLuat = action.payload;
        },

    },
});

export default reducer;