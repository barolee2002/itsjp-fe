import React from 'react';
import Tabs from '../../components/Tabs';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router';
import { Row, Col, Button } from 'antd';
import {
    EditFilled,
    DeleteOutlined
} from '@ant-design/icons';
import './style.scss'
import { paymentsPlan } from '../../utils/interface/interface';
const data = [
    {
        id: 1,
        name: "John Doe",
        amount: 100.0,
        date: "2023-10-23",
        category: "Groceries",
    },
    {
        id: 2,
        name: "Alice Smith",
        amount: 50.0,
        date: "2023-10-22",
        category: "Utilities",
    },
    {
        id: 3,
        name: "Bob Johnson",
        amount: 75.0,
        date: "2023-10-21",
        category: "Entertainment",
    },
    // ... (repeat similar structure for more items)
    {
        id: 20,
        name: "Eva Brown",
        amount: 120.0,
        date: "2023-10-04",
        category: "Dining",
    }
]
function PaymentPlans() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = React.useState('week')

    const handleClick = (activeTab: string) => {
        setActiveTab(activeTab);
    }
    const handleOpenEdit = (item: paymentsPlan) => {
        navigate(`${item.key}`)
    }
    const handleDelete = (item: paymentsPlan) => {
        console.log(item.key);

    }
    const columns: ColumnsType<paymentsPlan> = React.useMemo(() => [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '名前',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '額',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: '時間',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'アクション',
            key: 'id',
            render: (item) => <p>
                <Button icon={<EditFilled />} onClick={() => handleOpenEdit(item)} />
                <Button icon={<DeleteOutlined />} onClick={() => handleDelete(item)} />
            </p>
        },

    ], [])
    return (
        <div>
            <Row className='topbar' style={{ height: '64px', justifyContent: 'space-between' }}>
                <Col className='tabs' style={{ display: 'flex' }} span={6}>
                    <Tabs activeTab={activeTab} onClick={(activeTab) => handleClick(activeTab)} />
                </Col>
                <Col span={5}>
                    <Row style={{height :'100%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button size='large' className='top-button'>
                            フィルター
                        </Button>
                        <Button size='large' className='top-button'>
                            作成
                        </Button>
                    </Row>
                </Col>
            </Row>
            <Row>

            </Row>
        </div>
    )
}

export default PaymentPlans