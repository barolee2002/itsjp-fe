export type incomes = {
    incomeId : number,
    amount : number,
    time : string,
    userId : number,
    category : string,
    key : number
}
export type pays = {
    spendingId : number,
    amount : number,
    time : string,
    key : number,
    category : string,
}
export type chartType = {
    id : number,
    amount : number,
    time : string,
    key : number,
    category : string,
}
export type paymentsPlan = {
    plannerId : number,
    // category : string,
    amount : number,
    key : number,
    userId : number,
    fromTime : string,
    toTime : string
}
export type userInfor={
    id : number,
    userName : string,
    fullName : string,
    address : string,
    email : string
    avatarUrl: string,
    password : string,
    total : number,
}
export type userLogin ={
    id: number,
    username : string,
    token : string,
    expireTime : number,
    isLogin : boolean,
    password : string
}

export type metadata = {
    totalPages : number,
    totalElements : number,
    elements : number,
}