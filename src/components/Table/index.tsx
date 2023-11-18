import React from 'react';
import { Table, Pagination, Row, Button, Modal } from 'antd';

import type { ColumnsType } from 'antd/es/table';
import {
    EditFilled,
    DeleteOutlined
} from '@ant-design/icons';
import './style.scss'
import { chartType, metadata } from '../../utils/interface/interface';

interface Props {
    onDelete: (item: chartType) => void,
    onEdit: (item: chartType) => void,
    dataSource: chartType[],
    onShowSizeChange: (current: number, pageSize: number) => void,
    onChangePage: (current: number, pageSize: number) => void,
    metadata: metadata
}
const initState =  {
    id : 0,
    amount : 0,
    time : '',
    key : 0,
    category : '',
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
            key: 'id',
        },
        {
            title: 'カテゴリー',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: '額',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: '時間',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'アクション',
            key: 'id',
            render: (item) => <p>
                <Button icon={<EditFilled />} onClick={() => onEdit(item)} />
                <Button icon={<DeleteOutlined />} onClick={() => {
                    setItemDelete(item)
                    showModal()
                    }} />
            </p>
        },

    ], [])

    return (
        <div >
            <Table
                dataSource={dataSource}
                columns={columns}
                rowClassName={(record, index) => (index % 2 === 0 ? 'dark' : 'light')}
                pagination={false} />

            <Row style={{ justifyContent: 'center', backgroundColor: '#fafafa', padding: '4px 0' }}>

                <Pagination
                    showSizeChanger
                    onShowSizeChange={(current, pageSize) => onShowSizeChange(current, pageSize)}
                    onChange={(current, pageSize) => onChangePage(current, pageSize)}
                    defaultCurrent={1}
                    total={metadata.totalPages}
                />
            </Row>
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