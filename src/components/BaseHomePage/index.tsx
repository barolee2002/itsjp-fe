import React from "react";
import { Col, Row } from "antd";
import { Layout } from 'antd';
import homeImage from "../../assets/login-image.png"
import './style.scss'
interface Props {
    children?: React.ReactNode
}
// const { Content } = Layout
function BaseLogin(props: Props) {
    const { children } = props;
    return (
        // <Layout style={{height : '100%'}}>
        //     <Content >
                <Row style={{ height: '100%', overflow :'hidden' }}>
                    <Col span={12}>
                        {children}
                    </Col>
                    <Col span={12} style={{ width: '100%', height: '100vh' }}>
                        <img style={{ width: '100%', height: '100vh', objectFit: 'cover' }} src={homeImage} alt="home-image" />
                    </Col>
                </Row>
        //     </Content>
        // </Layout>
    )

}
export default BaseLogin