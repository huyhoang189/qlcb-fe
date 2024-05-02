import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    quaTrinhCongTacs: [],
    quaTrinhCongTac: {
        id: "",
        ma_can_bo: "",
        ma_chuc_vu_chinh_quyen:"",
        don_vi_full_text: "",
        thoi_gian_bat_dau: "",
        thoi_gian_ket_thuc:"",
        ghi_chu: '',
        created_at: "",
        updated_at: ""
    },
    selectedQuaTrinhCongTac: {},
    errorMassage: false,
    isLoading: false,
    modalActive: false,
    count: 0,
    pageSize: 10,
    pageNumber: 1,
    totalPage: 0,

};

const reducer = createSlice({
    name: "quaTrinhCongTacs",
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.modalActive = !state.modalActive;
            state.selectedQuaTrinhCongTac =
                action.payload !== null ? action.payload : initialState.quaTrinhCongTac;
        },
        getQuaTrinhCongTacById: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
            state.pageSize = action.payload.pageSize;
        },
        getQuaTrinhCongTacByIdSuccess: (state, action) => {
            state.errorMassage = false;
            state.selectedQuaTrinhCongTac = action.payload;
        },
        getQuaTrinhCongTacByIdError: (state, action) => {
            state.errorMassage = "Error";
            state.selectedQuaTrinhCongTac = action.payload
                ? action.payload
                : state.quaTrinhCongTac;
        },
        getQuaTrinhCongTacs: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.isLoading = true;
        },
        getQuaTrinhCongTacsSuccess: (state, action) => {
            state.errorMassage = false;
            state.quaTrinhCongTacs = action.payload.data;
            state.totalItem = action.payload.count;
            state.pageNumber = action.payload.pageNumber;
            state.totalPage = action.payload.totalPage;
            state.pageSize = action.payload.pageSize;
            state.isLoading = false;
        },
        getQuaTrinhCongTacsError: (state, action) => {
            state.errorMassage = "Error";
            state.quaTrinhCongTacs = action.payload
                ? action.payload
                : state.quaTrinhCongTacs;
            state.isLoading = false;
        },
        handleQuaTrinhCongTac: (state, action) => {
        },
        handleQuaTrinhCongTacSuccess: (state, action) => {
            state.modalActive = false;
            state.errorMassage = false;
            state.selectedQuaTrinhCongTac = action.payload;
        },
        handleQuaTrinhCongTacError: (state, action) => {
        },
        updateSelectedQuaTrinhCongTacInput: (state, action) => {
            state.selectedQuaTrinhCongTac = action.payload;
        },

    },
});

export default reducer;