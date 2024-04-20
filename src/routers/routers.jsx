import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts";
import QuanLyChucDanhKhoaHoc from "../pages/QuanLyDanhMuc/ChucDanhKhoaHoc/index.jsx";
import DonVi from "../pages/QuanLyDanhMuc/DonVi/index.jsx";
import NotFound from "../pages/NotFound/index.jsx";
import CanBoCoBan from "../pages/QuanLyCanBo/ThongTinCoBan/index.jsx";
import LyLichKhoaHoc from "../pages/QuanLyCanBo/LyLichKhoaHoc/index.jsx";


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
