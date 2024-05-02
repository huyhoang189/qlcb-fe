import CustomBreadcrumb from "../../../components/breadcrumb.jsx";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
// import CustomeTable from "../../../components/Table/table.jsx";
import { useDispatch, useSelector } from "react-redux";
import danhSachBoNhiemSlice from "../../../toolkits/DieuDongBoNhiem/DanhSachBoNhiem/slice.js";
import { useEffect, useState } from "react";
import { Space } from "antd";
import {
  CreateButton,
  DeleteButton,
  DetailButton,
  UpdateButton,
} from "../../../components/Button/index.jsx";
import Header from "../../../components/Table/header.jsx";
import TextInput from "../../../components/Form/textinput.jsx";
import ModalItem from "./modal.jsx";
import { useNavigate, useParams } from "react-router-dom";
import CustomeTable from "../../../components/Table/table.jsx";
import HeaderRow from "../../../components/Table/headerrow.jsx";

const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Điều động - Bổ nhiệm",
    },
    {
      title: "Bổ nhiệm cán bộ",
    },
    {
      title: "Danh sách bổ nhiệm",
    },
  ],
};

const baseColumns = [
  {
    title: "STT",
    dataIndex: "key",
    key: "key",
    width: 30,
    align: "center",
  },
  {
    title: (
      <HeaderRow items={["Họ và tên", "SHSQ - Sinh - Quê"]} align="center" />
    ),
    dataIndex: "ho_va_ten",
    key: "ho_va_ten",
    align: "center",
    width: 140,
  },
  {
    title: <HeaderRow items={["Cấp bậc", "(Tháng, năm)"]} align="center" />,
    dataIndex: "cap_bac",
    key: "cap_bac",
    align: "center",
  },
  {
    title: <HeaderRow items={["Chức vụ đơn vị"]} align="center" />,
    dataIndex: "chuc_vu",
    key: "chuc_vu",
    align: "center",
  },
  {
    title: <HeaderRow items={["Nhập ngũ"]} align="center" />,
    dataIndex: "nhap_ngu",
    key: "nhap_ngu",
    align: "center",
  },
  {
    title: <HeaderRow items={["Vào đảng", "Chính thức"]} align="center" />,
    dataIndex: "vao_dang",
    key: "vao_dang",
    align: "center",
  },
  {
    title: (
      <HeaderRow
        items={[
          "Chức danh pháp lý đã qua (T.gian)",
          "Số giấy chứng nhận",
          "Thời gian công tác trong ngành (năm)",
        ]}
      />
    ),
    dataIndex: "ly_lich_phap_ly",
    key: "ly_lich_phap_ly",
    width: "20%",
  },
  {
    title: <HeaderRow items={["Qua trường"]} align="center" />,
    dataIndex: "qua_truong",
    key: "qua_truong",
  },
  {
    title: <HeaderRow items={["Văn hoá"]} align="center" />,
    dataIndex: "trinh_do_giao_duc_pho_thong",
    key: "trinh_do_giao_duc_pho_thong",
    align: "center",
  },
  {
    title: <HeaderRow items={["Sức khoẻ"]} align="center" />,
    dataIndex: "dot",
    key: "dot",
    align: "center",
  },
  {
    title: <HeaderRow items={["Đề nghị bổ nhiệm"]} align="center" />,
    dataIndex: "de_nghi_bo_nhiem",
    key: "de_nghi_bo_nhiem",
    align: "center",
  },
];

