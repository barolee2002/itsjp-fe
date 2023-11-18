import React from 'react';
import { Col, Row, Avatar, Button, Input, DatePicker,notification  } from 'antd';
import {
    EditOutlined,
    UserOutlined,
    MailFilled,
    KeyOutlined,
    CheckOutlined,

} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { userLogin } from '../../redux/selector';
import axiosClient, { updateAxiosAccessToken } from '../../api/axiosClient';
import { useDispatch } from 'react-redux';
import './style.scss'
import { userInfor } from '../../utils/interface/interface';
import { updateInfor } from './accountSlice';
import { ErrorMessage } from '../../components/ErrorMessage';
import type { NotificationPlacement } from 'antd/es/notification/interface';
const initstate = {
    id: 0,
    userName: '',
    fullName: '',
    address: '',
    email :'',
    avatarUrl: '',
    password: '',
    total: 0,

}
function Accout() {
    const dispatch = useDispatch()
    const user = useSelector(userLogin)
    const [refesh, setRefesh] = React.useState(0)
    updateAxiosAccessToken(user.token)
    const [edit, setEdit] = React.useState(false)
    const [userInfor, setUserInfor] = React.useState<userInfor>(initstate)
    const [checkNewPassword, setCheckNewPassword] = React.useState(true)
    // const [noti, contextHolder] = notification.useNotification();
    const openNotification = (message : string) => {
        notification.open({
          message: `${message} `,
          placement: 'topRight',
          duration : 3000,
          icon : <CheckOutlined />
        });
      };
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await axiosClient.get(`/user/${user.id}`)
            setUserInfor(response.data)
            dispatch(updateInfor(userInfor))
        }
        fetchData()
    }, [refesh])
    const handleChangeInfor = (title: string, value: string | number) => {
        setUserInfor((prev) => {
            return {
                ...prev,
                [title]: value,
            }
        })
    }
    const handleUpdate = async () => {
        await axiosClient.put(`/user/${user.id}`,{...userInfor})
        .then(() => {
            dispatch(updateInfor(userInfor))
            openNotification('情報が正常に変更されました')
        })
    }
    const handleCheckPassword = (newPassword: string) => {
        newPassword === userInfor.password ? setCheckNewPassword(true) : setCheckNewPassword(false)
    }
    console.log(userInfor);
    
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
                <Row gutter={[124, 4]}>
                    <Col span={12}>
                        <p className='attribute'>ファーストネーム</p>
                        <Input className='infor-input'
                            disabled={!edit}
                            placeholder='Nguyen Binh'
                            value={userInfor.fullName}
                            onChange={(e) => {
                                handleChangeInfor('fullName', e.target.value)
                            }}
                        ></Input>
                    </Col>
                    <Col span={12}>
                        <p className='attribute'>苗字</p>
                        <Input className='infor-input'
                            disabled={!edit}
                            placeholder='Nguyen Binh'
                            value={userInfor.address}
                            onChange={(e) => {
                                handleChangeInfor('address', e.target.value)
                            }}
                        ></Input>
                    </Col>
                    {/* <Col span={12}>
                        <p className='attribute'>生年月日</p>
                        <DatePicker className='infor-input' style={{ width: '100%' }} placeholder='12-2-1996' />
                    </Col> */}
                    
                    <Col span={12}>
                        <p className='attribute'>メール</p>
                        <Input className='infor-input'
                            disabled={!edit}
                            prefix={<MailFilled sizes='large' />}
                            placeholder='binh@gmail.com'
                            value={userInfor.email}
                            onChange={(e) => {
                                handleChangeInfor('userName', e.target.value)
                            }}
                        ></Input>
                    </Col>
                </Row>
                {edit &&
                    <React.Fragment>
                        <Row gutter={[124, 0]}>
                            <Col span={12}>
                                <p className='attribute'>新しいパスワード</p>
                                <Input
                                    type='password'
                                    prefix={<KeyOutlined />}
                                    className='infor-input'
                                    placeholder='Nguyen Binh'
                                    onChange={(e) => handleChangeInfor('password', e.target.value)}
                                ></Input>
                            </Col>
                            <Col span={12}>
                                <p className='attribute'>パスワードを認証する</p>
                                <Input
                                    type='password'
                                    prefix={<KeyOutlined />}
                                    className='infor-input'
                                    placeholder='Nguyen Binh'
                                    onFocus={()=>setCheckNewPassword(true)}
                                    onChange={(e) => setCheckNewPassword(true)}
                                    onBlur={(e) => handleCheckPassword(e.target.value)}
                                ></Input>
                            </Col>
                            <Col span={12} offset={12}>
                            {!checkNewPassword&& <ErrorMessage errorText='再入力したパスワードが一致しません' />}

                            </Col>
                        </Row>
                        <Row gutter={[4, 32]} className='action'>
                            <Col>
                                <Button
                                    className='action-button'
                                    type='primary'
                                    shape='round'
                                    size='large'
                                    onClick={handleUpdate}
                                >アップデート</Button>
                            </Col>
                            <Col>
                                <Button
                                    className='action-button'
                                    type='primary'
                                    shape='round'
                                    size='large'
                                    onClick={() => setRefesh(refesh + 1)}
                                >キャンセル</Button>
                            </Col>
                            {/* <Col span={12} offset={12}>
                            {!checkNewPassword&&<p className='error'>再入力したパスワードが一致しません</p>}

                            </Col> */}

                        </Row>
                    </React.Fragment>
                }
            </Row>
        </div>
    )
}

export default Accout