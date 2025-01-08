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

export interface UserProfile {
   firstName: string;
   lastName: string;
   email: string;
   bio?: string;
   city?: string;
   socialLinks?: {
      twitter?: string;
      facebook?: string;
      instagram?: string;
   };
}
