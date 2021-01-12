import React from "react";
import Image from "next/image";
import Menu from "../../../class/MenuClass";
import { deleteChefMenu, deletFileInFirestore } from "../../../lib/firestoreDb";
import PriceCard from "../PriceCard";

function DeleteMenuCard({ chefId, menu }: { chefId: string; menu?: Menu }) {
  return (
    <div>
      {menu ? (
        <div key={menu.id} className="flex-col shadow overflow-hidden">
          <div className="flex gap-5 pr-5 items-center">
            <Image
              src={menu.backgroundImage.backgroundImage}
              alt="Picture of the author"
              height={100}
              width={100}
            />
            <div className="flex w-full justify-between items-center">
              <div>
                <p className="font-bold">{menu.title}</p>
                <p>{menu.description}</p>
              </div>
            </div>
            <div className="w-24 text-right">
              <div
                onClick={() => {
                  deletFileInFirestore(
                    "/menus/" + menu.backgroundImage.filePathToFirestore,
                    async function onCompleteFunction() {
                      deleteChefMenu(chefId, menu.id);
                    }
                  );
                }}
                className="text-red-600 font-bold cursor-pointer hover:text-red-400"
              >
                Delete
              </div>
              <p className="font-bold flex-none">{menu.price.familySize} CAD</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap pt-2">
            <PriceCard
              text={"Family size price"}
              price={menu?.price.familySize}
            />
            <PriceCard
              text={"Party size price"}
              price={menu?.price.partySize}
            />
            <PriceCard text={"Mix dish price"} price={menu?.price.mixDish} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default DeleteMenuCard;
