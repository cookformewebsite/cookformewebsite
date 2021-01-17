import firebase from "firebase";

export interface IPrice {
  familySize: number;
  partySize: number;
  mixDish: number;
}

export interface IbackgroundImage {
  backgroundFile: File | undefined;
  temporaryUrl: string | undefined;
}

export interface IbackgroundImageFromFirestore {
  backgroundImage: string;
  filePathToFirestore: string;
}

export interface IMenuCard {
  id?: string;
  title: string;
  description: string;
  price: any | number;
  type: string;
  backgroundImage: IbackgroundImageFromFirestore;
  quantity: number;
  package: string;
}

export interface IMenu {
  id?: string;
  title: string;
  description: string;
  price: any | number;
  type: string;
  backgroundImage: IbackgroundImage;
}

export default class Menu {
  id: string;
  title: string;
  description: string;
  price: any | number;
  type: string;
  quantity: number;
  package: string;
  backgroundImage: IbackgroundImageFromFirestore;
  documentReference: string;

  constructor(
    documentSnapshote: firebase.firestore.DocumentData,
    type: string
  ) {
    this.id = documentSnapshote.id;
    this.title = documentSnapshote.get("title");
    this.description = documentSnapshote.get("description");
    this.price = documentSnapshote.get("price");
    this.type = type;
    this.quantity = 1;
    this.backgroundImage = documentSnapshote.get("backgroundImage");
    this.package = "Family size";
    this.documentReference = documentSnapshote.ref.path;
  }
}
