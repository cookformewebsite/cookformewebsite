import React, { useRef, useEffect, useState } from "react";
import { addMenu, saveImageToFireStorage } from "../../../lib/firestoreDb";
import Menu from "../../../class/MenuClass";
import DeleteMenuCard from "./DeleteMenuCard";
import { listenToMenu } from "../../../lib/firestoreDb";

function capitalize(params: string) {
  return params.trim().charAt(0).toUpperCase() + params.trim().slice(1);
}

function AddOrRemoveChefMenu({ chefId }: { chefId: string }) {
  const [menuList, setMenuList] = useState<Menu[] | undefined>(undefined);
  const menuName = useRef<HTMLInputElement>(null);
  const menuDescription = useRef<HTMLTextAreaElement>(null);
  const familySizeRef = useRef<HTMLInputElement>(null);
  const partySizeRef = useRef<HTMLInputElement>(null);
  const mixDishRef = useRef<HTMLInputElement>(null);
  const menuImage = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listenToMenu(chefId, setMenuList);
  }, []);

  return (
    <>
      <form
        onSubmit={async (data) => {
          if (
            menuName.current !== null &&
            familySizeRef.current !== null &&
            partySizeRef.current !== null &&
            mixDishRef.current !== null &&
            menuDescription.current !== null &&
            menuImage !== null &&
            menuImage.current !== null &&
            menuImage.current.files !== null &&
            menuName.current.value.trim() !== "" &&
            familySizeRef.current.value.trim() !== "" &&
            partySizeRef.current.value.trim() !== "" &&
            mixDishRef.current.value.trim() !== "" &&
            menuDescription.current.value.trim() !== ""
          ) {
            data.preventDefault();
            const {
              downloadURL,
              filePathToFirestore,
            } = await saveImageToFireStorage(
              "/menus/",
              menuImage.current.files[0]
            );
            if (
              menuName.current !== null &&
              familySizeRef.current !== null &&
              partySizeRef.current !== null &&
              mixDishRef.current !== null &&
              menuDescription.current !== null &&
              menuImage.current !== null &&
              menuName.current.value.trim() !== "" &&
              familySizeRef.current.value.trim() !== "" &&
              partySizeRef.current.value.trim() !== "" &&
              mixDishRef.current.value.trim() !== "" &&
              menuDescription.current.value.trim() !== ""
            ) {
              addMenu({
                chefId: chefId,
                description: capitalize(menuDescription.current.value.trim()),
                price: {
                  familySize: Number(familySizeRef.current.value.trim()),
                  partySize: Number(partySizeRef.current.value.trim()),
                  mixDish: Number(mixDishRef.current.value.trim()),
                },
                title: capitalize(menuName.current.value.trim()),
                type: "menu",
                backgroundImage: {
                  backgroundImage: downloadURL,
                  filePathToFirestore: filePathToFirestore,
                },
              });
              menuName.current.value = "";
              menuDescription.current.value = "";
              familySizeRef.current.value = "";
              partySizeRef.current.value = "";
              mixDishRef.current.value = "";
              menuImage.current.value = "";
            }
          }
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col gap-5 mb-10">
            <input
              type="file"
              name="backgroundImage"
              required
              ref={menuImage}
            />
            <input
              className="border-2 rounded p-2"
              placeholder="Menu name"
              type="text"
              name="title"
              required
              ref={menuName}
            />
            <div>
              <div className="flex gap-4 flex-wrap">
                <input
                  className="border-2 rounded p-2 w-52"
                  placeholder="Family size price (required)"
                  type="number"
                  name="FamilySize"
                  ref={familySizeRef}
                  step=".01"
                  required
                />
                <input
                  className="border-2 rounded p-2 w-52"
                  placeholder="Party size price (required)"
                  type="number"
                  name="PartySize"
                  ref={partySizeRef}
                  step=".01"
                  required
                />
                <input
                  className="border-2 rounded p-2 w-52"
                  placeholder="Mix dish price (required)"
                  type="number"
                  name="MixDish"
                  ref={mixDishRef}
                  step=".01"
                  required
                />
              </div>
            </div>
            <textarea
              className="border-2 rounded p-2 h-40"
              placeholder="Menu description"
              name="description"
              required
              ref={menuDescription}
            ></textarea>
            <button
              type="submit"
              className=" bg-yellow-500 rounded text-white py-3 font-bold text-2xl"
            >
              Add new menu
            </button>
            <div className="text-lg font-bold bg-gray-50 p-5 my-5">
              All menus
            </div>
            <div className="space-y-5">
              {chefId &&
                menuList?.map((e) => (
                  <div key={e.id}>
                    <DeleteMenuCard chefId={chefId} menu={e} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddOrRemoveChefMenu;
