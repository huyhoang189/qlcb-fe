export const ACTION_NAME = {
  UPDATE: "UPDATE",
  CREATE: "CREATE",
  DELETE: "DELETE",
  VIEW: "VIEW",
};

export const DATE_FORMAT = {
  DDMMYYYY: "DD/MM/YYYY",
  YYYYMMDD: "YYYY/MM/DD",
  YYYY: "YYYY",
};

export const LOAI_TRUONG_HOC = [
  { value: "trong_quan_doi", label: "TRƯỜNG QUÂN ĐỘI" },
  { value: "ngoai_quan_doi", label: "TRƯỜNG NGOÀI QUÂN ĐỘI" },
];

export const LOAI_CHUC_DANH_PHAP_LY = [
  { value: "TT_PTT_CAP_1", label: "TT, PTT cấp thứ nhất" },
  { value: "TT_PTT_CAP_2", label: "TT, PTT cấp thứ hai" },
  { value: "TT_PTT_CAP_3", label: "TT, PTT cấp thứ ba" },
  { value: "DIEU_TRA_VIEN", label: "Điều tra viên" },
  { value: "CAN_BO_DIEU_TRA", label: "Cán bộ tra" },
  { value: "CAN_BO_KHAC", label: "Cán bộ khác" },
];

export const LOAI_KHEN_THUONG_KY_LUAT = {
  TAP_THE: "Tập thể",
  CA_NHAN: "Cá nhân",
};
