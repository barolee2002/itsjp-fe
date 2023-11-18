import { userLogin } from './interface/interface';

// Lấy thông tin người dùng
const userLoginString: string | null = sessionStorage.getItem('userInfo');
export const user: userLogin | null = userLoginString ? JSON.parse(userLoginString) : null;