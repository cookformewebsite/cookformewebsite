import React, { useState, useRef } from "react";
import AdminMenuCard from "./AdminMenuCard";
import { IbackgroundImage, IMenu } from "../../class/MenuClass";

function capitalize(params: string) {
  return params.trim().charAt(0).toUpperCase() + params.trim().slice(1);
}

function AddNewChefMenu({
  setMenuList,
  menu,
}: {
  setMenuList: React.Dispatch<React.SetStateAction<IMenu[]>>;
  menu: IMenu[];
}) {
  const [backgroundImage, setBackgroundImage] = useState<IbackgroundImage>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [familySize, setFamilySize] = useState("");
  const [partySize, setPartySize] = useState("");
  const [mixDish, setMixDish] = useState("");

  const backgroundImageRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const familySizeRef = useRef<HTMLInputElement>(null);
  const partySizeRef = useRef<HTMLInputElement>(null);
  const mixDishRef = useRef<HTMLInputElement>(null);

  return (
    <form className="flex flex-col gap-5">
      <div className="font-bold text-lg bg-gray-100 p-4 rounded">Add menu</div>
      <input
        onChange={(e) => {
          if (e.target.files) {
            const url = URL.createObjectURL(e.target.files[0]);
            setBackgroundImage({
              backgroundFile: e.target.files[0],
              temporaryUrl: url,
            });
          }
        }}
        required
        type="file"
        name="backgroundImage"
        ref={backgroundImageRef}
      />
      <input
        className="border-2 rounded p-2"
        placeholder="Menu title (required)"
        type="text"
        name="title"
        ref={titleRef}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex gap-4 flex-wrap">
        <input
          className="border-2 rounded p-2 w-52"
          placeholder="Family size price (required)"
          type="number"
          name="FamilySize"
          ref={familySizeRef}
          step=".01"
          required
          onChange={(e) => setFamilySize(e.target.value)}
        />
        <input
          className="border-2 rounded p-2 w-52"
          placeholder="Party size price (required)"
          type="number"
          name="PartySize"
          ref={partySizeRef}
          step=".01"
          required
          onChange={(e) => setPartySize(e.target.value)}
        />
        <input
          className="border-2 rounded p-2 w-52"
          placeholder="Mix dish price (required)"
          type="number"
          name="MixDish"
          ref={mixDishRef}
          step=".01"
          required
          onChange={(e) => setMixDish(e.target.value)}
        />
      </div>
      <textarea
        className="border-2 rounded p-2 h-40"
        placeholder="Description (required)"
        name="description"
        ref={descriptionRef}
        maxLength={250}
        required
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button
        type="button"
        onClick={() => {
          if (title.trim() !== "" && description.trim() !== "") {
            const newMenu: IMenu = {
              type: "menu",
              backgroundImage: {
                backgroundFile: backgroundImage?.backgroundFile,
                temporaryUrl: backgroundImage?.temporaryUrl,
              },
              price: {
                familySize: Number(familySize),
                partySize: Number(partySize),
                mixDish: Number(mixDish),
              },
              id: Date.now().toString(),
              title: capitalize(title),
              description: capitalize(description),
            };
            setMenuList([...menu, newMenu]);
            if (
              descriptionRef.current != null &&
              backgroundImageRef.current != null &&
              titleRef.current != null &&
              familySizeRef.current != null &&
              partySizeRef.current != null &&
              mixDishRef.current != null
            ) {
              setMixDish("");
              setFamilySize("");
              setPartySize("");
              setTitle(""), setDescription("");
              descriptionRef.current.value = "";
              titleRef.current.value = "";
              backgroundImageRef.current.value = "";
              familySizeRef.current.value = "";
              partySizeRef.current.value = "";
              mixDishRef.current.value = "";
            }
          }
        }}
        className="bg-yellow-500 rounded text-white py-2  w-52"
      >
        Add new menu
      </button>
      <div className="font-bold text-lg bg-gray-100 p-4 rounded">All menu</div>
      <div className="flex flex-col space-y-4">
        {menu?.length < 1 ? (
          <div className="bg-gray-50 text-xl text-center  py-10">
            No menu added yet
          </div>
        ) : (
          menu?.map((e) => {
            return (
              <div key={e.id}>
                <AdminMenuCard
                  setMenuList={setMenuList}
                  menu={{
                    backgroundImage: e.backgroundImage,
                    price: e.price,
                    type: e.type,
                    title: e.title,
                    description: e.description,
                    id: e.id,
                  }}
                  menuList={menu}
                />
              </div>
            );
          })
        )}
      </div>
    </form>
  );
}

export default AddNewChefMenu;
