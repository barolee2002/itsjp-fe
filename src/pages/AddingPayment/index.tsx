import React from "react";
import {
  Row,
  Col,
  Input,
  Button,
  DatePicker,
  message,
  InputNumber,
} from "antd";
import { useSelector } from "react-redux";
import axiosClient from "../../api/axiosClient";
import { NoticeType } from "antd/es/message/interface";
import "./style.scss";
import { userLogin } from "../../redux/selector";
import { useNavigate } from "react-router";
import { Dayjs } from "dayjs";
import { ErrorMessage } from "../../components/ErrorMessage";
import { pays } from "../../utils/interface/interface";
import { Detail } from "../../components/IncomeSpendingDetail";
const initState = {} as pays;
function AddingPayment() {
  const navigate = useNavigate();
  const user = useSelector(userLogin);
  const [listCategory, setListCategory] = React.useState<string[]>([])
  const [messageApi, contextHolder] = message.useMessage();
  const [dataPost, setDataPost] = React.useState<pays>(initState);
  const errorMessage = (typeMess: NoticeType, error: string) => {
    messageApi.open({
      type: `${typeMess}`,
      content: `${error}`,
    });
  };
  const handleAddIncome = async () => {
    dataPost.amount !== undefined &&
      dataPost.time !== undefined &&
      dataPost.category !== undefined &&
      (await axiosClient
        .post("/spending", {
          ...dataPost,
          userId: user.id,
        })
        .then(() => {
          navigate("/admin/payments");
        })
        .catch((err) => console.log(err)));
    if (
      !(
        dataPost.amount !== undefined &&
        dataPost.time !== undefined &&
        dataPost.category !== undefined
      )
    ) {
        errorMessage( "error","すべての情報を入力してください");
    }
  };
  React.useEffect(() => {
    const getListCategory = async() => {
        try {
            const response = await axiosClient.get(`plan/${user.id}/category`)
            setListCategory(response.data)
        } catch(err) {
            console.log(err);
            
        }
    }
    getListCategory()
  },[])
  return (
    <div>
      {contextHolder}
      <Row className="page-name">支出を追加</Row>
      <Detail detail={dataPost} setDetail={setDataPost} categories={listCategory}/>
      <Button
        type="primary"
        shape="round"
        className="add-button"
        onClick={handleAddIncome}
      >
        支出を追加
      </Button>
    </div>
  );
}

export default AddingPayment;
