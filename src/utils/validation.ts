interface Props {
    input : string,
    newPassword : string
}

const validation = (props: Props) => {
    const isEmailValid = isEmail(props.input);
    const isPasswordValid = validPassword(props.input, props.newPassword);
    const isRequied = checkRequied(props.input)
    const isValidPassword = checkStringPassword(props.input)
    return {
        isEmailValid,
        isPasswordValid,
        isRequied,
        isValidPassword
    };
};

const isEmail = (string: string) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return {
        result : regex.test(string),
        messError : regex.test(string) ? undefined : "これはメールではありません"
    };
};

const validPassword = (oldPassword: string, newPassword: string) => {
    return {
        result : oldPassword === newPassword,
        messError : oldPassword === newPassword ? undefined : "再入力したパスワードが一致しません"
    }
};
const checkRequied = (string : string) => {
    return {
        result : string !== '',
        messError : string !== '' ? undefined : "フィールドを空白のままにすることはできません"
    }
}
const checkStringPassword = (string : string) => {
    return {
        result : string.match(' ') === null,
        messError : string.match(' ') === null ? undefined : "パスワードにはスペースを含めることはできません"
    }
}



export default validation;
