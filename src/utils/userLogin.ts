
const userLoginString: string | null = sessionStorage.getItem('userInfo');
export const token: string | null = userLoginString ? JSON.parse(userLoginString).token : null;