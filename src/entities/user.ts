export default class User {
  token: string;
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
  static token: string;

  constructor(token: string, id?: number, name?: string, email?: string, avatar?: string) {
    this.token = token;
    this.id = id;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
  }
}
