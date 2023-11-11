import React from 'react';
import { Col, Row, Avatar, Button, Input, DatePicker } from 'antd';
import {
    EditOutlined,
    UserOutlined,
    MailFilled,
    KeyOutlined

} from '@ant-design/icons';
import './style.scss'
function Accout() {
    const [edit, setEdit] = React.useState(false)
    return (
        <div>
            <Row className='page-title'>プロフィール</Row>
            <Row className='accout-overview'>
                <Col className='overview-title'>
                    <p className='title'>口座情報</p>
                    <p className='sub-title'>アカウント情報を更新</p>
                </Col>
                <Col className='avatar'>
                    <Avatar size={96} icon={<UserOutlined />} />
                </Col>
            </Row>
            <Row className='accout-content'>
                <Row className='title'>
                    個人情報

                </Row>
                {
                    !edit && <Row>
                        <Button className='edit-button' icon={<EditOutlined />} onClick={() => setEdit(true)}>編集</Button>
                    </Row>
                }

            </Row>
            <Row className='accout-infor'>
                <Row gutter={[124, 36]}>
                    <Col span={12}>
                        <p className='attribute'>ファーストネーム</p>
                        <Input className='infor-input' placeholder='Nguyen Binh'></Input>
                    </Col>
                    <Col span={12}>
                        <p className='attribute'>苗字</p>
                        <Input className='infor-input' placeholder='Nguyen Binh'></Input>
                    </Col>
                </Row>
                <Row gutter={[124, 36]}>
                    <Col span={12}>
                        <p className='attribute'>生年月日</p>
                        <DatePicker className='infor-input' style={{ width: '100%' }} placeholder='12-2-1996' />
                    </Col>
                    <Col span={12}>
                        <p className='attribute'>電話番号</p>
                        <Input className='infor-input' placeholder='0123456789'></Input>
                    </Col>
                </Row>
                <Row gutter={[124, 36]}>
                    <Col span={12}>
                        <p className='attribute'>メール</p>
                        <Input className='infor-input' prefix={<MailFilled sizes='large' />} placeholder='binh@gmail.com'></Input>
                    </Col>
                </Row>
                {edit &&
                    <React.Fragment>
                        <Row gutter={[124, 36]}>
                            <Col span={12}>
                                <p className='attribute'>新しいパスワード</p>
                                <Input type='password' prefix={<KeyOutlined />} className='infor-input' placeholder='Nguyen Binh'></Input>
                            </Col>
                            <Col span={12}>
                                <p className='attribute'>パスワードを認証する</p>
                                <Input type='password' prefix={<KeyOutlined />} className='infor-input' placeholder='Nguyen Binh'></Input>
                            </Col>
                        </Row>
                        <Row className='action'>
                            <Button
                                className='action-button'
                                type='primary'
                                shape='round'
                                size='large'>アップデート</Button>
                            <Button 
                                className='action-button'
                                type='primary'
                                shape='round'
                                size='large'>キャンセル</Button>
                        </Row>
                    </React.Fragment>
                }
            </Row>
        </div>
    )
}

export default Accout