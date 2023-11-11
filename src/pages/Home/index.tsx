import React from 'react';
import BaseLogin from '../../components/BaseHomePage';
import { Row,Col,Avatar } from 'antd';
import logo from '../../assets/logo.jpg'
import { useNavigate } from 'react-router';
import './style.scss'

export default function HomePage() {
    const navigate = useNavigate()
    const handleLogin = () => {
        navigate(`login`)
    }
    const handleSignup = () => {
        navigate(`signup`)
    }
    return (
        <BaseLogin>
            <Row className='homepage'>

                <Row>
                    <Avatar size={128} icon={<img src={logo} />} />

                </Row>
                <Row className='homepage-content'>
                        <p className='app-name text-center'>Money Managemant</p>
                        <p className='app-subtitle text-center'>アカウントをお持ちではない場合すぐサインアプ</p>
                        <button className='home-button' onClick={handleLogin}>
                            サインイン
                        </button>
                        <button className='home-button' onClick={handleSignup}>
                            サインアップ
                        </button>
                </Row>
            </Row>
        </BaseLogin>
    )
}