import React from 'react';
import { Layout} from 'antd';
import Sidebar from '../SideBar';
import { useSelector } from 'react-redux';
import { userLogin } from '../../redux/selector';
import { useDispatch } from 'react-redux';
import { login } from '../BaseHomePage/authenSlice';
import './style.scss'
interface Props {
    children?: React.ReactNode
}

const { Sider, Content } = Layout;
export default function BaseLayout (props : Props) {
    
    return  (
        <Layout style={{height : '100%'}}>
            <Sider width={'24%'} className='sidebar'>
                <Sidebar />
            </Sider>
                <Content style={{backgroundColor : '#fff', padding : '0 40px', overflowX : 'hidden', overflowY : 'auto'}}>
                    {props.children}
                </Content>
        </Layout>
    )
}