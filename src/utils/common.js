export const ACTION_NAME = {
  UPDATE: "UPDATE",
  CREATE: "CREATE",
  DELETE: "DELETE",
  VIEW: "VIEW",
};

export const DATE_FORMAT = {
  DDMMYYYY: "DD/MM/YYYY",
  YYYYMMDD: "YYYY-MM-DD",
  YYYY: "YYYY",
};

export const LOAI_TRUONG_HOC = [
  { value: "trong_quan_doi", label: "TRƯỜNG QUÂN ĐỘI" },
  { value: "ngoai_quan_doi", label: "TRƯỜNG NGOÀI QUÂN ĐỘI" },
];
export const LOAI_TRINH_DO_CHINH_TRI = [
  { value: "Sơ cấp", label: "Sơ cấp" },
  { value: "Trung cấp", label: "Trung cấp" },
  { value: "Cao cấp", label: "Cao cấp" },
];
export const LOAI_CHUC_DANH_PHAP_LY = [
  { value: "TT_PTT_CAP_1", label: "TT, PTT cấp thứ nhất" },
  { value: "TT_PTT_CAP_2", label: "TT, PTT cấp thứ hai" },
  { value: "TT_PTT_CAP_3", label: "TT, PTT cấp thứ ba" },
  { value: "DIEU_TRA_VIEN_CAO_CAP", label: "Điều tra viên cao cấp" },
  { value: "DIEU_TRA_VIEN_TRUNG_CAP", label: "Điều tra viên trung cấp" },
  { value: "DIEU_TRA_VIEN_SO_CAP", label: "Điều tra viên sơ cấp" },
  { value: "CAN_BO_DIEU_TRA", label: "Cán bộ tra" },
  { value: "CAN_BO_KHAC", label: "Cán bộ khác" },
];

export const HINH_THUC_THUONG_KY_LUAT = [
  { value: "TAP_THE", label: "Tập thể" },
  { value: "CA_NHAN", label: "Cá nhân" },
];

export const LOAI_KHEN_THUONG_KY_LUAT = {
  KHEN_THUONG: "KHEN_THUONG",
  KY_LUAT: "KY_LUAT",
};

export const GIOI_TINH = [
  { value: "Nam", label: "Nam" },
  { value: "Nữ", label: "Nữ" },
];

export const TOKEN_VERIFY = "AxfBtrtrsDYChkh";

export const GROUP_TYPE = [
  { value: "ADMIN", label: "Quản trị hệ thống" },
  { value: "MOD", label: "Quản trị viên" },
  { value: "USER", label: "Người dùng" },
];

const removeAccents = (str) => {
  // Tạo một đối tượng ánh xạ các ký tự có dấu sang không dấu
  const accentsMap = {
    a: "áàạảãâấầậẩẫăắằặẳẵ",
    e: "éèẹẻẽêếềệểễ",
    i: "íìịỉĩ",
    o: "óòọỏõôốồộổỗơớờợởỡ",
    u: "úùụủũưứừựửữ",
    y: "ýỳỵỷỹ",
    d: "đ",
    A: "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",
    E: "ÉÈẸẺẼÊẾỀỆỂỄ",
    I: "ÍÌỊỈĨ",
    O: "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",
    U: "ÚÙỤỦŨƯỨỪỰỬỮ",
    Y: "ÝỲỴỶỸ",
    D: "Đ",
  };

  // Thay thế các ký tự có dấu bằng ký tự không dấu
  for (const key in accentsMap) {
    const accents = accentsMap[key];
    for (let i = 0; i < accents.length; i++) {
      str = str.replace(new RegExp(accents[i], "g"), key);
    }
  }

  return str;
};

export const convertVietnameseToUpperUnderscore = (str) => {
  // Loại bỏ dấu
  str = removeAccents(str);

  // Chuyển đổi chuỗi thành chữ in hoa và thay thế khoảng trắng bằng dấu gạch dưới
  return str.toUpperCase().replace(/\s+/g, "_");
};
