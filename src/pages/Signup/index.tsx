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
import { ErrorMessage } from '../../components/ErrorMessage';
// import './style.scss'
interface error {
    type : string,
    message : string[],
}
function SignUp() {
    const [userName, setUserName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [checkSussessSignUp, setCheckSussessSignUp] = React.useState(false)
    const [errorEmail, setErrorEmail] = React.useState('') 
    const [errorPassword, setErrorPassword] = React.useState('') 
    const [errorConfirmPassword, setErrorConfirmPassword] = React.useState('') 

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
    console.log(checkSussessSignUp);
    
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
                            if(validation({ input: e.target.value, newPassword: '' }).isEmailValid.result) {
                                setCheckSussessSignUp(true)
                                setErrorEmail('')

                            }
                            else {
                                setCheckSussessSignUp(false)
                                setErrorEmail('このフィールドは電子メールである必要があります')
                            }
                            if(validation({ input: e.target.value, newPassword: '' }).isRequied.result) {
                                setCheckSussessSignUp(true)
                                setErrorEmail('')
                            }
                            else {
                                setCheckSussessSignUp(false)
                                setErrorEmail('このフィールドを空白のままにすることはできません')
                            }
                        }}
                        onFocus={()=>setErrorEmail('')}
                    />
                    <ErrorMessage errorText={errorEmail} />
                    <Input className='input'

                        type='password'
                        prefix={<KeyOutlined color='disable' />}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='パスワード'
                        onBlur={(e) => {
                            if(validation({ input: e.target.value, newPassword: '' }).isRequied.result)
                            {
                                setCheckSussessSignUp(true)
                                setErrorPassword('')

                            } else {
                                setCheckSussessSignUp(false)
                                setErrorPassword('このフィールドを空白のままにすることはできません')
                            }
                        }}
                        onFocus={()=>{
                            setErrorPassword('')
                            setErrorConfirmPassword('')
                        }}

                    />
                    <ErrorMessage errorText={errorPassword} />

                    <Input className='input'
                        type='password'
                        prefix={<KeyOutlined color='disable' />}
                        placeholder='パスワードの確認'
                        onBlur={(e) => {
                            if(validation({ input: password, newPassword: e.target.value }).isPasswordValid.result)
                            {
                                setCheckSussessSignUp(true)
                                setErrorConfirmPassword('')

                            } else {
                                setCheckSussessSignUp(false)
                                setErrorConfirmPassword('再入力したパスワードが一致しません')
                            }  
                        }}
                        onFocus={() =>setErrorConfirmPassword('')}
                    />
                    <ErrorMessage errorText={errorConfirmPassword} />

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