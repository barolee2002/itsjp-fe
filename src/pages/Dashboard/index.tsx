import React from 'react';
import { Row, Col, Select, Table } from 'antd';
import { Line } from '@ant-design/charts';
import { Pie } from '@ant-design/plots';
import type { ColumnsType } from 'antd/es/table';
import { PieConfig } from '@ant-design/charts'
import {
    WalletOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss'
import axios from 'axios';
import axiosClient, { updateAxiosAccessToken } from '../../api/axiosClient';
import { userLogin } from '../../redux/selector';
import { login } from '../../components/BaseHomePage/authenSlice';


interface chart {
    pay: number,
    date: string,
    type: string,
}
interface history {
    key: number,
    title: string,
    type: string,
    amount: number,
    date: string
}

const chartConfig: PieConfig = {
    appendPadding: 10,
    data: [],
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    color: ['#C8EE44', '#DE6464'],

    label: {
        type: 'inner',
        offset: '-30%',
        content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
        style: {
            fontSize: 20,
            textAlign: 'center',
        },
    },
    legend: {
        layout: 'vertical',
        position: 'bottom',
        style: {
            fontSize: 20,
            textAlign: 'center',
        }
    },
    // legend : false
}
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
export default function Dashboard() {
    const dispatch = useDispatch()
    const [income, setIncome] = React.useState<chartData[]>([])
    const [spending, setSpending] = React.useState<chartData[]>([])
    const [overview, setOverview] = React.useState<overview>({
        incomeTotal: 0,
        spendingTotal: 0,
        savings: 0
    })
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

    const incomeChartConfig = {
        ...chartConfig,
        data: chartDatatype(income),
    }
    const payChartConfig = {
        ...chartConfig,
        data: chartDatatype(spending),
    }



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
                <Col span={12}>
                    <Row className='chart-title'>
                        総合収支
                    </Row>
                    <Pie {...incomeChartConfig} />
                </Col>
                <Col span={12}>
                    <Row className='chart-title'>
                        総支出額
                    </Row>
                    <Pie {...payChartConfig} />
                </Col>
            </Row>
        </div>

    )
}