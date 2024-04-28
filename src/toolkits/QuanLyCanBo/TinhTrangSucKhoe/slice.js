import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    tinhTrangSucKhoes: [],
    tinhTrangSucKhoe: {
        id: "",
        ma_can_bo: "",
        nhom_mau: "",
        benh_chinh: "",
        danh_gia_suc_khoe: "",
        ghi_chu: '',
        created_at: "",
        updated_at: ""
    },
    selectedTinhTrangSucKhoe: {},
    errorMassage: false,
    isLoading: false,
    modalActive: false,
    count: 0,
    pageSize: 10,
    pageNumber: 1,
    totalPage: 0,

};

const reducer = createSlice({
    name: "tinhTrangSucKhoes",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.modalActive = !state.modalActive;
            state.selectedTinhTrangSucKhoe =
                action.payload !== null ? action.payload : initialState.tinhTrangSucKhoe;
        },
        getTinhTrangSucKhoeById: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
            state.pageSize = action.payload.pageSize;
        },
        getTinhTrangSucKhoeByIdSuccess: (state, action) => {
            state.errorMassage = false;
            state.selectedTinhTrangSucKhoe = action.payload;
        },
        getTinhTrangSucKhoeByIdError: (state, action) => {
            state.errorMassage = "Error";
            state.selectedTinhTrangSucKhoe = action.payload
                ? action.payload
                : state.tinhTrangSucKhoe;
        },
        getTinhTrangSucKhoes: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getTinhTrangSucKhoesSuccess: (state, action) => {
            state.errorMassage = false;
            state.tinhTrangSucKhoes = action.payload.data;
            state.totalItem = action.payload.count;
            state.pageNumber = action.payload.pageNumber;
            state.totalPage = action.payload.totalPage;
            state.pageSize = action.payload.pageSize;
            state.isLoading = false;
        },
        getTinhTrangSucKhoesError: (state, action) => {
            state.errorMassage = "Error";
            state.tinhTrangSucKhoes = action.payload
                ? action.payload
                : state.tinhTrangSucKhoes;
            state.isLoading = false;
        },
        handleTinhTrangSucKhoe: (state, action) => {
        },
        handleTinhTrangSucKhoeSuccess: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.selectedTinhTrangSucKhoe = action.payload;
        },
        handleTinhTrangSucKhoeError: (state, action) => {
        },
        updateSelectedTinhTrangSucKhoeInput: (state, action) => {
            state.selectedTinhTrangSucKhoe = action.payload;
        },

    },
});

export default reducer;