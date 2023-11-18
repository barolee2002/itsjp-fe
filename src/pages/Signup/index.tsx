import React from 'react';
import { Col, Row, Avatar, Input } from 'antd';
import {
    MailFilled,
    KeyOutlined
} from '@ant-design/icons';
import BaseLogin from '../../components/BaseHomePage';
import { useNavigate } from 'react-router';
import logo from '../../assets/logo.jpg'
import axiosClient from '../../api/axiosClient';
import validation from '../../utils/validation';
// import './style.scss'
function SignUp() {
    const [userName, setUserName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [checkSussessSignUp, setCheckSussessSignUp] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState('')
    const navigate = useNavigate()
    const handleSignup = async () => {
        checkSussessSignUp &&
            await axiosClient.post('/user', {
                userName,
                password
            })
                .then(() => {
                    console.log('done');

                    navigate(`/admin/login`)
                })
                .catch(() => {
                    console.log('loi');

                })
    }
    const handleSignin = () => {
        navigate('/admin/login')
    }

    return (
        <BaseLogin>
            <Col className='login'>
                <Row><Avatar size={48} icon={<img src={logo} alt='logo' />} /></Row>
                <Row className='login-input'>
                    <p className='title'>ログイン</p>
                    <Input className='input'
                        prefix={<MailFilled color='disable' />}
                        placeholder='電子メールアドレス'
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }}
                        onBlur={(e) => {
                            validation({ input: e.target.value, newPassword: '' }).isEmailValid.result ?
                                setCheckSussessSignUp(true) : setCheckSussessSignUp(false)
                        }}
                    />
                    <Input className='input'

                        type='password'
                        prefix={<KeyOutlined color='disable' />}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='パスワード'
                        onBlur={(e) => {
                            validation({ input: e.target.value, newPassword: '' }).isRequied.result ?
                                setCheckSussessSignUp(true) : setCheckSussessSignUp(false)


                        }}
                    />
                    <Input className='input'
                        type='password'
                        prefix={<KeyOutlined color='disable' />}
                        placeholder='パスワードの確認'
                        onBlur={(e) => {
                            validation({ input: password, newPassword: e.target.value }).isPasswordValid.result ?
                                setCheckSussessSignUp(true) :
                                setCheckSussessSignUp(false)
                        }}
                    />
                </Row>
                <Row className='login-action'>
                    <button className='login-button'
                        onClick={handleSignup}
                    >サインアップ</button>
                    <div className='signup'>
                        <p >アカウントをお持ちではない場合</p>
                        <p className='navigate-signup' onClick={handleSignin}>サインイン。</p>
                    </div>
                </Row>
            </Col>
        </BaseLogin>
    )
}
export default SignUp