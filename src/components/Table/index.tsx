import React from 'react';
import { Table, Pagination, PaginationProps, Row, Button, Col } from 'antd';

import type { ColumnsType } from 'antd/es/table';
import {
    EditFilled,
    DeleteOutlined
} from '@ant-design/icons';
import './style.scss'
import { incomes, pays } from '../../utils/interface/interface';

interface Props {
    onDelete: (item : incomes|pays) => void,
    onEdit: (item : incomes|pays) => void,
    dataSource: (incomes[] | pays[]),
    onShowSizeChange: (current:number, pageSize:number) => void,
    onChangePage: (current:number, pageSize:number) => void
}

function TableContent(props: Props) {
    const { onDelete, onEdit, dataSource, onShowSizeChange, onChangePage } = props


    const columns: ColumnsType<incomes | pays> = React.useMemo(() => [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '名前',
            dataIndex: 'name',
            key: 'name'
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
            title: 'カテゴリー',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'アクション',
            key: 'id',
            render: (item) => <p>
                <Button icon={<EditFilled />} onClick={() => onEdit(item)} />
                <Button icon={<DeleteOutlined />} onClick={() => onDelete(item)} />
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

                    onShowSizeChange={(current,pageSize)=>onShowSizeChange(current,pageSize)}
                    onChange={(current,pageSize) => onChangePage(current,pageSize)}
                    defaultCurrent={1}
                    total={500}
                />
            </Row>
        </div>
    )
}

export default TableContent;