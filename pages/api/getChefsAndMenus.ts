import type { NextApiRequest, NextApiResponse } from "next";
import Chef from "../../class/ChefClass";
import firebase from "../../lib/initFirebase";
import Menu from "../../class/MenuClass";

const firestore = firebase.firestore();
export default async (req: NextApiRequest, res: NextApiResponse) => {
  let chefsFind: Chef;
  chefsFind = await getChefByDocumentId(req.query.id as string);
  res.send(chefsFind);
};

export async function getChefByDocumentId(documentId: string) {
  let chefSnapshot = await firestore.collection("chefs").doc(documentId).get();
  let menuQuerySnapshot = await firestore
    .collection("chefs")
    .doc(documentId)
    .collection("menus")
    .get();
  let menusList = menuQuerySnapshot.docs.map((doc) => new Menu(doc, "menu"));
  let chef = new Chef(chefSnapshot, menusList);
  return chef;
}
