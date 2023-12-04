import React from 'react';
import { Table, Pagination, Row, Button, Modal } from 'antd';

import type { ColumnsType } from 'antd/es/table';
import {
    EditFilled,
    DeleteOutlined
} from '@ant-design/icons';
import './style.scss'
import { chartType, metadata } from '../../utils/interface/interface';
import deleteIcon from '../../assets/trash-2.svg'
import editIcon from '../../assets/editRow.svg'

interface Props {
    onDelete: (item: chartType) => void,
    onEdit: (item: chartType) => void,
    dataSource: chartType[],
    onShowSizeChange: (current: number, pageSize: number) => void,
    onChangePage: (current: number, pageSize: number) => void,
    metadata: metadata
}
const initState = {
    id: 0,
    amount: 0,
    time: '',
    key: 0,
    category: '',
}
function TableContent(props: Props) {
    const { onDelete, onEdit, dataSource, onShowSizeChange, onChangePage, metadata } = props
    const [open, setOpen] = React.useState(false);
    const [itemDelete, setItemDelete] = React.useState<chartType>(initState)
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const columns: ColumnsType<chartType> = React.useMemo(() => [
        {
            title: 'ID',
            dataIndex: 'id',
            className: 'noHover',
            width: 50,
            key: 'id',
        },
        {
            title: 'カテゴリー',
            dataIndex: 'category',
            className: 'noHover',

            width: 300,
            key: 'category'
        },
        {
            title: '額',
            dataIndex: 'amount',
            width: 195,
            className: 'noHover',

            key: 'amount',
            render: (item) => <p className='m-0'>$ {item}</p>
        },
        {
            title: '時間',
            dataIndex: 'date',
            className: 'noHover',

            width: 195,
            key: 'date'
        },
        {
            title: 'アクション',
            className: 'noHover',
            width: 125,
            key: 'id',
            render: (item) => <p className='m-0'>
                <Button onMouseOver={() => { }} className={item.id % 2 === 0 ? 'action-button light' : 'action-button dark'} icon={<img src={editIcon} />} onClick={() => onEdit(item)} />
                <Button className={item.id % 2 === 0 ? 'action-button light' : 'action-button dark'} icon={<img src={deleteIcon} />} onClick={() => {

                    setItemDelete(item)
                    showModal()
                }} />
            </p>
        },

    ], [])

    return (
        <div >
            <Table
                className='table-wrapper'
                dataSource={dataSource}
                columns={columns}
                rowClassName={(record, index) => (index % 2 === 0 ? 'dark' : 'light')}
                pagination={false}
                onRow={(record, rowIndex) => {
                    return {
                        onMouseOver: (e) => {
                            e.cancelable = true
                        }
                    };
                }}
            />

            {/* <Row style={{ justifyContent: 'center', backgroundColor: '#fafafa', padding: '4px 0' }}>

                <Pagination
                    showSizeChanger
                    onShowSizeChange={(current, pageSize) => onShowSizeChange(current, pageSize)}
                    onChange={(current, pageSize) => onChangePage(current, pageSize)}
                    defaultCurrent={1}
                    total={metadata.totalPages}
                />
            </Row> */}
            <Modal
                open={open}
                onOk={() => {
                    onDelete(itemDelete)
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

export default TableContent;