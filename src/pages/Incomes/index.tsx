import React from 'react';
import { PaginationProps, Row, Button, Col, Input } from 'antd';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getFormattedDate } from '../../utils/dateFormat';
import './style.scss'
import TableContent from '../../components/Table';
import { chartType, metadata } from '../../utils/interface/interface';
import { income, userLogin } from '../../redux/selector';
import axiosClient from '../../api/axiosClient';
import { deleteInome, updateIncomes } from './incomeSlice';

function Incomes() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [refesh, setRefesh] = React.useState(0)
    const incomesList = useSelector(income)
    const [openfilter, setOpenFilter] = React.useState(false)
    const user = useSelector(userLogin)
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
                console.log(getFormattedDate(parseDay));
                
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
            <Row className='page-heading-income'>
                <Col className='page-heading-income-name'>所得</Col>
                <Col span={8}>
                    <Row gutter={[12, 24]} style={{ justifyContent: 'space-between' }}>
                        
                        <Col span={12} offset={12}>
                            <Button
                                type='primary'
                                shape='round'
                                className='page-heading-income-button'
                                // size='large'
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