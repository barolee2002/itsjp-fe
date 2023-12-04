import React from 'react';
import { useNavigate } from 'react-router';
import { Row, message, Col, Button, Modal, Input, DatePicker } from 'antd';
import {
    CheckOutlined
} from '@ant-design/icons';
import { metadata, paymentsPlan } from '../../utils/interface/interface';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { NoticeType } from 'antd/es/message/interface';
import { plan, userLogin } from '../../redux/selector';
import axiosClient, { updateAxiosAccessToken } from '../../api/axiosClient';
import { deleteItemPlan, updatePlan } from './planSlice';
import { getFormattedDate } from '../../utils/dateFormat';
import deleteIcon from '../../assets/trash-2.svg'
import editIcon from '../../assets/editRow.svg'
import './style.scss'
const initState = {
    plannerId: 0,
    // category : '',
    amount: 0,
    userId: 0,
    key: 0,
    fromTime: '',
    toTime: ''
}
function PaymentPlans() {
    const dispatch = useDispatch()
    const [planHistory, setPlanHistory] = React.useState<paymentsPlan[]>([])
    const [itemDelete, setItemDelete] = React.useState(0)
    const [refesh, setRefesh] = React.useState(0)
    const user = useSelector(userLogin)
    const spendingPlan = useSelector(plan)
    const [messageApi, contextHolder] = message.useMessage();
    const [editNumber, setEditNumber] = React.useState(-1)
    const [isEdit, setIsEdit] = React.useState(-1)
    const [datapost, setDatapost] = React.useState<paymentsPlan>(initState)
    if (user != null) {
        updateAxiosAccessToken(user.token)
    }
    console.log(editNumber);

    const cancel = () => {
        setEditNumber(-1);
    };
    const handleChangeInfor = (id: number, title: string, value: string | number) => {
        setPlanHistory((prev) => {
            return planHistory.map((plan) => {
                if (plan.plannerId === id) {
                    return {
                        ...plan,
                        [title]: value,
                    }
                } else {
                    return {
                        ...plan
                    }
                }
            })
        })
        setDatapost((prev) => {
            return {
                ...prev,
                [title]: value,
            }
        })
    }

    const [metadata, setMetadata] = React.useState<metadata>(
        {
            totalPages: 0,
            totalElements: 0,
            elements: 0,
        }
    )
    const [open, setOpen] = React.useState(false);
    const paymentPlan = useSelector(plan)

    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const errorMessage = (typeMess: NoticeType, error: string) => {
        messageApi.open({
            type: `${typeMess}`,
            content: `${error}`,
        });
    }
    const handleAddNewPlan = () => {
        axiosClient.post(`/plan`, {
            ...datapost,
            userId: user.id
        })
            .then(() => {
                errorMessage('success', 'done')
                setEditNumber(-1)
            })


    }
    const handleUpdate = async (item: paymentsPlan) => {
        await axiosClient.put(`/plan/${item.plannerId}`, {
            ...item,
            userId: user.id,
        })
            .then(() => {
                errorMessage('success', 'done')
                setEditNumber(-1)
            })

    }
    const handleDelete = (item: number) => {
        console.log(item);

        axiosClient.delete(`/plan/${item}`)
        setEditNumber(-1)
        dispatch(deleteItemPlan(item))

    }
    const handleEditRow = (rowId: number) => {
        setEditNumber(rowId)
    }
    const handleAddplan = () => {
        if (editNumber === -1) {
            setPlanHistory((prev) => {
                return [...prev, initState]
            })
            setEditNumber(planHistory.length)
        } else {
            errorMessage('error', 'please done first')
        }

    }
    const handleValidate = (input: string) => {
        for (let i = 0; i < input.length; i++) {
            if (input[i] < '0' || input[i] > '9') return false
        }
        return true
    }


    React.useEffect(() => {
        const fetchData = async () => {
            const response = await axiosClient.get(`/plan/${user.id}`)

            dispatch(updatePlan(response.data.data))
            setMetadata({
                totalPages: response.data.totalPages,
                totalElements: response.data.totalElements,
                elements: response.data.elements
            })

        }
        fetchData()

    }, [refesh])
    React.useEffect(() => {
        setPlanHistory(() => {
            return spendingPlan.map((item, index) => {
                return {
                    ...item,
                    key: item.plannerId,
                    plannerId: item.plannerId,
                    fromTime: item.fromTime,
                    amount: item.amount,
                    toTime: item.toTime
                }
            })
        })
    }, [paymentPlan])
    return (
        <div>
            {contextHolder}
            <Row className='page-heading-income' style={{ justifyContent: 'flex-end' }}>
                <Col span={8} style={{ float: 'right' }}>
                    <Row gutter={[12, 24]} style={{ justifyContent: 'space-between' }}>
                        <Col className='filter-container' span={12}>
                            <Button
                                type='primary'
                                shape='round'
                                className='page-heading-income-button'
                            >フィルター</Button>

                        </Col>
                        <Col span={12}>
                            <Button
                                type='primary'
                                shape='round'
                                className='page-heading-income-button'
                                onClick={handleAddplan}
                            >作成</Button>

                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <table cellSpacing={0} className='table-wrapper'>
                    <tr>
                        <th className='table-header'>ID</th>
                        <th className='table-header'>額</th>
                        <th className='table-header'>時間から</th>
                        <th className='table-header'>時間まで</th>
                        <th className='table-header'>アクション</th>
                    </tr>
                    {planHistory?.map((plan, index) => (
                        <tr className={(index % 2) !== 0 ? 'row light' : ' row dark'} >
                            <td className={(index % 2) !== 0 ? 'table-row light' : 'table-row dark'} >{index + 1}</td>
                            <td className={(index % 2) !== 0 ? 'table-row light' : 'table-row dark'}>
                                <div className="amount-input-container table-row ">
                                    <div
                                        className={editNumber === index ? "edit w-50" : "w-50"}

                                    >
                                        <p className='amount-input-container-prefix'>$</p>
                                        <input
                                            type="text"
                                            className={(index % 2) !== 0 ? 'amount-input-container-input table-row light' : 'amount-input-container-input table-row dark'}
                                            disabled={editNumber === index ? false : true}
                                            placeholder='enter ...'
                                            onChange={(e) => {
                                                handleValidate(e.target.value) ? handleChangeInfor(plan.plannerId, 'amount', parseInt(e.target.value)) : handleChangeInfor(plan.plannerId, 'amount', plan.amount)
                                            }}
                                            value={plan.amount !== 0 ? plan.amount : undefined}
                                        />
                                    </div>
                                </div>
                            </td>

                            <td
                                className={(index % 2) !== 0 ? 'table-row light' : 'table-row dark'}>
                                <DatePicker
                                    className={(index % 2) !== 0 ? (editNumber === index ? 'table-row light edit' : 'table-row light ') : (editNumber === index ? 'table-row dark edit' : 'table-row dark')}

                                    disabled={editNumber === index ? false : true}
                                    onChange={(date, dateString) => handleChangeInfor(plan.plannerId, 'fromTime', dateString)}
                                    placeholder='22/2/2022'
                                    value={dayjs(plan.fromTime != '' ? plan.fromTime : undefined)}
                                />
                            </td>
                            <td className={(index % 2) !== 0 ? 'table-row light' : 'table-row dark'}>
                                <DatePicker
                                    className={(index % 2) !== 0 ? (editNumber === index ? 'table-row light edit' : 'table-row light ') : (editNumber === index ? 'table-row dark edit' : 'table-row dark')}
                                    disabled={editNumber === index ? false : true}
                                    onChange={(date, dateString) => {
                                        console.log(dateString);

                                        handleChangeInfor(plan.plannerId, 'toTime', dateString)
                                    }}
                                    placeholder='22/2/2022'
                                    value={dayjs(plan.toTime != '' ? plan.toTime : undefined)}
                                />
                            </td>
                            <td className={(index % 2) !== 0 ? 'table-row light' : 'table-row dark'}>
                                {editNumber !== index ? (
                                    <React.Fragment >
                                        <Button
                                            className={(index % 2) !== 0 ? 'action-button light' : 'action-button dark'}
                                            icon={<img src={editIcon} />}
                                            onClick={() => { handleEditRow(index) }}
                                        />
                                        <Button className={(index % 2) !== 0 ? 'action-button light' : 'action-button dark'} icon={<img src={deleteIcon} />} onClick={() => {
                                            setItemDelete(plan.plannerId)
                                            showModal()
                                        }} />
                                    </React.Fragment>

                                ) :
                                    <React.Fragment>
                                        <Button className={(index % 2) !== 0 ? 'action-button light' : 'action-button dark'} icon={<CheckOutlined style={{ fontSize: '24px' }} />}
                                            onClick={() => {
                                                console.log(plan);

                                                setDatapost(plan)
                                                plan.plannerId === 0 ? handleAddNewPlan() : handleUpdate(plan)

                                            }} />
                                        <Button className={(index % 2) !== 0 ? 'action-button light' : 'action-button dark'} icon={<img src={deleteIcon} />} onClick={() => {
                                            setItemDelete(plan.plannerId)
                                            showModal()
                                        }} />
                                    </React.Fragment>
                                }
                            </td>
                        </tr>
                    ))}
                </table>
            </Row>
            <Modal
                open={open}
                onOk={() => {
                    handleDelete(itemDelete)
                    handleCancel()
                }}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
            >
                <p>消去してもよろしいですか？</p>
            </Modal>
        </div>
    )
}

export default PaymentPlans