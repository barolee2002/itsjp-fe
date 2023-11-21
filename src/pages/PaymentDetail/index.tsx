import React from 'react';
import { Row, Col, Input, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useParams } from 'react-router';
import axiosClient from '../../api/axiosClient';
import './style.scss'
import { useNavigate } from 'react-router';
import { Dayjs } from 'dayjs';
import { pays } from '../../utils/interface/interface';
import { useSelector } from 'react-redux';
import { userLogin } from '../../redux/selector';
const initState = {
    spendingId: 0,
    amount: 0,
    time: '',
    userId: 0,
    category: '',
    key: 0

}
function PaymentDetail() {
    const navigate = useNavigate()
    const param = useParams()
    const token = useSelector(userLogin)
    const [spending, setSpending] = React.useState<pays>(initState)
    const handleSetDate = (date: Dayjs | null, dateString: string) => {
        setSpending((prev) => {
            return {
                ...prev,
                time: dateString
            }
        })
    };
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await axiosClient.get(`/spending/detail/${param.id}`)
            setSpending(response.data)
        }
        fetchData()
    }, [param.id])

    const handleAddSpending = async () => {
        const update = axiosClient.put(`spending/${spending.spendingId}`, { ...spending })
        update.then(
            () => {
                alert('update done')
                navigate('/admin/payments')
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
                            setSpending((prev) => {
                                return {
                                    ...prev,
                                    category: e.target.value
                                }
                            })
                        }} value={spending.category} />
                    </Col>
                    <Col span={12} className='input-box'>
                        <p className='input-title'>額</p>
                        <Input type='number' className='input-content' placeholder='$9999' onChange={(e) => {
                            setSpending((prev) => {
                                return {
                                    ...prev,
                                    amount: parseInt(e.target.value)
                                }
                            })
                        }} value={spending.amount} />
                    </Col>
                    <Col span={12} className='input-box'>
                        <p className='input-title'>時間</p>
                        <DatePicker className='input-content' onChange={(date, dateString) => handleSetDate(date, dateString)} placeholder='22/2/2022' value={dayjs(spending.time)} />
                    </Col>
                    
                </Row>
            </Row>
            <Row className='add-button'>
                <Button
                    type='primary'
                    shape='round'
                    size='large'
                    style={{ padding: '0 48px', backgroundColor: '#29A073' }}
                    onClick={handleAddSpending}
                >アップデート</Button>

            </Row>
        </div>
    )
}

export default PaymentDetail