const prepareData = (data = []) => {
  let arr = [];

  data.map((e) => {
    const ho_va_ten = (
      <HeaderRow
        items={[
          e?.can_bo?.ho_ten_khai_sinh,
          e?.can_bo?.so_hieu_quan_nhan,
          e?.can_bo?.ngay_thang_nam_sinh,
          e?.can_bo?.que_quan,
        ]}
        splitBy=";"
      />
    );

    const cap_bac = (
      <HeaderRow
        items={[
          e?.can_bo?.cap_bac?.quan_ham,
          e?.can_bo?.cap_bac?.thoi_gian_nhan,
        ]}
        // splitBy=";"
        align="center"
      />
    );

    const chuc_vu = (
      <HeaderRow
        items={[
          e?.can_bo?.chuc_vu?.chuc_vu_chinh_quyen?.ten_chuc_vu,
          e?.can_bo?.chuc_vu?.don_vi_full_text,
          e?.can_bo?.chuc_vu?.thoi_gian_bat_dau,
        ]}
        // splitBy=";"
      />
    );

    const nhap_ngu = (
      <HeaderRow
        items={[e?.can_bo?.ngay_nhap_ngu]}
        align="center"
        // splitBy=";"
      />
    );

    const vao_dang = (
      <HeaderRow
        items={[e?.can_bo?.ngay_vao_dang, e?.can_bo?.ngay_chinh_thuc]}
        align="center"
        // splitBy=";"
      />
    );

    const qua_truong = (
      <HeaderRow
        items={[
          ...e?.can_bo?.qua_trinh_dao_tao.map(
            (element) =>
              `${element?.truong_hoc?.ten_truong}, ${element?.chuyen_nganh?.ten}`
          ),
        ]}
        splitBy=";"
      />
    );

    const trinh_do_giao_duc_pho_thong = (
      <HeaderRow
        items={[e?.can_bo?.trinh_do_giao_duc_pho_thong]}
        splitBy=";"
        align="center"
      />
    );

    const de_nghi_bo_nhiem = (
      <HeaderRow
        items={[e?.chuc_danh_phap_ly?.ten_chuc_danh]}
        splitBy=";"
        align="center"
      />
    );

    const ly_lich_phap_ly = (
      <HeaderRow
        items={[
          ...e?.can_bo?.ly_lich_phap_ly.map(
            (element) =>
              `- ${element?.chuc_danh_phap_ly?.ten_chuc_danh},${element?.don_vi_full_text} ${element?.thoi_gian_bat_dau}`
          ),
        ]}
        splitBy=";"
      />
    );

    let item = {
      ho_va_ten,
      cap_bac,
      chuc_vu,
      nhap_ngu,
      vao_dang,
      qua_truong,
      trinh_do_giao_duc_pho_thong,
      de_nghi_bo_nhiem,
      ly_lich_phap_ly,
      thong_tin_co_ban: {
        ...e,
      },
    };
    arr.push(item);
  });

  return arr;
};

const DanhSachBoNhiem = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { ma_bo_nhiem } = params;

  const { danhSachBoNhiems, isLoading, totalItem, pageNumber, pageSize } =
    useSelector((state) => state.danhSachBoNhiems);

  const [keyword, setKeyword] = useState("");

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handleModal = (_item) => {
    dispatch(danhSachBoNhiemSlice.actions.toggleModal(_item));
  };

  const columns = [
    ...baseColumns,
    {
      title: "",
      key: "tool",
      align: "center",
      render: (text, record) => (
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <DeleteButton
            onConfirm={() => {
              dispatch(
                danhSachBoNhiemSlice.actions.handleDanhSachBoNhiem({
                  item: record?.thong_tin_co_ban,
                  actionName: "DELETE",
                  pageSize: pageSize,
                  ma_bo_nhiem,
                  pageNumber:
                    record?.key === pageSize * (pageNumber - 1) + 1
                      ? Math.max(pageNumber - 1, 1)
                      : pageNumber,
                })
              );
            }}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (params) {
      dispatch(
        danhSachBoNhiemSlice.actions.getDanhSachBoNhiems({
          keyword,
          pageSize: 1000,
          pageNumber: 1,
          ma_bo_nhiem,
        })
      );
    }
  }, [dispatch, keyword]);

  const dataSource = prepareData(danhSachBoNhiems);

  return (
    <ContentWrapper>
      <CustomBreadcrumb items={pageHeader.breadcrumb} />
      <CustomeTable
        header={
          <Header>
            <TextInput
              placeholder={"Nhập vào từ khoá tìm kiếm"}
              onChange={onChangeKeywordInput}
              property={"keyword"}
              width={20}
            />
            <CreateButton onClick={() => handleModal(null)} />
          </Header>
        }
        data={dataSource}
        columns={columns}
        isLoading={isLoading}
        pagination={{
          current: pageNumber,
          pageSize: pageSize,
          total: totalItem,
          //   onChange: handlePaginationChange,
        }}
      />

      <ModalItem />
    </ContentWrapper>
  );
};

export default DanhSachBoNhiem;
