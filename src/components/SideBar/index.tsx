import React from 'react';
import { Col, Row, Button } from 'antd'
import {
    CaretRightFilled,

} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/logo.jpg'
import './style.scss'
import { createFromIconfontCN } from '@ant-design/icons';
import { userInfor, userLogin } from '../../redux/selector';
import dashboardIcon from '../../assets/bar-chart-2.svg'
import incomeIcon from '../../assets/arrow-down-circle.svg'
import spendingIcon from '../../assets/arrow-up-circle.svg'
import planIcon from '../../assets/Edit.svg'
import settingIcon from '../../assets/Setting_line_light.svg'
import userIcon from '../../assets/user.svg'
import logout from '../../assets/log-out.svg'
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}
const items: MenuItem[] = [
    getItem('ダッシュボード', '/admin/dashboard', <img  src = {dashboardIcon} alt='dashboard'/>),
    getItem('所得', '/admin/incomes', <img src = {incomeIcon} alt='income' />),
    getItem('費用', '/admin/payments', <img src={spendingIcon} alt='spending' />),
    getItem('支出計画', '/admin/payments-plan', <img src={planIcon} alt = 'payment plan' />),
    getItem('プロフィール', '/admin/accout', <img src ={userIcon} alt = 'user' />)
]


export default function Sidebar() {
    const navigate = useNavigate()
    const userName = useSelector(userLogin)
    const handleLogout = () => {
        navigate('/admin/login')
        localStorage.setItem('userLogin', '')
    }
    return (
        <Col className='sidebar'>
       
                <Row className='logo'>
                    <Col ><Avatar size={60} icon={<img src={logo} />} /> </Col>
                    <p className='app-name'>MM</p>
                </Row>
                <Row style={{ height: '70%' }}>
                    <Menu
                        defaultSelectedKeys={[window.location.pathname]}
                        defaultOpenKeys={[window.location.pathname]}
                        mode="inline"
                        theme="light"
                        className='sideber-menu'
                        
                        items={items}
                        onClick={(e) => {
                            navigate(`${e.key}`)
                        }}
                    />

                </Row>
                <Col className='user-action'>
                    <p className='username'>ウエルカム {userName.username}</p>
                    <Button className='logout-button' icon={<img src={logout} className='logout-icon' />} onClick={handleLogout}>ログアウト</Button>

                </Col>

        </Col>
    )
}

