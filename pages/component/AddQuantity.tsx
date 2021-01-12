import React from "react";
import Menu from "../../class/MenuClass";
import { useCard } from "../../lib/useUser";

function AddquantityAndPackage({ menu }: { menu: Menu }) {
  const card = useCard();

  return (
    <div className="flex gap-4 items-center">
      <button
        onClick={() => {
          if (
            card &&
            !(card?.card.menu.filter((e) => e.id === menu.id).length > 0)
          ) {
            menu.quantity = menu.quantity += 1;
          }

          card?.dispatchCard({
            type: "ADD_QUANTITY",
            payload: { id: menu.id },
          });
        }}
        className="hover:bg-yellow-300 px-5 py-2 cursor-pointer shadow-md text-center font-black focus:outline-none"
      >
        +
      </button>
      {menu?.quantity}
      <button
        onClick={() => {
          if (
            card &&
            !(card?.card.menu.filter((e) => e.id === menu.id).length > 0) &&
            menu.quantity > 1
          ) {
            menu.quantity = menu.quantity -= 1;
          }

          card?.dispatchCard({
            type: "REDUCE_QUANTITY",
            payload: { id: menu.id },
          });
        }}
        className="hover:bg-yellow-300 px-5 py-2 cursor-pointer shadow-md text-center font-black focus:outline-none"
      >
        -
      </button>
    </div>
  );
}

export default AddquantityAndPackage;
