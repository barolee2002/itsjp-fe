import React from 'react';
import { Row, Col, Input, Button, DatePicker } from 'antd';
import {useSelector } from 'react-redux';
import axiosClient, { updateAxiosAccessToken } from '../../api/axiosClient';
import './style.scss'
import { userLogin } from '../../redux/selector';
import { useNavigate } from 'react-router';
import { Dayjs } from 'dayjs';
function AddingPayment() {
    const navigate = useNavigate()
    const user = useSelector(userLogin)
    updateAxiosAccessToken(user.token)
    const [amount, setAmount] = React.useState(0)
    const [date, setDate] = React.useState('')
    const [category, setCategory] = React.useState('')
    const handleSetDate = (date: Dayjs | null, dateString: string) => {
        setDate(dateString);
    };
    const handleAddIncome = async() => {
        await axiosClient.post('/spending',{
            userId : user.id,
            amount,
            date,
            category
        })
        .then(() => {
            navigate('/admin/payments')
        })
        .catch((err) => alert(err))
    }
    return (
        <div>
            <Row className='topic'>
                支出を追加
            </Row>
            <Row className='content'>
                <Row gutter={[72, 0]} className='full-width'>
                    <Col span={12} className='input-box'>
                        <p className='input-title'>カテゴリー</p>
                        <Input className='input-content' placeholder='??????' onChange={(e) => setCategory(e.target.value)} />
                    </Col>
                    <Col span={12} className='input-box'>
                        <p className='input-title'>額</p>
                        <Input type='number' className='input-content' placeholder='$9999' onChange={(e) => { setAmount(parseInt(e.target.value)) }} />
                    </Col>
                    <Col span={12} className='input-box'>
                        <p className='input-title'>時間</p>
                        <DatePicker className='input-content' onChange={(date, dateString) => handleSetDate(date, dateString)} placeholder='22/2/2022' />
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
                >支出を追加</Button>

            </Row>
        </div>
    )
}

export default AddingPayment