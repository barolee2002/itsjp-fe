import React from 'react';
import { Row, Col, Select, Table } from 'antd';
import { Line } from '@ant-design/charts';
import { Pie } from '@ant-design/plots';
import type { ColumnsType } from 'antd/es/table';
import { PieConfig } from '@ant-design/charts'
import {
    WalletOutlined
} from '@ant-design/icons';

import './style.scss'

const sevenDays = [
    {
        pay: 200,
        date: '2023-10-23T02:11:44Z',
        type: 'IN'
    },
    {
        pay: 40,
        date: '2023-10-22T02:11:44Z',
        type: 'IN'
    },
    {
        pay: 50,
        date: '2023-10-21T02:11:44Z',
        type: 'IN'
    },
    {
        pay: 600,
        date: '2023-10-20T02:11:44Z',
        type: 'IN'
    },
    {
        pay: 70,
        date: '2023-10-19T02:11:44Z',
        type: 'IN'
    },
    {
        pay: 500,
        date: '2023-10-18T02:11:44Z',
        type: 'IN'
    },
    {
        pay: 200,
        date: '2023-10-17T02:11:44Z',
        type: 'IN'
    },
    {
        pay: 20,
        date: '2023-10-23T02:11:44Z',
        type: 'OUT'
    },
    {
        pay: 60,
        date: '2023-10-22T02:11:44Z',
        type: 'OUT'
    },
    {
        pay: 40,
        date: '2023-10-21T02:11:44Z',
        type: 'OUT'
    },
    {
        pay: 80,
        date: '2023-10-20T02:11:44Z',
        type: 'OUT'
    },
    {
        pay: 700,
        date: '2023-10-19T02:11:44Z',
        type: 'OUT'
    },
    {
        pay: 200,
        date: '2023-10-18T02:11:44Z',
        type: 'OUT'
    },
    {
        pay: 400,
        date: '2023-10-17T02:11:44Z',
        type: 'OUT'
    },

]
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
const historyData = [
    {
        title: 'Iphone 13 promax',
        type: 'mobile',
        amount: 2000,
        date: '2023-10-23T02:11:44Z',
    },
    {
        title: 'Iphone 13 promax',
        type: 'mobile',
        amount: 2000,
        date: '2023-10-23T02:11:44Z',
    }, {
        title: 'Iphone 13 promax',
        type: 'mobile',
        amount: 2000,
        date: '2023-10-23T02:11:44Z',
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

export default function Dashboard() {
    const [dayChart, setDayChart] = React.useState(7)
    const [chartData, setChartData] = React.useState<chart[]>([])
    const [historyDatam, setHistpryData] = React.useState<history[]>([])
    const handleChangDay = (value: number) => {
        setDayChart(value)
    }
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

        setChartData((prevChartData: chart[]) => {
            return sevenDays.map((day) => {
                let parseDay = new Date(day.date)
                return { ...day, date: getFormattedDate(parseDay) }
            })
        })
        setHistpryData((prevHistoryData: history[]) => {
            return historyData.map((data, index) => {
                let parseDay = new Date(data.date)
                return { ...data, key: index, date: getHistoryFormattedDate(parseDay) }
            })
        })
    }, [])

    // const chartConfig = {
    //     data: chartData,
    //     xField: 'date',
    //     yField: 'pay',
    //     seriesField: 'type',
    //     smooth: false,
    // }
    const incomeChartConfig = {
        ...chartConfig,
        data: income,
    }
    const payChartConfig = {
        ...chartConfig,
        data: pay,
    }



    return (
        <div style={{ height: '100%' }}>
            <Row style={{ height: '64px', fontWeight: 'bold', alignContent: 'center', fontSize: '28px' }}><p>ダッシュボード</p> </Row>
            <Row gutter={[2, 24]} style={{ justifyContent: 'space-between' }}>
                <Col span={16}>
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
                                        $3000
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
                                        $3000
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
                                        $3000
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {/* <Row style={{ marginTop: '16px' }}>
                        <Row style={{ width: '100%', justifyContent: 'space-between' }}>
                            <Col span={12} style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'center' }}>Working Capital</Col>
                            
                            <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                <Select
                                    labelInValue
                                    defaultValue={{ value: 7, label: '7 days' }}

                                    onChange={(value) => { handleChangDay(value.value) }}
                                    options={[
                                        {
                                            value : 7,
                                            label: '7 days',
                                        },
                                        {
                                            value: 30,
                                            label: '30 days'
                                        },
                                        {
                                            value: 365,
                                            label: '1 year'
                                        }
                                    ]}
                                />

                            </Col>
                        </Row>
                        <Row style={{width : '100%'}}>
                            <Line style={{width :'100%', height :'224px'}} {...chartConfig} />
                        </Row>
                    </Row>
                    <Row style={{ marginTop: '16px' }}>
                        <Table style={{width :'100%'}} dataSource={historyDatam} columns={columns} pagination ={false} size='small'/>
                    </Row> */}
                </Col>
                {/* <Col span={8}>
                    fyhjfgjfgjfgjfg
                </Col> */}

            </Row>
            <Row gutter={[16, 32]} style={{marginTop : '12px'}}>
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