export type incomes = {
  incomeId: number;
  name: string;
  amount: number;
  time: string;
  userId: number;
  category: string;
  key: number;
};
export type pays = {
  spendingId: number;
  name: string;
  amount: number;
  time: string;
  key: number;
  category: string;
};
export type chartType = {
  id: number;
  name: string;
  amount: number;
  time: string;
  key: number;
  category: string;
};
export type paymentsPlan = {
  id : number;
  plannerId: number;
  name: string;
  category : string,
  spentMoney : number;
  amount: number;
  key: number;
  userId: number;
  time: string;
};
export type userInfor = {
  id: number;
  userName: string;
  fullName: string;
  birthDate: string;
  address: string;
  email: string;
  avatarUrl: ArrayBuffer | Uint8Array;
  password: string;
  total: number;
};
export type userLogin = {
  id: number;
  username: string;
  token: string;
  expireTime: number;
  isLogin: boolean;
  password: string;
};

export type metadata = {
  totalPages: number;
  totalElements: number;
  elements: number;
};
