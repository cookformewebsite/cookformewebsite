import React from "react";
import Image from "next/image";
import { IMenu } from "../../class/MenuClass";
import PriceCard from "./PriceCard";

function AdminMenuCard({
  setMenuList,
  menu,
  menuList,
}: {
  setMenuList: React.Dispatch<React.SetStateAction<IMenu[]>>;
  menu: IMenu;
  menuList: IMenu[];
}) {

  return (
    <div key={menu?.id} className="flex-col shadow overflow-hidden">
      <div className="flex">
        {menu?.backgroundImage.temporaryUrl ? (
          <img
            className="object-cover"
            src={menu?.backgroundImage.temporaryUrl}
            alt="Italian Trulli"
            width="80"
            height="80"
          />
        ) : null}

        <div
          className={`flex w-full justify-between items-center
           p-2
          `}
        >
          <div>
            <p className="font-bold text-2xl">{menu?.title}</p>
            <p>{menu?.description}</p>
          </div>

          <button
            onClick={() =>
              setMenuList(menuList.filter((e) => e.id != menu?.id))
            }
            className="buttonBase bg-red-500 hover:bg-red-300 ml-6"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap pt-2">
        <PriceCard text={"Family size price"} price={menu?.price.familySize} />
        <PriceCard text={"Party size price"} price={menu?.price.partySize} />
        <PriceCard text={"Mix dish price"} price={menu?.price.mixDish} />
      </div>
    </div>
  );
}

export default AdminMenuCard;
