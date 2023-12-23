import React from 'react';
import { Col, Row, Avatar, Input, Form, message } from 'antd';
import {
    MailFilled,
    KeyOutlined
} from '@ant-design/icons';
import BaseLogin from '../../components/BaseHomePage';
import { NoticeType } from 'antd/es/message/interface';
import { useNavigate } from 'react-router';
import logo from '../../assets/logo.jpg';
import baseURL from '../../api/baseUrl';
import axiosClient, { updateAxiosAccessToken } from '../../api/axiosClient';
import { useDispatch } from 'react-redux';
import { login } from '../../components/BaseHomePage/authenSlice';
import axios from 'axios';
import './style.scss'
function Login() {
    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const [userName, setUserName] = React.useState('')
    const [password, setPassword] = React.useState('')
    updateAxiosAccessToken('')
    const errorMessage = (typeMess: NoticeType, error: string) => {
        messageApi.open({
            type: `${typeMess}`,
            content: `${error}`,
        });
    }
    const handleSignup = () => {
        navigate(`/admin/signup`)
    }
    const handleForgotPassword = () => {

    }
    const handleLogin = async () => {
        (userName !== '' && password !== '') ?
            axios.post(`${baseURL}/user/login`, {
                userName,
                password
            })
                .then((response) => {
                    if (response.data.status === 400) {

                        errorMessage('error', 'ユーザー名またはパスワードが間違っています')
                    }
                    else {
                        const userLogin = {
                            ...response.data.data,
                            password: password,
                            isLogin: true
                        }
                        localStorage.setItem('userLogin', JSON.stringify(userLogin))
                        dispatch(login(userLogin))
                        updateAxiosAccessToken(userLogin.token)
                        navigate(`/admin/dashboard`)
                    }

                })
                .catch((error) => {
                    console.log(error);

                    errorMessage('error', 'ユーザー名またはパスワードが間違っています')
                })
            : errorMessage('error', "完全な情報を入力してください")
    }
    return (
        <BaseLogin>
            {contextHolder}
            <Col className='login'>
                <Row><Avatar size={48} icon={<img src={logo} alt='logo' />} /></Row>

                <Row className='login-input'>
                    <p className='title'>ログイン</p>
                    <Form className='form-login' onSubmitCapture={handleLogin}>
                        <div className="input-item">

                            <Form.Item>
                                <Input
                                    className='input'
                                    value={userName}

                                    prefix={<MailFilled style={{ fontSize: '20px', color: '#4d4d4d', marginRight: '8px' }} />}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </Form.Item>
                        </div>
                        <div className="input-item">

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
                        </div>
                        <Form.Item>
                            <Row className='login-action mt-124'>
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