export class User {

  name: string;
  surname: string;
  email: string;
  password: string;
  type: boolean;
  media: string;

  constructor(name: string, surname: string, email: string, password: string, type: boolean, media: string) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.type = type;
    this.media = media;
  }
}
