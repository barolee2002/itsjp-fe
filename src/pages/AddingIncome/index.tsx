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
import "./style.scss";
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router";
import axiosClient from "../../api/axiosClient";
import { NoticeType } from "antd/es/message/interface";
import { userLogin } from "../../redux/selector";
import { ErrorMessage } from "../../components/ErrorMessage";
import { incomes } from "../../utils/interface/interface";
import { Detail } from "../../components/IncomeSpendingDetail";
const initState = {} as incomes;

function AddingIncome() {
  const navigate = useNavigate();
  const user = useSelector(userLogin);
  const [dataPost, setDataPost] = React.useState<incomes>(initState);
  const [listCategory, setListCategory] = React.useState<string[]>([])
  const [messageApi, contextHolder] = message.useMessage();
  const errorMessage = (typeMess: NoticeType, error: string) => {
    messageApi.open({
      type: `${typeMess}`,
      content: `${error}`,
    });
  };
  const handleAddIncome = async () => {
    console.log(dataPost);
    
    dataPost.amount !== undefined &&
      dataPost.time !== undefined &&
      dataPost.category !== undefined &&
      (await axiosClient
        .post("/income", {
          ...dataPost,
          userId: user.id,
        })
        .then(() => {
          navigate("/admin/incomes");
        }));
    if (
      !(
        dataPost.amount !== undefined &&
        dataPost.time !== undefined &&
        dataPost.category !== undefined
      )
    ) {
      errorMessage("error", "すべての情報を入力してください");
    }
  };

  React.useEffect(() => {
    const getListCategory = async() => {
        try {
            const response = await axiosClient.get(`income/${user.id}/category`)
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
      <Row className="page-heading-detail-name">収入を追加</Row>
      <Detail detail={dataPost} setDetail={setDataPost} categories={listCategory}/>
      <Button
        type="primary"
        shape="round"
        className="add-button"
        // size='large'

        onClick={handleAddIncome}
      >
        収入を追加
      </Button>
    </div>
  );
}

export default AddingIncome;
