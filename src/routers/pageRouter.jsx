import {
  BankOutlined,
  BarChartOutlined,
  BarsOutlined,
  HomeOutlined,
  SettingOutlined,
  TranslationOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const publicRouter = [
  {
    key: "",
    icon: <HomeOutlined />,
    label: "Trang chủ",
  },
  {
    key: "quan-ly-ho-so-can-bo",
    icon: <UserOutlined />,
    label: "Hồ sơ cán bộ",

    children: [
      {
        key: "danh-sach-can-bo",
        label: "Danh sách cán bộ",
      },
    ],
  },
  {
    key: "dieu-dong-bo-nhiem",
    icon: <TranslationOutlined />,
    label: "Điều động, bổ nhiệm",
    children: [
      {
        key: "bo-nhiem-can-bo",
        label: "Bổ nhiệm cán bộ",
      },
      {
        key: "dieu-dong-can-bo",
        label: "Điều động cán bộ",
      },
    ],
  },
  {
    key: "chinh-sach",
    icon: <UserOutlined />,
    label: "Chính sách",

    children: [
      {
        key: "quan-ly-thi-dua-khen-thuong",
        label: "Quản lý thi đua, khen thưởng",
      },
      {
        key: "quan-ly-ky-luat",
        label: "Quản lý kỷ luật",
      },
    ],
  },
  {
    key: "quan-ly-dao-tao",
    label: "Quản lý đào tạo",
    icon: <BankOutlined />,
    children: [
      {
        key: "quan-ly-can-bo-thuc-hien-nhiem-vu-dao-tao",
        label: "Quản lý cán bộ đang thực hiện nhiệm vụ đào tạo",
      },
      {
        key: "quan-ly-ky-thi",
        label:
          "Quản lý cán bộ tham gia thi và kết quả thi chuyên môn nghiệm vụ",
      },
      {
        key: "ke-hoach-dao-tao-boi-duong-can-bo",
        label: "Quản lý kế hoạch đào tạo - bồi dưỡng",
      },
      // {
      //   key: "quan-ly-in",
      //   label: "Quản lý in Thẻ điều tra viên, Giấy chứng nhận nghiệp vụ",
      // },
    ],
  },
  {
    key: "bao-cao-thong-ke",
    icon: <BarChartOutlined />,
    children: [
      {
        key: "phan-tich-so-luong-chat-luong-can-bo",
        label: "Phân tích số lượng, chất lượng cán bộ",
      },
      {
        key: "phan-tich-tinh-hinh-so-luong-can-bo",
        label: "Phân tích tình hình số lượng cán bộ",
      },
    ],
    label: "Tra cứu, báo cáo thống kê",
  },

  {
    key: "quan-tri-danh-muc",
    icon: <BarsOutlined />,
    label: "Quản trị danh mục",
    children: [
      {
        key: "chuc-vu-chinh-quyen",
        label: "Chức vụ chính quyền",
      },
      {
        key: "chuc-danh-khoa-hoc",
        label: "Quản lý chức danh khoa học",
      },
      {
        key: "chuc-danh-phap-ly",
        label: "Quản lý chức danh pháp lý",
      },
      {
        key: "chung-nhan",
        label: "Quản lý chứng nhận",
      },
      {
        key: "don-vi",
        label: "Quản lý đơn vị",
      },
      {
        key: "truong-hoc",
        label: "Trường học",
      },
      {
        key: "chuyen-nganh",
        label: "Chuyên ngành",
      },
      {
        key: "loai-hinh-dao-tao",
        label: "Loại hình đào tạo",
      },
      {
        key: "ngoai-ngu",
        label: "Ngoại ngữ",
      },
    ],
  },
  {
    key: "quan-tri-he-thong",
    icon: <SettingOutlined />,
    children: [
      {
        key: "quan-ly-nguoi-dung",
        label: "Quản lý người sử dụng",
      },
      {
        key: "phan-quyen-he-thong",
        label: "Phân cấp, phân quyền",
      },
      {
        key: "sao-luu-du-lieu",
        label: "Sao lưu",
      },
      {
        key: "phuc-hoi-du-lieu",
        label: "Phục hồi",
      },
      {
        key: "thiet-lap-tham-so",
        label: "Thiết lập tham số hệ thống",
      },
    ],
    label: "Quản trị hệ thống",
  },
];

export const privateRouter = [];
