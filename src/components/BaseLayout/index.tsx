import React from 'react';
import { Layout} from 'antd';
import Sidebar from '../SideBar';
interface Props {
    children?: React.ReactNode
}
const { Sider, Content } = Layout;
export default function BaseLayout (props : Props) {
    return  (
        <Layout style={{height : '100%'}}>
            <Sider style={{borderRight : '2px solid #ddd'}}>
                <Sidebar />
            </Sider>
            <Layout>
                <Content style={{ margin : '0 57px', overflowX : 'hidden', overflowY :'auto'}}>
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    )
}