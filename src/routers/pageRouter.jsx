import {BarsOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";

export const publicRouter = [
    {
        key: "quan-ly-ho-so-can-bo",
        icon: <UserOutlined/>,
        children: [],
        label: "Quản lý hồ sơ cán bộ",
    },
    {
        key: "quan-tri-danh-muc",
        icon: <BarsOutlined/>,
        children: [
            {
                key: "quan-ly-chuc-danh-khoa-hoc",
                label: "Quản lý chức danh khoa học",
            },
        ],
        label: "Quản trị danh mục",
    },
    {
        key: "quan-tri-he-thong",
        icon: <SettingOutlined/>,
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
    }
]

export const privateRouter = []


