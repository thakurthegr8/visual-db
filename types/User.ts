export interface userType{
    uid:string;
    isLoggedIn:boolean;
}

export interface userSetterPair {
    user:userType;
    updateUser: (user: userType) => void;
}