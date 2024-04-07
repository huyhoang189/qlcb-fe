import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import {ContentWrapper} from "../../../assets/styles/contentWrapper.style.js";
import CustomeTable from "../../../components/Table/table.jsx";
import {useDispatch, useSelector} from "react-redux";
import canBoCoBanSlice from "../../../toolkits/quanLyCanBo/thongTinCoBan/slice.js"
import {useEffect, useState} from "react";
import {Button, Dropdown, Space} from "antd";
import {CreateButton, DeleteButton, UpdateButton} from "../../../components/Button/index.jsx";
import Header from "../../../components/Table/header.jsx";
import TextInput from "../../../components/Form/textinput.jsx";
import {Link, useNavigate} from "react-router-dom";
import {EyeOutlined} from "@ant-design/icons";
// import ModalItem from "./modal.jsx";

const pageHeader = {
    breadcrumb: [
        {
            title: "Trang chủ",
            href: "/"
        },
        {
            title: "Quản lý hồ sơ cán bộ",
        },
        {
            title: "Danh sách cán bộ điều tra",
        },
    ],
};

const baseColumns = [
    {
        title: "STT",
        dataIndex: "key",
        key: "key",
        width: 50,
        align: "center",
    },

    {
        title: "Họ và tên khai sinh",
        dataIndex: "ho_ten_khai_sinh",
        key: "ho_ten_khai_sinh",
        align: "center",
    },
    {
        title: "Số hiệu quân nhân",
        dataIndex: "so_hieu_quan_nhan",
        key: "so_hieu_quan_nhan",
        align: "center",
    },
    {
        title: "Ngày tháng năm sinh",
        dataIndex: "ngay_thang_nam_sinh",
        key: "ngay_thang_nam_sinh",
        align: "center",
    },
    {
        title: "Ngày vào đảng",
        dataIndex: "ngay_vao_dang",
        key: "ngay_vao_dang",
        align: "center",
    },
    {
        title: "Ngày nhập ngũ",
        dataIndex: "ngay_nhap_ngu",
        key: "ngay_nhap_ngu",
        align: "center",
    },
    {
        title: "Quê quán",
        dataIndex: "que_quan",
        key: "que_quan",
        align: "center",
    },
    {
        title: "Nơi ở hiện nay",
        dataIndex: "noi_o_hien_nay",
        key: "noi_o_hien_nay",
        align: "center",
    },
    {
        title: "trình độ GDPT",
        dataIndex: "trinh_do_giao_duc_pho_thong",
        key: "trinh_do_giao_duc_pho_thong",
        align: "center",
    },

]

const features = [
    {
        label: "Mẫu lý lịch T63",
        key: "ly-lich-t63",
    },
    {
        label: "Lý lịch khoa học",
        key: "ly-lich-khoa-hoc",
    },
    {
        label: "Quá trình công tác",
        key: "qua-trinh-cong-tac",
    },

]


const CanBoCoBan = () => {
    const dispatch = useDispatch()
    const {
        canBoCoBans,
        isLoading,
        totalItem,
        pageNumber,
        pageSize
    } = useSelector(state => state.canBoCoBans)
    const navigate = useNavigate()

    const [keyword, setKeyword] = useState("");


    const onChangeKeywordInput = (key, event) => {
        setKeyword(event.target.value)
    }

    const handlePaginationChange = (current, pageSize) => {
        dispatch(
            canBoCoBanSlice.actions.getCanBoCoBans({
                keyword,
                pageSize: pageSize,
                pageNumber: current,
            })
        );
    };


    const handleModal = (_item) => {
        dispatch(canBoCoBanSlice.actions.toggleModal(_item))
    }


    const columns = [
        ...baseColumns,
        {
            title: "Chức năng",
            key: "feature",
            align: "center",
            render: (text, record) => <Dropdown
                menu={{
                    items: features.map((e, i) => ({
                        ...e,
                        label: <Link
                            to={`${record?.id}/${e?.key}`}>{`${i + 1}. ${e?.label}`}</Link>
                    })),
                }}
                placement="bottomRight"
                arrow
            >
                <Button icon={<EyeOutlined/>}/>
            </Dropdown>
        },
        {
            title: "Công cụ",
            key: "tool",
            align: "center",
            width: 140,
            render: (text, record) =>
                <Space
                    direction="horizontal"
                    style={{width: "100%", justifyContent: "center"}}
                >
                    {/*<DetailButton onClick={() => {*/}
                    {/*    navigate(`${record?.id}/ly-lich-khoa-hoc/`)*/}
                    {/*}}/>*/}
                    <UpdateButton
                        onClick={() => handleModal(record)}
                    />
                    <DeleteButton
                        onConfirm={() => {
                            dispatch(
                                canBoCoBanSlice.actions.handleCanBoCoBan({
                                    item: record,
                                    actionName: "DELETE",
                                    pageSize: pageSize,
                                    pageNumber:
                                        record?.key === pageSize * (pageNumber - 1) + 1
                                            ? Math.max(pageNumber - 1, 1)
                                            : pageNumber,
                                })
                            );
                        }}

                    />
                </Space>

        }
    ]


    //side effect
    useEffect(() => {
        dispatch(canBoCoBanSlice.actions.getCanBoCoBans(
            {
                keyword,
                pageSize: 10,
                pageNumber: 1,
            }
        ))
    }, [dispatch, keyword]);


    return <ContentWrapper>
        <CustomBreadcrumb items={pageHeader.breadcrumb}/>
        <CustomeTable
            header={
                <Header>

                    <TextInput
                        placeholder={"Nhập vào từ khoá tìm kiếm"}
                        onChange={onChangeKeywordInput}
                        property={"keyword"}
                        width={20}
                    />
                    <CreateButton onClick={() => handleModal(null)}/>
                </Header>}
            data={canBoCoBans}
            columns={columns}
            isLoading={isLoading}
            pagination={{
                current: pageNumber,
                pageSize: pageSize,
                total: totalItem,
                onChange: handlePaginationChange,
            }}/>

        {/*<ModalItem/>*/}
    </ContentWrapper>
}

export default CanBoCoBan