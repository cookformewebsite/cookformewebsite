import Menu, { IbackgroundImageFromFirestore, IMenu } from "./MenuClass";
import firebase from "firebase";

export interface IChefBackgroundImageFromFirestore {
  backgroundImage: string;
  filePathToFirestore: string;
}

//to create a new chef with menus
export interface IChef {
  backgroundImage: IbackgroundImageFromFirestore;
  fullName: string;
  typeOfFood: string;
  city: string;
  description: string;
  menus: IMenu[];
}

export default class Chef {
  id: string;
  backgroundImage: IChefBackgroundImageFromFirestore;
  fullName: string;
  typeOfFood: string;
  city: string;
  description: string;
  documentReference: string;
  menus: Menu[];

  constructor(
    documentSnapshot: firebase.firestore.DocumentData,
    menus: Menu[]
  ) {
    this.id = documentSnapshot.id;
    this.backgroundImage = documentSnapshot.get("backgroundImage");
    this.fullName = documentSnapshot.get("fullName");
    this.description = documentSnapshot.get("description");
    this.typeOfFood = documentSnapshot.get("typeOfFood");
    this.city = documentSnapshot.get("city");
    this.documentReference = documentSnapshot.ref.path;
    this.menus = menus;
  }
}
