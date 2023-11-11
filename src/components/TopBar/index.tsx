import React from "react";
import { Col, Row } from "antd";
// import { Avatar, Space } from 'antd';
// import {
//     SearchOutlined,
//     NotificationFilled,
//     UserOutlined 
//   } from '@ant-design/icons';

export default function TopBar() {
    return  (
        <Row style={{justifyContent : 'space-between', backgroundColor :'#ddd', padding : '0 12px '}}>
            <Col span={20} style={{fontWeight : 'bold', fontSize :'14px'}}>
                
                DashBoard
            </Col>
            

        </Row>
    )
}