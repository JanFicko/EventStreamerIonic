export class User {

  name: string;
  surname: string;
  email: string;
  password: string;
  password2: string;
  type: boolean;
  media: string;

  constructor(name: string, surname: string, email: string, password: string, password2: string, type: boolean,
              media: string) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.password2 = password2;
    this.type = type;
    this.media = media;
  }
}
