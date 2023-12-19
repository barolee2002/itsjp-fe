import React from "react";
import {
  Row,
  Button,
  message,
} from "antd";
import { useParams } from "react-router";
import axiosClient from "../../api/axiosClient";
import { useNavigate } from "react-router";
import { NoticeType } from "antd/es/message/interface";
import { paymentsPlan, pays } from "../../utils/interface/interface";
import { useSelector } from "react-redux";
import { userLogin } from "../../redux/selector";
import { PlanDetail } from "../../components/PlanDetail";
const initState = {} as paymentsPlan
function PaymentPlanDetail() {
  const navigate = useNavigate();
  const param = useParams();
  const user = useSelector(userLogin)
  const [messageApi, contextHolder] = message.useMessage();
  const [listCategory, setListCategory] = React.useState<string[]>([])
  const [plan, setPlan] = React.useState<paymentsPlan>(initState);
  const errorMessage = (typeMess: NoticeType, error: string) => {
    messageApi.open({
      type: `${typeMess}`,
      content: `${error}`,
    });
  };
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axiosClient.get(`/plan/detail/${param.id}`);
      setPlan(response.data);
    };
    fetchData();
  }, [param.id]);

  const handleUpdatePlan = async () => {
    const update = axiosClient.put(`plan/${plan.plannerId}`, {
      ...plan,
    });
    update.then(() => {
      errorMessage("success", "更新成功");
      navigate("/admin/payments-plan");
    });
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
      <Row className="page-heading-detail-name">計画を追加</Row>
      <PlanDetail detail={plan} setDetail={setPlan} categories={listCategory} />
      <Button
        type="primary"
        shape="round"
        className="add-button"
        onClick={handleUpdatePlan}
      >
        アップデート
      </Button>
    </div>
  );
}

export default PaymentPlanDetail;
