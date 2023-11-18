import React from 'react';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router';
import { Row, Col, Button, Modal, Input, Table, Form, Popconfirm, Typography, InputNumber } from 'antd';
import {
    EditFilled,
    DeleteOutlined
} from '@ant-design/icons';
import './style.scss'
import { metadata, paymentsPlan } from '../../utils/interface/interface';
import { useDispatch, useSelector } from 'react-redux';
import { plan, userLogin } from '../../redux/selector';
import axiosClient, { updateAxiosAccessToken } from '../../api/axiosClient';
import { deleteItemPlan, updatePlan } from './planSlice';
import { getFormattedDate } from '../../utils/dateFormat';


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: paymentsPlan[];
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};


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
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = React.useState('week')
    const [planHistory, setPlanHistory] = React.useState<paymentsPlan[]>([])
    const [itemDelete, setItemDelete] = React.useState<paymentsPlan>(initState)
    const [edit, setEdit] = React.useState(false)
    const [refesh, setRefesh] = React.useState(0)
    const user = useSelector(userLogin)
    const [metadata, setMetadata] = React.useState<metadata>(
        {
            totalPages: 0,
            totalElements: 0,
            elements: 0,
        }
    )
    const [open, setOpen] = React.useState(false);
    const paymentPlan = useSelector(plan)
    if (user != null) {
        updateAxiosAccessToken(user.token)
    }
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const handleUpdate = (item : paymentsPlan) => {
        axiosClient.put(`/plan/${item.key}`)
    }
    const handleOpenEdit = () => {
        setEdit(true)
    }
    const handleDelete = (item: paymentsPlan) => {
        console.log(item);

        axiosClient.delete(`/plan/${item.key}`)
        dispatch(deleteItemPlan(item.key))

    }
    const handleAddIncome = () => {
        setPlanHistory((prev) => {
            return [...prev, initState]
        })
    }


    const columns: ColumnsType<paymentsPlan> = React.useMemo(() => [
        {
            title: 'ID',
            dataIndex: 'plannerId',
            key: 'plannerId',
            editable: true,

        },
        // {
        //     title: '名前',
        //     dataIndex: 'category',
        //     key: 'category',
        //     render : (item) => 
        //         <Input type='text' value={item.category} />
        // },
        {
            title: '額',
            dataIndex: 'amount',
            key: 'amount',
            editable: true,
        },
        {
            title: '時間',
            dataIndex: 'fromTime',
            key: 'fromTime',
            editable: true,
        },
        {
            title: '時間',
            dataIndex: 'toTime',
            key: 'toTime',
            editable: true,
        },
        {
            title: 'アクション',
            key: 'id',
            render: (item) => {
                return !edit ? <p>
                    <Button icon={<EditFilled />} onClick={() => handleOpenEdit()} />
                    <Button icon={<DeleteOutlined />} onClick={() => {
                        setItemDelete(item)
                        showModal()
                    }} />
                </p> : <span>
                    <Typography.Link onClick={() => handleUpdate(item)} style={{ marginRight: 8 }}>
                        Save
                    </Typography.Link>
                    <Popconfirm title="Sure to cancel?" onConfirm={() => setEdit(false)}>
                        <a>Cancel</a>
                    </Popconfirm>
                </span>
            }
        },

    ], [])
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
            return paymentPlan.map((item, index) => {
                let parseDay = new Date(item.fromTime)
                let toTime = new Date(item.toTime)
                return {
                    ...item,
                    key: item.plannerId,
                    plannerId: index + 1,
                    fromTime: getFormattedDate(parseDay),
                    amount: item.amount,
                    // category: item.category,
                    toTime: getFormattedDate(toTime)
                }
            })
        })
    }, [paymentPlan])
    console.log(planHistory);
    return (
        <div>
            <Row className='topbar' style={{ height: '64px', justifyContent: 'space-between' }}>
                <Col className='tabs' style={{ display: 'flex' }} span={6}>
                    {/* <Tabs activeTab={activeTab} onClick={(activeTab) => handleClick(activeTab)} /> */}
                </Col>
                <Col span={5}>
                    <Row style={{ height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button size='large' className='top-button'>
                            フィルター
                        </Button>
                        <Button size='large' className='top-button' onClick={handleAddIncome}>
                            作成
                        </Button>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Table
                    dataSource={planHistory}
                    columns={columns}
                    className='table-container'
                    rowClassName={(record, index) => (index % 2 === 0 ? 'dark' : 'light')}
                    pagination={false}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }} />
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