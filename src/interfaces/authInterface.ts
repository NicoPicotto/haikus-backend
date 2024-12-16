export interface UserRegisterBody {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
}

export interface UserLoginBody {
   email: string;
   password: string;
}
