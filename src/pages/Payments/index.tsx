import React from 'react';
import { PaginationProps, Row, Button, Col } from 'antd';

import './style.scss'
import TableContent from '../../components/Table';
import { pays } from '../../utils/interface/interface';
import { useNavigate } from 'react-router';

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

function Payments() {
    const navigate = useNavigate()
    const [incomeHistory, setIncomeHistory] = React.useState<pays[]>([])
    const getFormattedDate = (date: Date) => {
        const month = date.getDate().toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear().toString()
        return `${day}/${month}/${year}`;
    };
    const handleOpenEdit = (item: pays) => {
        navigate(`${item.key}`)

    }
    const handleDelete = (item: pays) => {
        console.log(item.key);

    }

    const handleShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        console.log(current, pageSize);
    };
    const handleChangePage: PaginationProps['onChange'] = (current, pageSize) => {
        console.log(current);
    }
    const handleOpenCreatePayment = () => {
        navigate(`create`)
    }
    React.useEffect(() => {
        setIncomeHistory((prevData: pays[]) => {
            return data.map((item, index) => {
                let parseDay = new Date(item.date)
                return { ...item, key: item.id, id: index + 1, date: getFormattedDate(parseDay) }
            })
        })
    }, [])
    return (
        <div >
            <Row style={{ height: '64px', justifyContent: 'space-between', alignContent: 'center' }}>
                <Col style={{ fontSize: '28px', fontWeight: 'bold' }}>支出</Col>
                <Col span={8}>
                    <Row gutter={[12, 24]} style={{ justifyContent: 'space-between' }}>
                        <Col span={12}>
                            <Button
                                type='primary'
                                shape='round'
                                size='large'
                                style={{ padding: '0 32px', width: '100%', backgroundColor: '#29A073' }}
                            >埋め</Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                type='primary'
                                shape='round'
                                size='large'
                                style={{ padding: '0 32px', width: '100%', backgroundColor: '#29A073' }}
                                onClick={handleOpenCreatePayment}
                            >作成</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <TableContent
                dataSource={incomeHistory}
                onEdit={(item: pays) => handleOpenEdit(item)}
                onDelete={(item: pays) => handleDelete(item)}
                onChangePage={(current: number, pageSize: number) => handleChangePage(current, pageSize)}
                onShowSizeChange={(current: number, pageSize: number) => handleShowSizeChange(current, pageSize)}

            />
        </div>
    )
}

export default Payments;