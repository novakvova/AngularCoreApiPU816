export class User {
  id: number;
  phoneNumber: string;
  email: string;
  image: string;
  age: number;
  emailConfirmed: boolean;
}

export class UserEdit {
  id: number;
  phone: string;
  image: string;
  age: number;
}

export class UserEditModel {
  id: number;
  phone: string;
  imageBase64: string;
  age: number;
}
