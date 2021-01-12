import firebase from "firebase";

export default class User {
  name: string | null;
  email: string | null;
  constructor(user: firebase.User) {
    this.name = user.displayName;
    this.email = user.email;
  }
}
