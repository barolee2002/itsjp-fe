import React from 'react';
import { Row, Col, Input, Button, DatePicker } from 'antd';
import { useParams } from 'react-router';
import './style.scss'
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import axiosClient, { updateAxiosAccessToken } from '../../api/axiosClient';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { userLogin } from '../../redux/selector';
import { incomes } from '../../utils/interface/interface';
const initState = {
    incomeId: 0,
    amount: 0,
    time: '',
    userId: 0,
    category: '',
    key: 0

}
function IncomeDetail() {
    const navigate = useNavigate()
    const param = useParams()
    const token = useSelector(userLogin)
    updateAxiosAccessToken(token.token)
    const [checkValidNumber, setCheckNumer] = React.useState(true)
    const [income, setIncome] = React.useState<incomes>(initState)
    const handleSetDate = (date: Dayjs | null, dateString: string) => {
        setIncome((prev) => {
            return {
                ...prev,
                time: dateString
            }
        })
    };
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await axiosClient.get(`/income/detail/${param.id}`)
            setIncome(response.data)
        }
        fetchData()
    }, [param.id])

    const handleAddIncome = async () => {
        const update = axiosClient.put(`income/${income.incomeId}`, { ...income })
        update.then(
            () => {
                alert('update done')
                navigate('/admin/incomes')

            }
        )
    }
    return (
        <div>
            <Row className='topic'>
                収入を編集
            </Row>
            <Row className='content'>
                <Row gutter={[72, 0]} className='full-width'>
                    <Col span={12} className='input-box'>
                        <p className='input-title'>カテゴリー</p>
                        <Input className='input-content' placeholder='給料' onChange={(e) => {
                            setIncome((prev) => {
                                return {
                                    ...prev,
                                    category: e.target.value
                                }
                            })
                        }} value={income.category} />
                    </Col>
                    <Col span={12} className='input-box'>
                        <p className='input-title'>額</p>
                        <Input
                            type='number'
                            className='input-content'
                            placeholder='$9999'
                            onChange={(e) => {
                                parseInt(e.target.value) < 0 ? setCheckNumer(false) : setCheckNumer(true)

                                setIncome((prev) => {
                                    return {
                                        ...prev,
                                        amount: parseInt(e.target.value)
                                    }
                                })
                            }} 
                            
                            value={income.amount} />
                    </Col>
                    <Col span={12} className='input-box'>
                        <p className='input-title'>時間</p>
                        <DatePicker className='input-content' onChange={(date, dateString) => handleSetDate(date, dateString)} placeholder='22/2/2022' value={dayjs(income.time)} />
                    </Col>

                </Row>
            </Row>
            <Row className='add-button'>
                <Button
                    type='primary'
                    shape='round'
                    size='large'
                    style={{ padding: '0 48px', backgroundColor: '#29A073' }}
                    onClick={handleAddIncome}
                >アップデート</Button>

            </Row>
        </div>
    )
}

export default IncomeDetail