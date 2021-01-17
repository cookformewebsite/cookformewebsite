import React, { useRef, useReducer } from "react";
import CheckoutCardMenu from "./CheckoutCardMenu";
import { useRouter } from "next/router";
import EmptyProduct from "./EmptyProduct";
import Image from "next/image";
import { useCard } from "../../lib/useUser";

function SideBardCard() {
  const router = useRouter();
  const card = useCard();

  return card?.card.showSideBar ? (
    <div className="bg-black fixed flex justify-end  bg-opacity-60 inset-0 z-10 ">
      <div className="bg-white mt-12 flex flex-col space-y-4 p-2 sm:p-5 overflow-scroll w-11/12  md:w-2/3 lg:w-1/2 shadow-2xl">
        <div className="flex justify-end">
          <Image
            onClick={() =>
              card?.dispatchCard({
                type: "HIDDE_DIALOG",
                payload: {},
              })
            }
            className="cursor-pointer"
            src="/cancel_icon.svg"
            height={30}
            width={30}
          />
        </div>
        <h2 className="text-4xl font-bold">Orders details</h2>
        <section className="flex-1 space-y-2">
          {card.card.menu.length > 0 ? (
            card.card.menu.map((e) => (
              <div key={e.id}>
                <CheckoutCardMenu page="SIDE_BAR_PAGE" menu={e} />
              </div>
            ))
          ) : (
            <EmptyProduct />
          )}
        </section>
        <h2 className="text-xl font-bold py-5">
          <p>{`TOTAL : ${card.card.total} CAD`}</p>
        </h2>
        <div
          onClick={() => {
            card.dispatchCard({ type: "HIDDE_DIALOG", payload: {} });
            router.push("https://mymealplans.ca/Checkout");
          }}
          className="buttonBase text-2xl font-bold py-3"
        >
          Go to checkout page
        </div>
      </div>
    </div>
  ) : null;
}

export default SideBardCard;
