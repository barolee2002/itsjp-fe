import React from "react";
import { Row, Button, message } from "antd";
import { useSelector } from "react-redux";
import axiosClient from "../../api/axiosClient";
import { NoticeType } from "antd/es/message/interface";
import { userLogin } from "../../redux/selector";
import { useNavigate } from "react-router";
import { paymentsPlan } from "../../utils/interface/interface";
import { PlanDetail } from "../../components/PlanDetail";
const initState = {} as paymentsPlan;
function CreatePlan() {
  const navigate = useNavigate();
  const user = useSelector(userLogin);
  const [listCategory, setListCategory] = React.useState<string[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [dataPost, setDataPost] = React.useState<paymentsPlan>(initState);
  const errorMessage = (typeMess: NoticeType, error: string) => {
    messageApi.open({
      type: `${typeMess}`,
      content: `${error}`,
    });
  };
  const handleAddPlan = async () => {
    dataPost.amount !== undefined &&
      dataPost.time !== undefined &&
      dataPost.category !== undefined &&
      (await axiosClient
        .post("/plan", {
          ...dataPost,
          userId: user.id,
        })
        .then(() => {
          navigate("/admin/payments-plan");
        })
        .catch((err) => console.log(err)));
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
    const getListCategory = async () => {
      try {
        const response = await axiosClient.get(`plan/${user.id}/category`);
        setListCategory(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getListCategory();
  }, []);
  return (
    <div>
      {contextHolder}
      <Row className="page-heading-detail-name">計画を追加</Row>
      <PlanDetail
        detail={dataPost}
        setDetail={setDataPost}
        categories={listCategory}
      />
      <Button
        type="primary"
        shape="round"
        className="add-button"
        onClick={handleAddPlan}
      >
        支出を追加
      </Button>
    </div>
  );
}

export default CreatePlan;
