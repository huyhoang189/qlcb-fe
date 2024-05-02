import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts";
import QuanLyChucDanhKhoaHoc from "../pages/QuanLyDanhMuc/ChucDanhKhoaHoc/index.jsx";
import DonVi from "../pages/QuanLyDanhMuc/DonVi/index.jsx";
import NotFound from "../pages/NotFound/index.jsx";
import CanBoCoBan from "../pages/QuanLyCanBo/ThongTinCoBan/index.jsx";
import LyLichKhoaHoc from "../pages/QuanLyCanBo/LyLichKhoaHoc/index.jsx";
import TrinhDoNgoaiNgu from "../pages/QuanLyCanBo/TrinhDoNgoaiNgu/index.jsx";
import KhenThuong from "../pages/QuanLyCanBo/KhenThuong/index.jsx";
import KyLuat from "../pages/QuanLyCanBo/KyLuat/index.jsx";
import DiNuocNgoai from "../pages/QuanLyCanBo/DiNuocNgoai/index.jsx";
import TinhTrangSucKhoe from "../pages/QuanLyCanBo/TinhTrangSucKhoe/index.jsx";
import BaoHiem from "../pages/QuanLyCanBo/BaoHiem/index.jsx"
import TinhHinhNhaO from "../pages/QuanLyCanBo/TinhHinhNhaO/index.jsx"
import ChungNhanCap from "../pages/QuanLyCanBo/ChungNhanCap/index.jsx"
import QuanHam from "../pages/QuanLyCanBo/QuanHam/index.jsx"
import QuaTrinhCongTac from "../pages/QuanLyCanBo/QuaTrinhCongTac/index.jsx"
import LyLichChucDanhPhapLy from "../pages/QuanLyCanBo/LyLichChucDanhPhapLy/index.jsx"
import QuanLyTruongHoc from "../pages/QuanLyDanhMuc/TruongHoc/index.jsx";
import QuanLyChucVuChinhQuyen from "../pages/QuanLyDanhMuc/ChucVuChinhQuyen/index.jsx";
import QuanLyChuyenNganh from "../pages/QuanLyDanhMuc/ChuyenNganh/index.jsx";
import QuanLyLoaiHinhDaoTao from "../pages/QuanLyDanhMuc/LoaiHinhDaoTao/index.jsx";
import QuaTrinhDaoTao from "../pages/QuanLyCanBo/QuaTrinhDaoTao/index.jsx";
import QuanLyNgoaiNgu from "../pages/QuanLyDanhMuc/NgoaiNgu/index.jsx";
import QuanLyChungNhan from "../pages/QuanLyDanhMuc/ChungNhan/index.jsx"
import QuanLyChucDanhPhapLy from "../pages/QuanLyDanhMuc/ChucDanhPhapLy/index.jsx"
export const router = createBrowserRouter([
  //   {
  //     path: "login",
  //     element: <Auth />,
  //   },
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
            element: <DonVi />,
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
        ],
      },
    ],
  },
]);
