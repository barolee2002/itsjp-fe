import React from "react";
import { Row, Col, Input, Button, DatePicker, message,InputNumber } from "antd";
import { useParams } from "react-router";
import "./style.scss";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

import axiosClient from "../../api/axiosClient";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { NoticeType } from "antd/es/message/interface";
import { userLogin } from "../../redux/selector";
import { incomes } from "../../utils/interface/interface";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Detail } from "../../components/IncomeSpendingDetail";
const initState = {
  incomeId: 0,
  name: "",
  amount: 0,
  time: "",
  userId: 0,
  category: "",
  key: 0,
};
function IncomeDetail() {
  const navigate = useNavigate();
  const param = useParams();
  const user = useSelector(userLogin);
  const [messageApi, contextHolder] = message.useMessage();
  const [listCategory, setListCategory] = React.useState<string[]>([])
  const [income, setIncome] = React.useState<incomes>(initState);
  const errorMessage = (typeMess: NoticeType, error: string) => {
    messageApi.open({
      type: `${typeMess}`,
      content: `${error}`,
    });
  };
  const handleSetDate = (date: Dayjs | null, dateString: string) => {
    setIncome((prev) => {
      return {
        ...prev,
        time: dateString,
      };
    });
  };
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axiosClient.get(`/income/detail/${param.id}`);
      setIncome(response.data);
    };
    fetchData();
  }, [param.id]);

  const handleAddIncome = async () => {
    console.log(income);
    
    const update = axiosClient.put(`income/${income.incomeId}`, { ...income });
    update.then(() => {
      errorMessage("success", "更新成功");
      navigate("/admin/incomes");
    });
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
      <Row className="page-name">収入を編集</Row>
      <Detail detail={income} setDetail={setIncome} categories={listCategory}/>
      <Button
        type="primary"
        shape="round"
        className="add-button"
        onClick={handleAddIncome}
      >
        アップデート
      </Button>
    </div>
  );
}

export default IncomeDetail;
