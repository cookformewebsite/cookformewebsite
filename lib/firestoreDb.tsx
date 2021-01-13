import firebase from "./initFirebase";
import Chef, { IChef } from "../class/ChefClass";
import Menu, { IMenu } from "../class/MenuClass";

const firestore = firebase.firestore();
const firestorage = firebase.storage();

export async function createChef(
  chef: IChef,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    let docRef = await firestore.collection("chefs").add({
      fullName: chef.fullName,
      description: chef.description,
      city: chef.city,
      typeOfFood: chef.typeOfFood,
      backgroundImage: {
        backgroundImage: chef.backgroundImage.backgroundImage,
        filePathToFirestore: chef.backgroundImage.filePathToFirestore,
      },
    });

    for await (const menu of chef.menus) {
      const { downloadURL, filePathToFirestore } = await saveImageToFireStorage(
        "/menus/",
        menu.backgroundImage.backgroundFile!
      );
      await firestore
        .collection("chefs")
        .doc(docRef.id)
        .collection("menus")
        .add({
          backgroundImage: {
            backgroundImage: downloadURL,
            filePathToFirestore: filePathToFirestore,
          },
          title: menu.title,
          description: menu.description,
          type: menu.type,
          price: {
            familySize: menu.price.familySize,
            partySize: menu.price.partySize,
            mixDish: menu.price.mixDish,
          },
        });
    }
    setLoading(false);
    location.reload();
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export function changeChefBackgroundImage(
  chefId: string,
  backgroundImage: string,
  filePathToFirestore: string
) {
  firestore
    .collection("chefs")
    .doc(chefId)
    .set(
      {
        backgroundImage: {
          backgroundImage: backgroundImage,
          filePathToFirestore: filePathToFirestore,
        },
      },
      { merge: true }
    );
}

export function changeChefData(
  chefId: string,
  fullName: string,
  description: string,
  city: string,
  typeOfFood: string
) {
  firestore.collection("chefs").doc(chefId).set(
    {
      fullName: fullName,
      description: description,
      city: city,
      typeOfFood: typeOfFood,
    },
    { merge: true }
  );
}

export async function deleteChef(chef: Chef) {
  const menusQuerySnapshot = await firestore
    .collection("chefs")
    .doc(chef.id)
    .collection("menus")
    .get();

  for (let i = 0; i < menusQuerySnapshot.docs.length; i++) {
    await deletFileInFirestore(
      "/menus/" +
        menusQuerySnapshot.docs[i].get("backgroundImage").filePathToFirestore,
      async function onCompleteFunction() {
        menusQuerySnapshot.docs[i].ref.delete();
      }
    );
  }

  await firestore.collection("chefs").doc(chef.id).delete();
  location.reload();
}

export async function listenToChef(
  chefId: string,
  setChef: React.Dispatch<React.SetStateAction<Chef | undefined>>
) {
  await firestore
    .collection("chefs")
    .doc(chefId)
    .onSnapshot(async function (doc) {
      let chef: Chef = new Chef(doc, []);

      setChef(chef);
    });
}

export async function listenToMenu(
  chefId: string,
  setMenu: React.Dispatch<React.SetStateAction<Menu[] | undefined>>
) {
  await firestore
    .collection("chefs")
    .doc(chefId)
    .collection("menus")
    .onSnapshot(async function (doc) {
      let menuList: Menu[] = [];

      for (let i = 0; i < doc.docs.length; i++) {
        menuList.push(new Menu(doc.docs[i], "menu"));
      }
      setMenu(menuList);
    });
}

export async function deleteChefMenu(chefId: string, menuId: string) {
  await firestore
    .collection("chefs")
    .doc(chefId)
    .collection("menus")
    .doc(menuId)
    .delete();
}

export async function saveImageToFireStorage(
  path: string,
  backgroundImage: File /*backgroundImage or file*/
) {
  // Upload file and metadata to the object 'images/mountains.jpg'

  let filePathToFirestore = backgroundImage.name + Date.now();
  var uploadTask = await firestorage
    .ref()
    .child(path + filePathToFirestore)
    .put(backgroundImage);

  let downloadURL = await uploadTask.ref.getDownloadURL();
  return { downloadURL: downloadURL, filePathToFirestore: filePathToFirestore };
}

export async function addTypeOfFood(typeOfFood: string) {
  return await firestore
    .collection("typeOfFood")
    .doc("typeOfFood")
    .set(
      {
        typeOfFood: firebase.firestore.FieldValue.arrayUnion(typeOfFood),
      },
      { merge: true }
    );
}

export async function getTypeOfFood(setTypeOfFood: Function) {
  firestore
    .collection("typeOfFood")
    .doc("typeOfFood")
    .onSnapshot(function (doc) {
      setTypeOfFood(doc.get("typeOfFood"));
    });
}

export async function deleteTypeOfFood(typeOfFood: string) {
  firestore
    .collection("typeOfFood")
    .doc("typeOfFood")
    .set(
      {
        typeOfFood: firebase.firestore.FieldValue.arrayRemove(typeOfFood),
      },
      { merge: true }
    );
}

export async function addCity(city: string) {
  return await firestore
    .collection("cities")
    .doc("cities")
    .set(
      {
        cities: firebase.firestore.FieldValue.arrayUnion(city),
      },
      { merge: true }
    );
}

export async function getCities(setCities: Function) {
  firestore
    .collection("cities")
    .doc("cities")
    .onSnapshot(function (doc) {
      setCities(doc.get("cities"));
    });
}

export async function deleteCities(city: string) {
  firestore
    .collection("cities")
    .doc("cities")
    .set(
      {
        cities: firebase.firestore.FieldValue.arrayRemove(city),
      },
      { merge: true }
    );
}

export async function getSnacks(setSnacks: Function) {
  firestore.collection("snacks").onSnapshot(async function (doc) {
    let snacksList: Menu[] = [];

    for (let i = 0; i < doc.docs.length; i++) {
      snacksList.push(new Menu(doc.docs[i], "menu"));
    }
    setSnacks(snacksList);
  });
}

export async function getAllSnacks(setSnacks: Function) {
  firestore
    .collection("snacks")
    .get()
    .then(async function (doc) {
      let snacksList: Menu[] = [];

      for (let i = 0; i < doc.docs.length; i++) {
        snacksList.push(new Menu(doc.docs[i], "snack"));
      }

      setSnacks(snacksList);
    });
}

export async function addSnack({
  title,
  description,
  price,
  type,
  backgroundImage,
}: {
  title: string;
  description: string;
  price: number;
  type: string;
  backgroundImage: { backgroundImage: string; filePathToFirestore: string };
}) {
  return await firestore
    .collection("snacks")
    .doc()
    .set({
      backgroundImage: {
        backgroundImage: backgroundImage.backgroundImage,
        filePathToFirestore: backgroundImage.filePathToFirestore,
      },
      title: title,
      description: description,
      price: price,
      type: type,
    });
}

export async function addMenu({
  title,
  description,
  price,
  type,
  backgroundImage,
  chefId,
}: {
  chefId: string;
  title: string;
  description: string;
  price: {
    familySize: number;
    partySize: number;
    mixDish: number;
  };
  type: string;
  backgroundImage: { backgroundImage: string; filePathToFirestore: string };
}) {
  return await firestore
    .collection("chefs")
    .doc(chefId)
    .collection("menus")
    .doc()
    .set({
      backgroundImage: {
        backgroundImage: backgroundImage.backgroundImage,
        filePathToFirestore: backgroundImage.filePathToFirestore,
      },
      title: title,
      description: description,
      price: price,
      type: type,
    });
}

export async function deleteSnack(id: string) {
  firestore.collection("snacks").doc(id).delete();
}

export async function deletFileInFirestore(
  filePath: string /**eg: 'images/desert.jpg' */,
  onCompleteFunction: Function
) {
  try {
    // Create a reference to the file to delete
    await firestorage.ref().child(filePath).delete();
    // File deleted successfully
    await onCompleteFunction();
  } catch (error) {
    // Uh-oh, an error occurred!
    console.log(error);
  }
}

export async function getListOfChefOnly(
  city: string,
  typeOfFood: string,
  setChefs: React.Dispatch<React.SetStateAction<Chef[]>>
) {
  let listeOfChefsFind:
    | firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
    | undefined = undefined;
  let chefList: Chef[] = [];
  if (city === "All" && typeOfFood === "All") {
    listeOfChefsFind = await firestore.collection("chefs").get();
  } else if (city !== "All" && typeOfFood === "All") {
    listeOfChefsFind = await firestore
      .collection("chefs")
      .where("city", "==", city)
      .get();
  } else if (city === "All" && typeOfFood !== "All") {
    listeOfChefsFind = await firestore
      .collection("chefs")
      .where("typeOfFood", "==", typeOfFood)
      .get();
  } else if (city !== "All" && typeOfFood !== "All") {
    listeOfChefsFind = await firestore
      .collection("chefs")
      .where("city", "==", city)
      .where("typeOfFood", "==", typeOfFood)
      .get();
  }
  if (listeOfChefsFind) {
    for (let i = 0; i < listeOfChefsFind?.docs.length; i++) {
      chefList.push(new Chef(listeOfChefsFind.docs[i], []));
    }
    setChefs(chefList);
  }
}

export async function getFilters(
  setCities: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  setTypeOfFood: React.Dispatch<React.SetStateAction<string[] | undefined>>
) {
  let typeOfFood: string[] = [];
  let cities: string[] = [];

  const citiesSnapshot = await firestore
    .collection("cities")
    .doc("cities")
    .get();

  const typeOfFoodSnapshot = await firestore
    .collection("typeOfFood")
    .doc("typeOfFood")
    .get();

  cities = citiesSnapshot.get("cities");
  typeOfFood = typeOfFoodSnapshot.get("typeOfFood");

  setCities(cities);
  setTypeOfFood(typeOfFood);
}
