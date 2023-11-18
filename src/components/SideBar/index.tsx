import React from 'react';
import { Col, Row, Button } from 'antd'
import {
    FundOutlined,
    SettingFilled,
    EditOutlined,
    CaretRightFilled,
    ProjectFilled,
    HeartOutlined,
    UserOutlined

} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/logo.jpg'
import './style.scss'
import { userInfor, userLogin } from '../../redux/selector';
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
    getItem('ダッシュボード', '/admin/dashboard', <HeartOutlined />),
    getItem('所得', '/admin/incomes', <ProjectFilled rotate={180} />),
    getItem('費用', '/admin/payments', <FundOutlined />),
    getItem('支出計画', '/admin/payments-plan', <EditOutlined />),
    getItem('プロフィール', '/admin/accout', <UserOutlined />)
]

const footerItems: MenuItem[] = [
    getItem('Logout', 'sub7', <CaretRightFilled />),
]
export default function Sidebar() {
    const navigate = useNavigate()
    const userName = useSelector(userInfor)
    console.log(userName);
    const handleLogout = () => {
        navigate('/admin/login')
        localStorage.removeItem('userLogin')
    }
    return (
        <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', backgroundColor: 'rgb(244, 246, 248)', fontSize: '14px' }}>
            <Col>
                <Row style={{ height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Col ><Avatar size={48} icon={<img src={logo} />} /> </Col>
                    <Col offset={1} style={{ fontSize: '48px', textAlign: 'center' }}>MM</Col>
                </Row>
                <Row>
                    <Menu
                        style={{ backgroundColor: 'rgb(244, 246, 248)' }}
                        defaultSelectedKeys={[window.location.pathname]}
                        defaultOpenKeys={[window.location.pathname]}
                        mode="inline"
                        theme="light"
                        items={items}
                        onSelect={(e) => {
                            navigate(e.key)
                        }}
                    />

                </Row>
            </Col>
            <Col className='user-action'>
                <p className='username'>ウエルカム {userName.fullName}</p>
                <Button icon={<CaretRightFilled />} onClick={handleLogout}>ログアウト</Button>

            </Col>
        </Col>
    )
}
