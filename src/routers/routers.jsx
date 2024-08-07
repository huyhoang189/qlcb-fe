import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts";
import DonVi from "../pages/QuanLyDanhMuc/DonVi/index.jsx";
import NotFound from "../pages/NotFound/index.jsx";
import CanBoCoBan from "../pages/QuanLyCanBo/ThongTinCoBan/index.jsx";
import LyLichKhoaHoc from "../pages/QuanLyCanBo/LyLichKhoaHoc/index.jsx";
import TrinhDoNgoaiNgu from "../pages/QuanLyCanBo/TrinhDoNgoaiNgu/index.jsx";
import KhenThuong from "../pages/QuanLyCanBo/KhenThuong/index.jsx";
import KyLuat from "../pages/QuanLyCanBo/KyLuat/index.jsx";
import DiNuocNgoai from "../pages/QuanLyCanBo/DiNuocNgoai/index.jsx";
import TinhTrangSucKhoe from "../pages/QuanLyCanBo/TinhTrangSucKhoe/index.jsx";
import BaoHiem from "../pages/QuanLyCanBo/BaoHiem/index.jsx";
import TinhHinhNhaO from "../pages/QuanLyCanBo/TinhHinhNhaO/index.jsx";
import ChungNhanCap from "../pages/QuanLyCanBo/ChungNhanCap/index.jsx";
import QuanHam from "../pages/QuanLyCanBo/QuanHam/index.jsx";
import QuaTrinhCongTac from "../pages/QuanLyCanBo/QuaTrinhCongTac/index.jsx";
import LyLichChucDanhPhapLy from "../pages/QuanLyCanBo/LyLichChucDanhPhapLy/index.jsx";
import QuanLyTruongHoc from "../pages/QuanLyDanhMuc/TruongHoc/index.jsx";
import QuanLyChucDanhKhoaHoc from "../pages/QuanLyDanhMuc/ChucDanhKhoaHoc/index.jsx";
import QuanLyChucVuChinhQuyen from "../pages/QuanLyDanhMuc/ChucVuChinhQuyen/index.jsx";
import QuanLyChuyenNganh from "../pages/QuanLyDanhMuc/ChuyenNganh/index.jsx";
import QuanLyLoaiHinhDaoTao from "../pages/QuanLyDanhMuc/LoaiHinhDaoTao/index.jsx";
import QuanLyHinhThucKhenThuong from "../pages/QuanLyDanhMuc/HinhThucKhenThuong/index.jsx";
import QuanLyHinhThucKyLuat from "../pages/QuanLyDanhMuc/HinhThucKyLuat/index.jsx";
import LoaiDanhHieuThiDua from "../pages/QuanLyDanhMuc/LoaiDanhHieuThiDua/index.jsx";
import QuaTrinhDaoTao from "../pages/QuanLyCanBo/QuaTrinhDaoTao/index.jsx";
import QuanLyNgoaiNgu from "../pages/QuanLyDanhMuc/NgoaiNgu/index.jsx";
import QuanLyChungNhan from "../pages/QuanLyDanhMuc/ChungNhan/index.jsx";
import QuanLyChucDanhPhapLy from "../pages/QuanLyDanhMuc/ChucDanhPhapLy/index.jsx";
import QuanLyBoNhiemCanBo from "../pages/DieuDongBoNhiem/BoNhiemCanBo/index.jsx";
import DanhSachBoNhiem from "../pages/DieuDongBoNhiem/DanhSachBoNhiem/index.jsx";
import QuanLyKhenThuong from "../pages/DieuTraHinhSu/QuanLyKhenThuong/index.jsx";
import QuanLyKyLuat from "../pages/DieuTraHinhSu/QuanLyKyLuat/index.jsx";
import DanhSachKhenThuongKyLuat from "../pages/DieuTraHinhSu/DanhSachKhenThuongKyLuat/index.jsx";
import DonVi_V2 from "../pages/QuanLyDanhMuc/DonVi/index_v1.jsx";
import QuanLyKeHoach from "../pages/QuanLyDaoTao/QuanLyKeHoach/index.jsx";
import ChiTietKeHoach from "../pages/QuanLyDaoTao/ChiTietKeHoach/index.jsx";
import DieuDongCanBo from "../pages/DieuDongBoNhiem/DieuDongCanBo/index.jsx";
import DanhSachDaoTao from "../pages/QuanLyDaoTao/DanhSachDaoTao/index.jsx";
import QuanLyKyThi from "../pages/QuanLyDaoTao/QuanLyKyThi/index.jsx";
import LichSuDieuDong from "../pages/DieuDongBoNhiem/LichSuDieuDong/index.jsx";
import ToKhaiT63 from "../pages/QuanLyCanBo/T63/index.jsx";
import Login from "../pages/DangNhap/index.jsx";
import DanhSachThiSinh from "../pages/QuanLyDaoTao/DanhSachThiSinh/index.jsx";
import TimKiemNangCao from "../pages/QuanLyCanBo/TimKiemNangCao/index.jsx";
import CanBoDangThucHienNhiemVu from "../pages/QuanLyDaoTao/CanBoThucHienNhiemVu/index.jsx";
import QuanLyNguoiDung from "../pages/QuanTriHeThong/QuanLyNguoiDung/index.jsx";
import QuanLyPhanQuyen from "../pages/QuanTriHeThong/DanhMucQuyen/index.jsx";
import ThietLapThamSo from "../pages/QuanTriHeThong/ThietLapThamSo/index.jsx";
import Group from "../pages/QuanTriHeThong/QuanLyNhomQuyen/index.jsx";
import Permission from "../pages/QuanTriHeThong/QuanLyNhomQuyen/detail.jsx";
export const router = createBrowserRouter([
  {
    path: "dang-nhap",
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "quan-tri-danh-muc",
        children: [
          {
            path: "don-vi",
            element: <DonVi_V2 />,
          },
          {
            path: "chuc-danh-khoa-hoc",
            element: <QuanLyChucDanhKhoaHoc />,
          },
          {
            path: "chuyen-nganh",
            element: <QuanLyChuyenNganh />,
          },
          {
            path: "chuc-vu-chinh-quyen",
            element: <QuanLyChucVuChinhQuyen />,
          },
          {
            path: "truong-hoc",
            element: <QuanLyTruongHoc />,
          },
          {
            path: "loai-hinh-dao-tao",
            element: <QuanLyLoaiHinhDaoTao />,
          },
          {
            path: "hinh-thuc-khen-thuong",
            element: <QuanLyHinhThucKhenThuong />,
          },
          {
            path: "hinh-thuc-ky-luat",
            element: <QuanLyHinhThucKyLuat />,
          },
          {
            path: "loai-danh-hieu-thi-dua",
            element: <LoaiDanhHieuThiDua />,
          },
          {
            path: "ngoai-ngu",
            element: <QuanLyNgoaiNgu />,
          },
          {
            path: "chung-nhan",
            element: <QuanLyChungNhan />,
          },
          {
            path: "chuc-danh-phap-ly",
            element: <QuanLyChucDanhPhapLy />,
          },
        ],
      },
      {
        path: "quan-ly-ho-so-can-bo",
        children: [
          {
            path: "danh-sach-can-bo",
            element: <CanBoCoBan />,
          },
          {
            path: "tim-kiem-nang-cao",
            element: <TimKiemNangCao />,
          },
          {
            path: "danh-sach-can-bo/:ma_can_bo/ly-lich-khoa-hoc",
            element: <LyLichKhoaHoc />,
          },
          {
            path: "danh-sach-can-bo/:ma_can_bo/qua-trinh-dao-tao",
            element: <QuaTrinhDaoTao />,
          },
          {
            path: "danh-sach-can-bo/:ma_can_bo/trinh-do-ngoai-ngu",
            element: <TrinhDoNgoaiNgu />,
          },
          {
            path: "danh-sach-can-bo/:ma_can_bo/khen-thuong",
            element: <KhenThuong />,
          },
          {
            path: "danh-sach-can-bo/:ma_can_bo/ky-luat",
            element: <KyLuat />,
          },
          {
            path: "danh-sach-can-bo/:ma_can_bo/lich-su-di-nuoc-ngoai",
            element: <DiNuocNgoai />,
          },
          {
            path: "danh-sach-can-bo/:ma_can_bo/tinh-trang-suc-khoe",
            element: <TinhTrangSucKhoe />,
          },
          {
            path: "danh-sach-can-bo/:ma_can_bo/bao-hiem",
            element: <BaoHiem />,
          },
          {
            path: "danh-sach-can-bo/:ma_can_bo/tinh-hinh-nha-o",
            element: <TinhHinhNhaO />,
          },
          {
            path: "danh-sach-can-bo/:ma_can_bo/chung-nhan-da-cap",
            element: <ChungNhanCap />,
          },
          {
            path: "danh-sach-can-bo/:ma_can_bo/quan-ham",
            element: <QuanHam />,
          },
          {
            path: "danh-sach-can-bo/:ma_can_bo/qua-trinh-cong-tac",
            element: <QuaTrinhCongTac />,
          },
          {
            path: "danh-sach-can-bo/:ma_can_bo/ly-lich-chuc-danh-phap-ly",
            element: <LyLichChucDanhPhapLy />,
          },
          {
            path: "danh-sach-can-bo/:ma_can_bo/to-khai-t63",
            element: <ToKhaiT63 />,
          },
        ],
      },
      {
        path: "dieu-dong-bo-nhiem",
        children: [
          {
            path: "bo-nhiem-can-bo",
            element: <QuanLyBoNhiemCanBo />,
          },
          {
            path: "bo-nhiem-can-bo/:ma_bo_nhiem/danh-sach-bo-nhiem",
            element: <DanhSachBoNhiem />,
          },
          {
            path: "dieu-dong-can-bo",
            element: <DieuDongCanBo />,
          },
          {
            path: "dieu-dong-can-bo/:ma_can_bo/lich-su-dieu-dong",
            element: <LichSuDieuDong />,
          },
        ],
      },
      {
        path: "chinh-sach",
        children: [
          {
            path: "quan-ly-thi-dua-khen-thuong",
            element: <QuanLyKhenThuong />,
          },
          {
            path: "quan-ly-thi-dua-khen-thuong/:ma_khen_thuong_ky_luat/:type/danh-sach-khen-thuong",
            element: <DanhSachKhenThuongKyLuat />,
          },
          {
            path: "quan-ly-ky-luat",
            element: <QuanLyKyLuat />,
          },
          {
            path: "quan-ly-ky-luat/:ma_khen_thuong_ky_luat/:type/danh-sach-ky-luat",
            element: <DanhSachKhenThuongKyLuat />,
          },
        ],
      },
      {
        path: "quan-ly-dao-tao",
        children: [
          {
            path: "ke-hoach-dao-tao-boi-duong-can-bo",
            element: <QuanLyKeHoach />,
          },
          {
            path: "ke-hoach-dao-tao-boi-duong-can-bo/:ma_ke_hoach/chi-tiet-ke-hoach",
            element: <ChiTietKeHoach />,
          },
          {
            path: "ke-hoach-dao-tao-boi-duong-can-bo/:ma_ke_hoach/chi-tiet-ke-hoach/:ma_chi_tiet_ke_hoach/danh-sach-dao-tao",
            element: <DanhSachDaoTao />,
          },
          {
            path: "quan-ly-ky-thi",
            element: <QuanLyKyThi />,
          },
          {
            path: "quan-ly-ky-thi/:ma_ky_thi/danh-sach-can-bo-tham-gia-thi",
            element: <DanhSachThiSinh />,
          },
          {
            path: "quan-ly-can-bo-thuc-hien-nhiem-vu-dao-tao",
            element: <CanBoDangThucHienNhiemVu />,
          },
        ],
      },
      {
        path: "quan-tri-he-thong",
        children: [
          {
            path: "quan-ly-nguoi-dung",
            element: <QuanLyNguoiDung />,
          },
          {
            path: "quyen",
            element: <QuanLyPhanQuyen />,
          },
          {
            path: "nhom-quyen",
            element: <Group />,
          },
          {
            path: "nhom-quyen/:id",
            element: <Permission />,
          },

          {
            path: "thiet-lap-tham-so",
            element: <ThietLapThamSo />,
          },
        ],
      },
    ],
  },
]);
