import React from 'react';
import { Col, Row, Avatar, Input } from 'antd';
import {
    MailFilled,
    KeyOutlined
} from '@ant-design/icons';
import BaseLogin from '../../components/BaseHomePage';
import { useNavigate } from 'react-router';
import logo from '../../assets/logo.jpg'
// import './style.scss'
function Login() {
    const navigate = useNavigate()
    const handleSignup = () => {
        navigate(`/admin/signup`)
    }
    const handleForgotPassword = () => {
        
    }
    return (
        <BaseLogin>
            <Col className='login'>
                <Row><Avatar size={48} icon={<img src={logo} alt='logo' />} /></Row>
                <Row className='login-input'>
                    <p className='title'>ログイン</p>
                    <Input className='input' prefix={<MailFilled color='disable' />} />
                    <Input className='input' prefix={<KeyOutlined color='disable' />} />
                    <p className = 'forgot-password' onClick={handleForgotPassword}>パスワードを忘れた場合</p>
                </Row>
                <Row className='login-action'>
                    <button className='login-button'>サインイン</button>
                    <div className='signup'>
                        <p >アカウントをお持ちではない場合</p>
                        <p className='navigate-signup' onClick={handleSignup}>すぐサインアップ</p>
                    </div>
                </Row>
            </Col>
        </BaseLogin>
    )
}
export default Login