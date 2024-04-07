import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/home";
import MainLayout from "../layouts";
import QuanLyChucDanhKhoaHoc from "../pages/quanLyDanhMuc/chucDanhKhoaHoc/index.jsx";
import DonVi from "../pages/quanLyDanhMuc/donVi/index.jsx";
import NotFound from "../pages/notFound/index.jsx";
import CanBoCoBan from "../pages/quanLyCanBo/thongTinCoBan/index.jsx";
import LyLichKhoaHoc from "../pages/quanLyCanBo/lyLichKhoaHoc/index.jsx";


export const router = createBrowserRouter([
    //   {
    //     path: "login",
    //     element: <Auth />,
    //   },
    {
        path: "/",
        element: <MainLayout/>,
        errorElement: <NotFound/>,
        children: [
            {
                path: "",
                element: <Home/>,

            },
            {
                path: "quan-tri-danh-muc",
                children: [
                    {
                        path: "don-vi",
                        element: <DonVi/>
                    },
                    {
                        path: "chuc-danh-khoa-hoc",
                        element: <QuanLyChucDanhKhoaHoc/>
                    }
                ]
            },
            {
                path: "quan-ly-ho-so-can-bo",
                children: [
                    {
                        path: "danh-sach-can-bo",
                        element: <CanBoCoBan/>,

                    },
                    {
                        path: "danh-sach-can-bo/:ma_can_bo/ly-lich-khoa-hoc",
                        element: <LyLichKhoaHoc/>,
                    }


                ]
            },

        ],
    },
]);
