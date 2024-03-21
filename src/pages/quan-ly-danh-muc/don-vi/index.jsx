import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import {ContentWrapper} from "../../../assets/styles/contentWrapper.style.js";
import CustomeTable from "../../../components/Table/table.jsx";
import {useDispatch, useSelector} from "react-redux";
import donViSlice from "../../../toolkits/don-vi/slice.js"
import {useEffect, useState} from "react";
import {Space} from "antd";
import {CreateButton, DeleteButton, UpdateButton} from "../../../components/Button/index.jsx";
import Header from "../../../components/Table/header.jsx";
import TextInput from "../../../components/Form/textinput.jsx";
import ModalItem from "./modal.jsx";

const pageHeader = {
    breadcrumb: [
        {
            title: "Trang chủ",
            href: "/"
        },
        {
            title: "Quản lý danh mục",
        },
        {
            title: "Quản lý danh mục đơn vị",
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
        title: "Mã đơn vị",
        dataIndex: "ma_don_vi",
        key: "ma_don_vi",
        align: "center",
    },
    {
        title: "Tên đơn vị",
        dataIndex: "ten_don_vi",
        key: "ten_don_vi",
        align: "center",
    },
    {
        title: "Đơn vị cha",
        dataIndex: "don_vi",
        key: "don_vi",
        align: "center",
        render: (text, record) => {
            return record?.don_vi?.ten_don_vi
        }
    },
    {
        title: "Số thứ tự",
        dataIndex: "so_thu_tu",
        key: "so_thu_tu",
        align: "center",
    },
    {
        title: "Ghi chú",
        dataIndex: "ghi_chu",
        key: "ghi_chu",
        align: "center",
    },

]


const DonVi = () => {
    const dispatch = useDispatch()
    const {
        donVis,
        isLoading,
        totalItem,
        pageNumber,
        pageSize
    } = useSelector(state => state.donVis)

    const [keyword, setKeyword] = useState("");


    const onChangeKeywordInput = (key, event) => {
        setKeyword(event.target.value)
    }

    const handlePaginationChange = (current, pageSize) => {
        dispatch(
            donViSlice.actions.getDonVis({
                keyword,
                pageSize: pageSize,
                pageNumber: current,
            })
        );
    };


    const handleModal = (_item) => {
        dispatch(donViSlice.actions.toggleModal(_item))
    }


    const columns = [
        ...baseColumns,
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
                    <UpdateButton
                        onClick={() => handleModal(record)}
                    />
                    <DeleteButton
                        onConfirm={() => {
                            dispatch(
                                donViSlice.actions.handleDonVi({
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
        dispatch(donViSlice.actions.getDonVis(
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
            data={donVis}
            columns={columns}
            isLoading={isLoading}
            pagination={{
                current: pageNumber,
                pageSize: pageSize,
                total: totalItem,
                onChange: handlePaginationChange,
            }}/>

        <ModalItem/>
    </ContentWrapper>
}

export default DonVi