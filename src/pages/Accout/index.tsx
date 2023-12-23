import React from "react";
import {
  Col,
  Row,
  Avatar,
  Button,
  Input,
  Upload,
  notification,
  message,
  UploadFile,
} from "antd";
import {
  EditOutlined,
  UserOutlined,
  MailFilled,
  KeyOutlined,
  CheckOutlined,
  UploadOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { userLogin } from "../../redux/selector";
import axiosClient from "../../api/axiosClient";
import { useDispatch } from "react-redux";
import { NoticeType } from "antd/es/message/interface";
import "./style.scss";
import { userInfor } from "../../utils/interface/interface";
import { updateInfor } from "./accountSlice";
import {
  RcFile,
  UploadChangeParam,
  UploadProps,
} from "antd/lib/upload/interface";
import { ErrorMessage } from "../../components/ErrorMessage";
import avtEditIcon from "../../assets/avt-edit.svg";
// import {storage} from '../../firebase'

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const initstate = {} as userInfor;
function Accout() {
  const dispatch = useDispatch();
  const user = useSelector(userLogin);
  const [refesh, setRefesh] = React.useState(0);
  const [edit, setEdit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [userInfor, setUserInfor] = React.useState<userInfor>(initstate);
  const [newPassword, setNewPass] = React.useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const [checkNewPassword, setCheckNewPassword] = React.useState(true);
  const [avatarDataUrl, setAvatarDataUrl] = React.useState("");
  const [typePassword, setTypePassword] = React.useState({
    newPassword: true,
    confirmPassword: true,
  });
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {

      setFile(e.target.files[0]);
    }
  };
  const errorMessage = (typeMess: NoticeType, error: string) => {
    messageApi.open({
      type: `${typeMess}`,
      content: `${error}`,
    });
  };
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axiosClient.get(`/user/${user.id}`);
      setUserInfor(response.data);
      dispatch(updateInfor(userInfor));
    };
    fetchData();
  }, [refesh]);
  React.useEffect(() => {
    // if (userInfor.avatarUrl !== undefined) {
    setAvatarDataUrl(
      `data:image/jpeg;base64,${btoa(
        String.fromCharCode(...new Uint8Array(userInfor.avatarUrl))
      )}`
    );
    // }
    console.log(avatarDataUrl);
  }, []);
  const handleChangeInfor = (title: string, value: string | number) => {
    setUserInfor((prev) => {
      return {
        ...prev,
        [title]: value,
      };
    });
  };
  const handleUpdate = async () => {
    const formData = new FormData();

    formData.append("userName", userInfor.userName);
    formData.append("fullName", userInfor.fullName);
    formData.append("email", userInfor.email);
    formData.append("total", userInfor.total.toString());
    formData.append("password", userInfor.password);
    formData.append("address", userInfor.address);
    formData.append("birthDate", userInfor.birthDate);
    // if (file !== null) {
    //   formData.append("avatarUrl", file);
    // }
    checkNewPassword &&
      newPassword !== "" &&
      (await axiosClient
        .put(`/user/${user.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          dispatch(updateInfor(userInfor));
          let oldUser = localStorage.getItem("userLogin");
          if (oldUser !== null) {
            try {
              const parsedUser = JSON.parse(oldUser);
              localStorage.setItem(
                "userInfor",
                JSON.stringify({
                  ...parsedUser,
                  password: userInfor.password,
                  username: userInfor.userName,
                })
              );
            } catch (error) {
              console.error("Error parsing userLogin JSON:", error);
            }
          } else {
            console.log("userLogin is null");
          }

          errorMessage("success", "情報が正常に変更されました");
          setEdit(false);
        }));
    if (!(checkNewPassword && newPassword !== "")) {
      errorMessage("error", "すべての情報を入力してください");
    }
  };
  const handleCheckPassword = (newPassword: string) => {
    newPassword === userInfor.password
      ? setCheckNewPassword(true)
      : setCheckNewPassword(false);
  };
  const handleHiddenPassword = (type: string, value: boolean) => {
    setTypePassword((prev) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  };

  return (
    <div className="account">
      {contextHolder}
      <Row className="page-title">プロフィール</Row>
      <Row className="accout-overview">
        <Col className="overview-title">
          <p className="title">口座情報</p>
          <p className="sub-title">アカウント情報を更新</p>
        </Col>
        <Col className="avatar">
          <Avatar
            className="avt-image"
            size={86}
            icon={
              <UserOutlined />
              // <img src={file?.name} alt="avatar" />
            }

            // src={avatarDataUrl}/\
          />
          {/* {edit &&<label className="upload-file-label">
            <img src={avtEditIcon} alt="avt-icon" />
            <input
              className="upload-file"
              type="file"
              onChange={(e) => {handleFileChange(e)}}
              style={{opacity : 0}}
            />
          </label>} */}
          {/* <input
            className="upload-file"
            type="file"
            onChange={handleFileChange}
          /> */}
        </Col>
      </Row>
      <Row className="accout-content">
        <Row className="title">個人情報</Row>
        {!edit && (
          <Row>
            <Button
              className="edit-button"
              icon={<EditOutlined />}
              onClick={() => setEdit(true)}
            >
              編集
            </Button>
          </Row>
        )}
      </Row>
      <Row className="accout-infor">
        <Row gutter={[124, 16]}>
          <Col span={12}>
            <p className="attribute">ユーザー名</p>
            <Input
              className="infor-input"
              disabled={!edit}
              placeholder="ログイン名を入力してください"
              value={userInfor.userName}
              onChange={(e) => {
                handleChangeInfor("userName", e.target.value);
              }}
            ></Input>
          </Col>
          <Col span={12}>
            <p className="attribute">姓名</p>
            <Input
              className="infor-input"
              disabled={!edit}
              placeholder="名前を入力してください"
              value={userInfor.fullName}
              onChange={(e) => {
                handleChangeInfor("fullName", e.target.value);
              }}
            ></Input>
          </Col>
          <Col span={12}>
            <p className="attribute">苗字</p>
            <Input
              className="infor-input"
              disabled={!edit}
              placeholder="住み所を入力してください"
              value={userInfor.address}
              onChange={(e) => {
                handleChangeInfor("address", e.target.value);
              }}
            ></Input>
          </Col>

          <Col span={12}>
            <p className="attribute">メール</p>
            <Input
              className="infor-input"
              disabled={!edit}
              prefix={<MailFilled sizes="large" />}
              placeholder="binh@gmail.com"
              value={userInfor.email}
              onChange={(e) => {
                handleChangeInfor("email", e.target.value);
              }}
            ></Input>
          </Col>
        </Row>
        {edit && (
          <React.Fragment>
            <Row className="mt-40" gutter={[124, 0]}>
              <Col span={12}>
                <p className="attribute">新しいパスワード</p>
                <Input
                  type={typePassword.newPassword === true ? "password" : "text"}
                  prefix={<KeyOutlined />}
                  className="infor-input"
                  placeholder="Nguyen Binh"
                  suffix={
                    typePassword.newPassword ? (
                      <EyeOutlined
                        onClick={() =>
                          handleHiddenPassword("newPassword", false)
                        }
                      />
                    ) : (
                      <EyeInvisibleOutlined
                        onClick={() =>
                          handleHiddenPassword("newPassword", true)
                        }
                      />
                    )
                  }
                  onChange={(e) =>
                    handleChangeInfor("password", e.target.value)
                  }
                ></Input>
              </Col>
              <Col span={12}>
                <p className="attribute">パスワードを認証する</p>
                <Input
                  type={
                    typePassword.confirmPassword === true ? "password" : "text"
                  }
                  prefix={<KeyOutlined />}
                  className="infor-input"
                  placeholder="Nguyen Binh"
                  onFocus={() => setCheckNewPassword(true)}
                  onChange={(e) => {
                    setCheckNewPassword(true);
                    setNewPass(e.target.value);
                  }}
                  onBlur={(e) => handleCheckPassword(e.target.value)}
                  suffix={
                    typePassword.confirmPassword ? (
                      <EyeOutlined
                        onClick={() =>
                          handleHiddenPassword("confirmPassword", false)
                        }
                      />
                    ) : (
                      <EyeInvisibleOutlined
                        onClick={() =>
                          handleHiddenPassword("confirmPassword", true)
                        }
                      />
                    )
                  }
                ></Input>
              </Col>
              <Col span={12} offset={12}>
                {!checkNewPassword && (
                  <ErrorMessage errorText="再入力したパスワードが一致しません" />
                )}
              </Col>
            </Row>
            <Row gutter={[4, 32]} className="action">
              <Col>
                <Button
                  className="add-button"
                  type="primary"
                  shape="round"
                  onClick={handleUpdate}
                >
                  アップデート
                </Button>
              </Col>
            </Row>
          </React.Fragment>
        )}
      </Row>
    </div>
  );
}

export default Accout;
