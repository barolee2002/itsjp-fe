import React from 'react';
import { Row, Col, Select, Table } from 'antd';
import { Line } from '@ant-design/charts';
import { Pie } from '@ant-design/plots';
import type { ColumnsType } from 'antd/es/table';
import { PieConfig } from '@ant-design/charts'
import {
    WalletOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import './style.scss'
import axios from 'axios';
import axiosClient, { updateAxiosAccessToken } from '../../api/axiosClient';
import { userLogin } from '../../redux/selector';

const income = [
    {
        type: '給料',
        value: 55
    },
    {
        type: '奨学金',
        value: 45
    },
]
const pay = [
    {
        type: '家のお金',
        value: 75
    },
    {
        type: '学費',
        value: 25
    }
]

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
const columns: ColumnsType<history> = [
    {
        title: 'BUSINESS',
        dataIndex: 'title',
        key: 'name',
        render: (text: string) => <p style={{ fontWeight: 'bold' }}>{text}</p>

    },
    {
        title: 'TYPE',
        dataIndex: 'type',
        key: 'type'
    },
    {
        title: 'AMOUNT',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount: number) => <p style={{ fontWeight: 'bold' }}>$ {amount}</p>
    },
    {
        title: 'DATE',
        dataIndex: 'date',
        key: 'date'
    }
]

const chartConfig: PieConfig = {
    // appendPadding: 10,
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

const getTotal = (array : chartData[]) => {
    let total : number = 0
    array.map((item) => {
        total += item.amount
    })
    return total
}
const chartDatatype = (array : chartData[]) => {
    return array.map((item) => {
        return {
            type : item.category,
            value : item.amount / getTotal(array)
        }
    })
}
export default function Dashboard() {
    const [income, setIncome] = React.useState<chartData[]>([])
    const [spending, setSpending] = React.useState<chartData[]>([])
    const [overview, setOverview] = React.useState<overview>({
        incomeTotal: 0,
        spendingTotal: 0,
        savings: 0
    })
    const user = useSelector(userLogin)
    updateAxiosAccessToken(user.token)
    
    const getFormattedDate = (date: Date) => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()];
        const day = date.getDate().toString().padStart(2, '0');
        return `${month} ${day}`;
    };
    const getHistoryFormattedDate = (date: Date) => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()];
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear().toString()
        return `${month} ${day} ${year}`;
    };

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
    console.log(overview);
    
    console.log(chartDatatype(income));
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
            <Row style={{ height: '64px', fontWeight: 'bold', alignContent: 'center', fontSize: '28px' }}><p>ダッシュボード</p> </Row>
            <Row gutter={[2, 24]} style={{ justifyContent: 'space-between' }}>
                <Col span={20}>
                    <Row gutter={[16, 24]}>
                        <Col className='Statistics-box' span={8}>
                            <Row className='Statistics-content' style={{ backgroundColor: '#ddd' }}>
                                <Col style={{ borderRadius: '50%', backgroundColor: '#ccc', padding: '8px' }}>
                                    <WalletOutlined className='Statistics-icon' />
                                </Col>
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
                            <Row className='Statistics-content' style={{ backgroundColor: '#ddd' }}>
                                <Col style={{ borderRadius: '50%', backgroundColor: '#ccc', padding: '8px' }}>
                                    <WalletOutlined className='Statistics-icon' />
                                </Col>
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
                            <Row className='Statistics-content' style={{ backgroundColor: '#ddd' }}>
                                <Col style={{ borderRadius: '50%', backgroundColor: '#ccc', padding: '8px' }}>
                                    <WalletOutlined className='Statistics-icon' />
                                </Col>
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