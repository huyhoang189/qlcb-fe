import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/home";
import MainLayout from "../layouts";
import QuanLyChucDanhKhoaHoc from "../pages/quan-ly-danh-muc/chuc-danh-khoa-hoc/index.jsx";
import DonVi from "../pages/quan-ly-danh-muc/don-vi/index.jsx";
import NotFound from "../pages/not-found/index.jsx";


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
            }

        ],
    },
]);
