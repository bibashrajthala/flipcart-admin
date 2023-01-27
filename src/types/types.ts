export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegisterData extends UserLoginData {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  categoryImage?: string;
  children: Category[];
}
