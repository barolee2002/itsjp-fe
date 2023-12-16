import React from "react";
import { Row, message, Col, Button, Table } from "antd";
import { metadata, paymentsPlan } from "../../utils/interface/interface";
import { useDispatch, useSelector } from "react-redux";
import { NoticeType } from "antd/es/message/interface";
import { plan, userLogin } from "../../redux/selector";
import axiosClient from "../../api/axiosClient";
import type { ColumnsType } from "antd/es/table";
import deleteIcon from "../../assets/trash-2.svg";
import editIcon from "../../assets/editRow.svg";
import "./style.scss";
import { updatePlan } from "./planSlice";
const initState = {} as paymentsPlan;

function PaymentPlans() {
  const dispatch = useDispatch();
  const [planHistory, setPlanHistory] = React.useState<paymentsPlan[]>([]);
  const [refesh, setRefesh] = React.useState(0);
  const user = useSelector(userLogin);
  const spendingPlan = useSelector(plan);
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = React.useState(false);
  const [itemDelete, setItemDelete] = React.useState<paymentsPlan>(initState);
  const showModal = () => {
    setOpen(true);
  };

  const [metadata, setMetadata] = React.useState<metadata>({
    totalPages: 0,
    totalElements: 0,
    elements: 0,
  });
  const paymentPlan = useSelector(plan);

  const errorMessage = (typeMess: NoticeType, error: string) => {
    messageApi.open({
      type: `${typeMess}`,
      content: `${error}`,
    });
  };
  const handleOpenEdit = (item: paymentsPlan) => {};

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axiosClient.get(`/plan/${user.id}`);

      dispatch(updatePlan(response.data.data));
      setMetadata({
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        elements: response.data.elements,
      });
    };
    fetchData();
  }, [refesh]);
  const columns: ColumnsType<paymentsPlan> = React.useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        className: "noHover",
        width: 50,
        key: "id",
      },
      {
        title: "名前",
        dataIndex: "name",
        className: "noHover",

        width: 195,
        key: "category",
      },
      {
        title: "カテゴリー",
        dataIndex: "category",
        className: "noHover",

        width: 195,
        key: "category",
      },
      {
        title: "額",
        dataIndex: "amount",
        width: 195,
        className: "noHover",

        key: "amount",
        render: (item: number) => (
          <p className="m-0">¥ {item.toLocaleString()}</p>
        ),
      },
      {
        title: "時間",
        dataIndex: "date",
        className: "noHover",

        width: 195,
        key: "date",
      },

      {
        title: "アクション",
        className: "noHover",
        width: 125,
        key: "id",
        render: (item : paymentsPlan) => (
          <p className="m-0">
            <Button
              onMouseOver={() => {}}
              className={
                item.id % 2 === 0 ? "action-button light" : "action-button dark"
              }
              icon={<img src={editIcon} />}
              onClick={() => handleOpenEdit(item)}
            />
            <Button
              className={
                item.id % 2 === 0 ? "action-button light" : "action-button dark"
              }
              icon={<img src={deleteIcon} />}
              onClick={() => {
                setItemDelete(item);
                showModal();
              }}
            />
          </p>
        ),
      },
    ],
    []
  );
  React.useEffect(() => {
    setPlanHistory(() => {
      return spendingPlan.map((item, index) => {
        return {
          ...item,
          id: index + 1,
          key: item.plannerId,
          plannerId: item.plannerId,
          time: item.time,
          amount: item.amount,
        };
      });
    });
  }, [paymentPlan]);
  const handleAddplan = () => {};
  return (
    <div>
      {contextHolder}
      <Row
        className="page-heading-income"
        style={{ justifyContent: "flex-end" }}
      >
        <Col span={8} style={{ float: "right" }}>
          <Row gutter={[12, 24]} style={{ justifyContent: "space-between" }}>
            <Col className="filter-container" span={12}>
              <Button
                type="primary"
                shape="round"
                className="page-heading-income-button"
              >
                フィルター
              </Button>
            </Col>
            <Col span={12}>
              <Button
                type="primary"
                shape="round"
                className="page-heading-income-button"
                onClick={handleAddplan}
              >
                作成
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Table
          className="table-wrapper"
          dataSource={planHistory}
          columns={columns}
          rowClassName={(record, index) => (index % 2 === 0 ? "dark" : "light")}
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onMouseOver: (e) => {
                e.cancelable = true;
              },
            };
          }}
        />
      </Row>
    </div>
  );
}

export default PaymentPlans;
