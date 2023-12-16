import React from 'react';
import { Row, Col, Select, Table } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import './style.scss'
import axiosClient from '../../api/axiosClient';
import { userLogin } from '../../redux/selector';



interface overview {
    incomeTotal: number,
    spendingTotal: number,
    savings: number
}
interface chartData {
    amount: number,
    category: string
}

const getTotal = (array: chartData[]) => {
    let total: number = 0
    array.map((item) => {
        total += item.amount
    })
    return total
}
const chartDatatype = (array: chartData[]) => {
    return array.map((item) => {
        return {
            type: item.category,
            value: item.amount / getTotal(array)
        }
    })
}
const generateColors = (numCategories: number) => {
    const colors = ['#C8EE44', '#DE6464'];
    for (let i = 0; i < numCategories; i++) {
        // You can use a more sophisticated color generation logic here
        colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }
    return colors;
};
export default function Dashboard() {
    const [income, setIncome] = React.useState<chartData[]>([])
    const [spending, setSpending] = React.useState<chartData[]>([])
    const [overview, setOverview] = React.useState<overview>({
        incomeTotal: 0,
        spendingTotal: 0,
        savings: 0
    })
    const incomeColor = generateColors(income.length + 1)
    const paymentColor = generateColors(spending.length + 1)
    const user = useSelector(userLogin)

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`/user/statistic/${user.id}`)
                setOverview(response.data)
                const incomeResponse = await axiosClient.get(`/income/${user.id}/statistic`)
                setIncome(incomeResponse.data)
                const spendingResponse = await axiosClient.get(`/spending/${user.id}/statistic`)
                setSpending(spendingResponse.data)
            } catch (err) {
                console.log(err);

            }
        }
        fetchData()
    }, [])

  
    return (
        <div style={{ height: '100%' }}>
            <Row className='page-heading'><p className='page-name'>ダッシュボード</p> </Row>
            <Row gutter={[0, 24]} className='statistics-wrapper' style={{ justifyContent: 'space-between' }}>
                <Col span={16}>
                    <Row gutter={[40, 24]}>
                        <Col className='Statistics-box' span={8}>
                            <Row className='Statistics-content' >

                                <Col style={{ marginLeft: '8px' }}>
                                    <Row className='Statistics-title'>
                                        総合収支
                                    </Row>
                                    <Row className='Statistics-money'>
                                        ${overview?.incomeTotal}
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='Statistics-box' span={8}>
                            <Row className='Statistics-content' >

                                <Col style={{ marginLeft: '8px' }}>
                                    <Row className='Statistics-title'>
                                        総支出額
                                    </Row>
                                    <Row className='Statistics-money'>
                                        ${overview?.spendingTotal}
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='Statistics-box' span={8}>
                            <Row className='Statistics-content' >

                                <Col style={{ marginLeft: '8px' }}>
                                    <Row className='Statistics-title'>
                                        合計節約
                                    </Row>
                                    <Row className='Statistics-money'>
                                        ${overview?.savings}
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>

            </Row>
            <Row gutter={[16, 32]} style={{ marginTop: '12px' }}>
                <Col span={12} className='chart-item'>
                    <Row className='chart-title'>
                        総合収支
                    </Row>
                    
                    <div className="sub-title">
                        {income.map((item, index) => (
                            <Row key={index} className='sub-title-item'>
                                <div className="color m-0" style={{ width: '28px', height: '16px', backgroundColor: `${incomeColor[index]}` }}>
                                </div>
                                <div className="name m-0">{item.category}</div>
                            </Row>
                        ))}
                    </div>
                </Col>
                <Col span={12}>
                    <Row className='chart-title'>
                        総支出額
                    </Row>
                    <div className="sub-title">
                        {spending.map((item, index) => (
                            <Row key={index} className='sub-title-item'>
                                <div className="color m-0" style={{ width: '28px', height: '16px', backgroundColor: `${paymentColor[index]}` }}>
                                </div>
                                <div className="name m-0">{item.category}</div>
                            </Row>
                        ))}
                    </div>
                </Col>
            </Row>
        </div>

    )
}