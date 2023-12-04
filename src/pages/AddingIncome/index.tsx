import React from 'react';
import { Row, Col, Input, Button, DatePicker } from 'antd';
import {useSelector } from 'react-redux';
import './style.scss'
import { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router';
import axiosClient, { updateAxiosAccessToken } from '../../api/axiosClient';
import { userLogin } from '../../redux/selector';
import { ErrorMessage } from '../../components/ErrorMessage';
function AddingIncome() {
    const navigate = useNavigate()
    const user = useSelector(userLogin)
    updateAxiosAccessToken(user.token)
    const [amount, setAmount] = React.useState(0)
    const [date, setDate] = React.useState('')
    const [checkValidNumber, setCheckNumer] = React.useState(true)
    const [category, setCategory] = React.useState('')
    const handleSetDate = (date: Dayjs | null, dateString: string) => {
        setDate(dateString);
    };
    const handleAddIncome = async() => {
        (amount !== 0 && date !== '' && category !== '') && await axiosClient.post('/income',{
            userId : user.id,
            amount,
            date,
            category
        })
        .then ( () => {
            navigate('/admin/incomes')
        })
        if (!(amount !== 0 && date !== '' && category !== '')) {
            alert ('すべての情報を入力してください')
        }
    }
    return (
        <div>
            <Row className='page-name'>
                収入を追加
            </Row>
            <Row className='content'>
                <Row gutter={[72, 0]} className='full-width'>
                    <Col span={12} className='input-box'>
                        <p className='input-title'>カテゴリー</p>
                        <Input className='input-content' placeholder='??????' onChange={(e) => setCategory(e.target.value)} />
                    </Col>
                    <Col span={12} className='input-box'>
                        <p className='input-title'>額</p>
                        <Input type='number' 
                        className='input-content' 
                        placeholder='$9999' 
                        onChange={(e) => { 
                            setAmount(parseInt(e.target.value)) 
                            parseInt(e.target.value) < 0 ? setCheckNumer(false) : setCheckNumer(true)
                        }} 
                        onFocus={() => setCheckNumer(true)}
                        />
                        {!checkValidNumber && <ErrorMessage errorText='数値を負にすることはできません' />}
                    </Col>
                    <Col span={12} className='input-box'>
                        <p className='input-title'>時間</p>
                        <DatePicker className='input-content' onChange={(date, dateString) => handleSetDate(date, dateString)} placeholder='22/2/2022' />
                    </Col>
                </Row>
            </Row>
                <Button
                    type='primary'
                    shape='round'
                    className='add-button'
                    // size='large'
                   
                    onClick={handleAddIncome}
                >収入を追加</Button>

        </div>
    )
}

export default AddingIncome