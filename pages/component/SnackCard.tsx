import React from "react";
import { useAuth } from "../../lib/useUser";
import Image from "next/image";
import { useCard } from "../../lib/useUser";
import Menu from "../../class/MenuClass";

function SnackCard({ snack }: { snack?: Menu }) {
  const auth = useAuth();
  const card = useCard();

  return (
    <div>
      {snack ? (
        <div className="bg-white flex flex-col w-52 sm:w-64 shadow-lg h-auto flex-none">
          <Image
            className="object-cover"
            src={snack.backgroundImage.backgroundImage}
            alt="Picture of the author"
            height={120}
            width={215}
          />
          <div className="flex-1 p-2">
            <div className="flex w-full justify-between items-center font-bold">
              <p className="text-sm">{snack.title}</p>
              <p className="text-sm">{snack.price} CAD</p>
            </div>
            <p className="text-xs">{snack.description}</p>
          </div>
          {!auth?.user ? (
            <div
              onClick={() => {
                snack.quantity = 1;
                snack.package = "Family size";
                card?.dispatchCard({
                  type: "ADD_MENU",
                  payload: {
                    menu: snack,
                  },
                });
              }}
              className="buttonBase font-bold"
            >
              Add to card
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default SnackCard;
