import React from 'react';
import { PaginationProps, Row, Button, Col } from 'antd';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getFormattedDate } from '../../utils/dateFormat';
import './style.scss'
import TableContent from '../../components/Table';
import { chartType, incomes, metadata } from '../../utils/interface/interface';
import { income, userLogin } from '../../redux/selector';
import axiosClient, { updateAxiosAccessToken } from '../../api/axiosClient';
import { deleteInome, updateIncomes } from './incomeSlice';

function Incomes() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(userLogin)
    const [refesh, setRefesh] = React.useState(0)
    
    const incomesList = useSelector(income)
    if (user != null) {
        updateAxiosAccessToken(user.token)
    }
    const [metadata, setMetadata] = React.useState<metadata>(
        {
            totalPages: 0,
            totalElements: 0,
            elements: 0,
        }
    )
    const [incomeHistory, setIncomeHistory] = React.useState<chartType[]>([])
    
    const handleOpenEdit = (item: chartType) => {
        navigate(`${item.key}`)
    }
    const handleDelete = (item: chartType) => {
        axiosClient.delete(`/income/${item.key}`)
        dispatch(deleteInome(item.key))

    }
    

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
        const fetchData = async () => {
            const response = await axiosClient.get(`/income/${user.id}`)
            dispatch(updateIncomes(response.data.data))
            setMetadata({
                totalPages: response.data.totalPages,
                totalElements: response.data.totalElements,
                elements: response.data.elements
            })

        }
        fetchData()

    }, [refesh])
    
    React.useEffect(() => {
        setIncomeHistory(() => {
            return incomesList.map((item, index) => {
                let parseDay = new Date(item.time)
                return {
                    ...item,
                    key: item.incomeId,
                    id: index + 1,
                    date: getFormattedDate(parseDay),
                    amount: item.amount,
                    category: item.category
                }
            })
        })
    }, [incomesList])



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
                                onClick={handleAddIncome}
                            >作成</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <TableContent
                dataSource={incomeHistory}
                onEdit={(item: chartType) => handleOpenEdit(item)}
                onDelete={(item: chartType) => handleDelete(item)}
                onChangePage={(current: number, pageSize: number) => handleChangePage(current, pageSize)}
                onShowSizeChange={(current: number, pageSize: number) => handleShowSizeChange(current, pageSize)}
                metadata={metadata}
            />
        </div>
    )
}

export default Incomes;