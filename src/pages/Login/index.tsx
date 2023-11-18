import React from 'react';
import { Col, Row, Avatar, Input, Form } from 'antd';
import {
    MailFilled,
    KeyOutlined
} from '@ant-design/icons';
import BaseLogin from '../../components/BaseHomePage';
import { useNavigate } from 'react-router';
import logo from '../../assets/logo.jpg'
import axiosClient, { updateAxiosAccessToken } from '../../api/axiosClient';
import { useDispatch } from 'react-redux';
import { login } from '../../components/BaseHomePage/authenSlice';
// import './style.scss'
function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userName, setUserName] = React.useState('')
    const [password, setPassword] = React.useState('')
    updateAxiosAccessToken('')
    const handleSignup = () => {
        navigate(`/admin/signup`)
    }
    const handleForgotPassword = () => {

    }
    const handleLogin = async () => {
        try {
            const response = await axiosClient.post('/user/login', {
                userName,
                password
            })
            
            console.log(JSON.stringify(response.data));
            const userLogin = {
                ...response.data,
                isLogin: true
            }
            localStorage.setItem('userLogin', JSON.stringify(userLogin))
            dispatch(login(userLogin))
            navigate(`/admin/dashboard`)
        } catch (error: any) {

        }
    }
    return (
        <BaseLogin>

            <Col className='login'>
                <Row><Avatar size={48} icon={<img src={logo} alt='logo' />} /></Row>

                <Row className='login-input'>
                    <p className='title'>ログイン</p>
                    <Form className='form-login' onSubmitCapture={handleLogin}>
                        <Form.Item>
                            <Input
                                className='input'
                                value={userName}

                                prefix={<MailFilled style={{ fontSize: '20px', color: '#4d4d4d', marginRight: '8px' }} />}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                type='password'
                                className='input'
                                value={password}
                                prefix={<KeyOutlined style={{ fontSize: '20px', color: '#4d4d4d', marginRight: '8px' }} />}
                                onChange={(e) => setPassword(e.target.value)}

                            />
                            <p className='forgot-password' onClick={handleForgotPassword}>パスワードを忘れた場合</p>
                        </Form.Item>
                        <Form.Item>
                            <Row className='login-action'>
                                <button type='submit' className='login-button'>サインイン</button>
                                <div className='signup'>
                                    <p >アカウントをお持ちではない場合</p>
                                    <p className='navigate-signup' onClick={handleSignup}>すぐサインアップ</p>
                                </div>
                            </Row>
                        </Form.Item>
                    </Form>



                </Row>

            </Col>
        </BaseLogin>
    )
}
export default Login