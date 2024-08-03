import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permissions: [],
  permission: {},
  selectedPermission: {},
  errorMassage: false,
  isLoading: false,
  modalActive: false,
  count: 0,
  pageSize: 10,
  pageNumber: 1,
  totalPage: 0,
};

const reducer = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedPermission =
        action.payload !== null ? action.payload : initialState.permission;
    },

    getPermissions: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.isLoading = true;
    },
    getPermissionsSuccess: (state, action) => {
      state.errorMassage = false;
      state.permissions = action.payload.data;
      state.totalItem = action.payload.count;
      state.pageNumber = action.payload.pageNumber;
      state.totalPage = action.payload.totalPage;
      state.pageSize = action.payload.pageSize;
      state.isLoading = false;
    },
    getPermissionsError: (state, action) => {
      state.errorMassage = "Error";
      state.permissions = action.payload ? action.payload : state.permissions;
      state.isLoading = false;
    },
    handlePermission: (state, action) => {},
    handlePermissionSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMassage = false;
      state.selectedPermission = action.payload;
    },
    handlePermissionError: (state, action) => {},
    updateSelectedPermissionInput: (state, action) => {
      state.selectedPermission = action.payload;
    },
  },
});

export default reducer;
