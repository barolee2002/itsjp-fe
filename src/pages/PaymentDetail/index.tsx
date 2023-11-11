import React from 'react';
import { Row, Col, Input, Button, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import { useParams } from 'react-router';
import './style.scss'
import { Dayjs } from 'dayjs';
function PaymentDetail() {
    const param = useParams()
    const [name, setName] = React.useState('')
    const [amount, setAmount] = React.useState(0)
    const [date, setDate] = React.useState('')
    const [category, setCategory] = React.useState('')
    const handleSetDate = (date: Dayjs | null, dateString: string) => {
        setDate(dateString);
    };
    const handleAddIncome = () => {

    }
    return (
        <div>
            <Row className='topic'>
                収入を編集
            </Row>
            <Row className='content'>
                <Row gutter={[72, 0]} className='full-width'>
                    <Col span={12} className='input-box'>
                        <p className='input-title'>名前</p>
                        <Input className='input-content' placeholder='給料' onChange={(e) => { setName(e.target.value) }} />
                    </Col>
                    <Col span={12} className='input-box'>
                        <p className='input-title'>額</p>
                        <Input type='number' className='input-content' placeholder='$9999' onChange={(e) => { setAmount(parseInt(e.target.value)) }} />
                    </Col>
                    <Col span={12} className='input-box'>
                        <p className='input-title'>時間</p>
                        <DatePicker className='input-content' onChange={(date, dateString) => handleSetDate(date, dateString)} placeholder='22/2/2022' />
                    </Col>
                    <Col span={12} className='input-box'>
                        <p className='input-title'>カテゴリー</p>
                        <Input className='input-content' placeholder='??????' onChange={(e) => setCategory(e.target.value)} />
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

export default PaymentDetail