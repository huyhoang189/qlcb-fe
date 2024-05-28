import { ContentWrapper } from "../../../assets/styles/contentWrapper.style.js";
import CustomeTable from "../../../components/Table/table.jsx";
import { Row, Col} from "antd";
import { Content } from "antd/es/layout/layout.js";
import './index.css'

const QuaTrinhCongTacColumns = [
  {
    title: "STT",
    dataIndex: "key_table",
    key: "key_table",
    width: 10,
    align: "center",
  },

  {
    title: "Thời gian",
    dataIndex: "ho_ten_khai_sinh",
    key: "ho_ten_khai_sinh",
    children:[
        {
            title: "Từ",
            dataIndex: "ho_ten_khai_sinh",
            key: "ho_ten_khai_sinh",
        },
        {
            title: "Đến",
            dataIndex: "ho_ten_khai_sinh",
            key: "ho_ten_khai_sinh",
        }
    ]
  },
  {
    title: "Chức danh, chức vụ, đơn vị công tác (đơn vị quân đội ghi từ cấp c, d, e, f...), số quyết định",
    dataIndex: "so_hieu_quan_nhan",
    key: "so_hieu_quan_nhan",
  },
  {
    title: "Cấp bậc, tháng năm",
    dataIndex: "don_vi",
    key: "don_vi",
    // render: (text, record) => {
    //   return record?.don_vi?.ten_don_vi;
    // },
  },
  {
    title: "Chức vụ Đảng, Đoàn thể",
    dataIndex: "don_vi",
    key: "don_vi",
    // render: (text, record) => {
    //   return record?.don_vi?.ten_don_vi;
    // },
  },
];

const QuaTrinhCongTac = () => {

  return (
    <Row
    style={{ width: "100%", padding: '0 48px'}}
    >
    <div style={{ width: "100%", textAlign:"center"}}>
    <span className="header" style={{fontSize:"16px"}}>III. TÌNH HÌNH KT – CT CỦA GIA ĐÌNH VỢ, VỢ (CHỒNG)</span>
    </div>
    <div className="info" style={{ width: "100%" }}>
    <ContentWrapper>
      <CustomeTable
        columns={QuaTrinhCongTacColumns}
        pagination={false}
      />
    </ContentWrapper>
    </div>
    </Row>
  );
};

export default QuaTrinhCongTac;
