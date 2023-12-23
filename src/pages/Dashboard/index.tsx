import React from "react";
import { Row, Col, Select, Table } from "antd";

import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import axiosClient from "../../api/axiosClient";
import { DefaultizedPieValueType } from "@mui/x-charts";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { userLogin } from "../../redux/selector";
import { chartType } from "../../utils/interface/interface";

interface overview {
  incomeTotal: number;
  spendingTotal: number;
  savings: number;
}
interface chartData {
  amount: number;
  category: string;
}
interface formatData {
  label: string;
  value: number;
}
const colors = ["#F7BF5A", "#5C98FB", "#C8EE44"];
const getTotal = (array: chartData[]) => {
  let total: number = 0;
  array.map((item) => {
    total += item.amount;
  });
  return total;
};
const chartDatatype = (array: chartData[]) => {
  const sortArray = array.sort((a, b) => b.amount - a.amount);
  if (sortArray.length > 2) {
    return [
      sortArray[0],
      sortArray[1],
      {
        amount: getTotal(sortArray) - sortArray[0].amount - sortArray[1].amount,
        category: "他のタイプ",
      },
    ];
  } else {
    return sortArray;
  }
};

const sizing = {
  margin: { right: 5 },
  legend: { hidden: true },
};
const getFormatData = (array: chartData[]) => {
  return array?.map((item) => {
    return {
      label: item.category,
      value: item.amount,
    };
  });
};

export default function Dashboard() {
  const [income, setIncome] = React.useState<chartData[]>([]);
  const [spending, setSpending] = React.useState<chartData[]>([]);
  const [incomeData, setIncomeData] = React.useState<formatData[]>([]);
  const [spendingData, setSpendingData] = React.useState<formatData[]>([]);

  const [overview, setOverview] = React.useState<overview>({
    incomeTotal: 0,
    spendingTotal: 0,
    savings: 0,
  });
  const [outerRadius, setOuterRadius] = React.useState(150); // Default outerRadius

  
  const user = useSelector(userLogin);

  React.useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/user/statistic/${user.id}`);
        setOverview(response.data);
        const incomeResponse = await axiosClient.get(
          `/income/${user.id}/statistic`
        );
        setIncome(incomeResponse.data);
        const spendingResponse = await axiosClient.get(
          `/spending/${user.id}/statistic`
        );
        console.log(spendingResponse);
        
        setSpending(spendingResponse.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  React.useEffect (() => {
    console.log(window.innerHeight);
    
    if(window.innerHeight < 800) {
        setOuterRadius(125)
    } else {
        setOuterRadius(170)
    }
  },[window.innerHeight])
  const getArcLabelIncome = (params: DefaultizedPieValueType) => {
    const percent = params.value / getTotal(income);
    return `${(percent * 100).toFixed(0)}%`;
  };
  const getArcLabelSpending = (params: DefaultizedPieValueType) => {
    const percent = params.value / getTotal(spending);
    return `${(percent * 100).toFixed(0)}%`;
  };
  React.useEffect(() => {
    if (income !== undefined) {
      const chart = chartDatatype(income);
      if (chart !== undefined) {
        setIncomeData(getFormatData(chart));
      }
    }
    if (spending !== undefined) {
      const chart = chartDatatype(spending);
      if (chart !== undefined) {
        setSpendingData(getFormatData(chart));
      }
    }
  }, [income, spending]);
  
  return (
    <div className="dashboard" style={{ height: "100%" }}>
      <Row className="page-heading">
        <p className="page-name">ダッシュボード</p>{" "}
      </Row>

      <Col span={20}>
        <Row className="Statistics-wrapper">
          <Col className="Statistics-box">
            <Row className="Statistics-content">
              <Col style={{ marginLeft: "8px" }}>
                <Row className="Statistics-title">収入合計</Row>
                <Row className="Statistics-money">
                  ¥ {overview?.incomeTotal.toLocaleString()}
                </Row>
              </Col>
            </Row>
          </Col>
          <Col className="Statistics-box">
            <Row className="Statistics-content">
              <Col style={{ marginLeft: "8px" }}>
                <Row className="Statistics-title">支出合計</Row>
                <Row className="Statistics-money">
                  ¥ {overview?.spendingTotal.toLocaleString()}
                </Row>
              </Col>
            </Row>
          </Col>
          <Col className="Statistics-box">
            <Row className="Statistics-content">
              <Col style={{ marginLeft: "8px" }}>
                <Row className="Statistics-title">収支合計</Row>
                <Row className="Statistics-money">
                  ¥ {overview?.savings.toLocaleString()}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Row gutter={[16, 32]} className="chart-wrapper">
        <Col span={12} className="chart-item">
          <Row className="chart-title">収入分析</Row>
          <PieChart
            colors={colors}
            series={[
              {
                data: incomeData,
                outerRadius: outerRadius,
                arcLabel: getArcLabelIncome,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "dark",
                fontSize: 14,
              },
            }}
            className="chart-content"
            {...sizing}
          />
          <div className="sub-title">
            {incomeData.map((item, index) => (
              <Row key={index} className="sub-title-item">
                <div
                  className="color m-0"
                  style={{
                    width: "28px",
                    height: "16px",
                    backgroundColor: `${colors[index]}`,
                  }}
                ></div>
                <div className="name m-0">{item.label}</div>
              </Row>
            ))}
          </div>
        </Col>
        <Col span={12} className="chart-item">
          <Row className="chart-title">支出分析</Row>
          <PieChart
            colors={colors}
            series={[
              {
                arcLabel: getArcLabelSpending,
                data: spendingData,
                outerRadius: outerRadius,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "dark",
                fontSize: 14,
              },
            }}
            className="chart-content"
            {...sizing}
          />
          <div className="sub-title">
            {spendingData.map((item, index) => (
              <Row key={index} className="sub-title-item">
                <div
                  className="color m-0"
                  style={{
                    width: "28px",
                    height: "16px",
                    backgroundColor: `${colors[index]}`,
                  }}
                ></div>
                <div className="name m-0">{item.label}</div>
              </Row>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
