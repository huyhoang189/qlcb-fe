import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
  role: {},
  selectedRole: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "roles",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedRole =
        action.payload !== null ? action.payload : initialState.role;
    },

    getRoles: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getRolesSuccess: (state, action) => {
      state.errorMassage = false;
      state.roles = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getRolesError: (state, action) => {
      state.errorMassage = "Error";
      state.roles = action.payload ? action.payload : state.roles;
      state.isLoading = false;
    },
    handleRole: (state, action) => {},
    handleRoleSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedRole = action.payload;
    },
    handleRoleError: (state, action) => {},
    updateSelectedRoleInput: (state, action) => {
      state.selectedRole = action.payload;
    },
  },
});

export default reducer;
