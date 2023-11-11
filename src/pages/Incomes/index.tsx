import React from 'react';
import { Table, Pagination, PaginationProps, Row, Button, Col } from 'antd';
import { useNavigate } from 'react-router';
import type { ColumnsType } from 'antd/es/table';
import {
    EditFilled,
    DeleteOutlined
} from '@ant-design/icons';
import './style.scss'
import TableContent from '../../components/Table';
import { incomes } from '../../utils/interface/interface';
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

function Incomes() {
    const navigate = useNavigate()
    const [incomeHistory, setIncomeHistory] = React.useState<incomes[]>([])
    const getFormattedDate = (date: Date) => {
        const month = date.getDate().toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear().toString()
        return `${day}/${month}/${year}`;
    };
    const handleOpenEdit = (item: incomes) => {
        navigate(`${item.key}`)
    }
    const handleDelete = (item: incomes) => {
        console.log(item.key);

    }
    const columns: ColumnsType<incomes> = React.useMemo(() => [
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
            title: 'カテゴリー',
            dataIndex: 'category',
            key: 'category'
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
    const handleShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        console.log(current, pageSize);
    };
    const handleChangePage: PaginationProps['onChange'] = (current, pageSize) => {
        console.log(current);
    }
    const handleAddIncome = () => {
        navigate(`create`)
    }
    React.useEffect(() => {
        setIncomeHistory((prevData: incomes[]) => {
            return data.map((item, index) => {
                let parseDay = new Date(item.date)
                return { ...item, key: item.id, id: index + 1, date: getFormattedDate(parseDay) }
            })
        })
    }, [])
    return (
        <div >
            <Row style={{ height: '64px', justifyContent: 'space-between', alignContent: 'center' }}>
                <Col style={{ fontSize: '28px', fontWeight: 'bold' }}>所得</Col>
                <Col span={8}>
                    <Row gutter={[12, 24]} style={{ justifyContent: 'space-between' }}>
                        <Col span={12}>
                            <Button
                                type='primary'
                                shape='round'
                                size='large'
                                style={{ padding: '0 32px', width: '100%', backgroundColor: '#29A073' }}
                                
                            >フィルター</Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                type='primary'
                                shape='round'
                                size='large'
                                style={{ padding: '0 32px', width: '100%', backgroundColor: '#29A073' }}
                                onClick = {handleAddIncome}
                            >作成</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <TableContent
                dataSource={incomeHistory}
                onEdit={(item: incomes) => handleOpenEdit(item)}
                onDelete={(item: incomes) => handleDelete(item)}
                onChangePage={(current: number, pageSize: number) => handleChangePage}
                onShowSizeChange={(current: number, pageSize: number) => handleShowSizeChange}

            />
        </div>
    )
}

export default Incomes;