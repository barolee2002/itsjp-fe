import React from "react";
import { Row, message, Col, Button, Table, Modal } from "antd";
import { metadata, paymentsPlan } from "../../utils/interface/interface";
import { useDispatch, useSelector } from "react-redux";
import { NoticeType } from "antd/es/message/interface";
import { plan, userLogin } from "../../redux/selector";
import axiosClient from "../../api/axiosClient";
import type { ColumnsType } from "antd/es/table";
import deleteIcon from "../../assets/trash-2.svg";
import { useNavigate } from "react-router";
import editIcon from "../../assets/editRow.svg";
import "./style.scss";
import { deleteItemPlan, updatePlan } from "./planSlice";
import {
  changeDateFormat,
  getFormattedDate,
  oneMonthFromDate,
} from "../../utils/dateFormat";
const initState = {} as paymentsPlan;

function PaymentPlans() {
  const navigate = useNavigate();
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
  const handleCancel = () => {
    setOpen(false);
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
  const handleOpenEdit = (item: paymentsPlan) => {
    navigate(`${item.plannerId}`);
  };
  const handleDelete = () => {
    axiosClient.delete(`plan/${itemDelete.plannerId}`);
    dispatch(deleteItemPlan(itemDelete.key));
  };
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

        width: 160,
        key: "category",
      },
      {
        title: "カテゴリー",
        dataIndex: "category",
        className: "noHover",

        width: 160,
        key: "category",
      },
      {
        title: "額",
        dataIndex: "amount",
        width: 160,
        className: "noHover",

        key: "amount",
        render: (item: number) => (
          <p className="m-0">¥ {item.toLocaleString()}</p>
        ),
      },
      {
        title: "残る",
        dataIndex: "spentMoney",
        width: 160,
        className: "noHover",

        key: "amount",
        render: (item: number) => (
          <p className="m-0">¥ {item.toLocaleString()}</p>
        ),
      },
      {
        title: "時間",
        dataIndex: "time",
        className: "noHover",

        width: 160,
        key: "time",
      },

      {
        title: "アクション",
        className: "noHover",
        width: 125,
        key: "id",
        render: (item: paymentsPlan) => (
          <p className="m-0">
            <Button
              onMouseOver={() => {}}
              className={
                item.id % 2 === 0 ? "action-button light" : "action-button dark"
              }
              icon={<img className="button-icon" src={editIcon} alt="icon" />}
              onClick={() => handleOpenEdit(item)}
            />
            <Button
              className={
                item.id % 2 === 0 ? "action-button light" : "action-button dark"
              }
              icon={<img className="button-icon" src={deleteIcon} alt="icon" />}
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
    const fetchDataForItem = async (item: paymentsPlan) => {
      const fromDate = item.time;
      const toDate = changeDateFormat(oneMonthFromDate(item.time));

      const response = await axiosClient.get(`spending/${user.id}`, {
        params: {
          fromDate: fromDate,
          toDate: toDate,
          category: item.category,
        },
      });

      let totalMoney = 0;
      response.data.data?.map((planItem: paymentsPlan) => {
        totalMoney += planItem.amount;
      });

      console.log(totalMoney);
      return totalMoney;
    };

    const updatePlanHistory = async () => {
      const updatedPlanHistory = await Promise.all(
        spendingPlan.map(async (item, index) => {
          const newDate = new Date(item.time);
          const spentMoney = await fetchDataForItem(item);

          return {
            ...item,
            id: index + 1,
            key: item.plannerId,
            spentMoney: spentMoney,
            plannerId: item.plannerId,
            time: getFormattedDate(newDate),
            amount: item.amount,
          };
        })
      );

      setPlanHistory(updatedPlanHistory);
    };

    updatePlanHistory();
  }, [paymentPlan]);

  const handleAddplan = () => {
    navigate("create");
  };
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
      <Modal
        open={open}
        // onOk={() => {
        //   handleDelete();
        //   handleCancel();
        // }}
        // onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <div className="modal-footer">
            <button
              className="delete-btn"
              onClick={() => {
                handleDelete();
                handleCancel();
              }}
            >
              削除
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              キャンセル
            </button>
          </div>
        )}
      >
        <p>消去してもよろしいですか？</p>
      </Modal>
    </div>
  );
}

export default PaymentPlans;
