interface Props {
    errorText : string
}
export const ErrorMessage = ({errorText} : Props) => {
    return (
        <div>
            <p style={styles.error}>{errorText}</p>
        </div>
    );
};

const styles = {
    error: {
        // padding: '12px',
        // border: '1px solid rgb(245, 33, 40)',
        color: 'rgb(245, 33, 40)',
        // margin : 0
        marginBottom: 0,
    },
};
