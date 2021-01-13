import React from "react";
import Image from "next/image";
import PackageButton from "../component/PackageButton";
import AddQuantity from "../component/AddQuantity";
import { useCard } from "../../lib/useUser";
import Menu from "../../class/MenuClass";
import { priceByPackage } from "../../lib/useUser";

function CheckoutCardMenu({ page, menu }: { page: string; menu?: Menu }) {
  const card = useCard();

  return (
    <>
      {menu ? (
        <div key={menu.id} className="flex-col shadow space-y-2 ">
          <div className="flex">
            <Image
              className="object-cover"
              src={menu.backgroundImage.backgroundImage}
              alt="Picture of the author"
              height={80}
              width={100}
            />
            <div className="pt-2 pl-2 pr-2 w-full">
              <div className="flex gap-4 items-start">
                <p className="font-bold flex-1 ">{menu.title}</p>
                <p className="font-bold flex-none">
                  {menu.type == "menu"
                    ? priceByPackage(menu, menu.package)
                    : menu.price}
                  CAD
                </p>
                {page == "CHECKOUT_PAGE" || page == "SIDE_BAR_PAGE" ? (
                  <Image
                    onClick={() =>
                      card?.dispatchCard({
                        type: "REMOVE_MENU",
                        payload: { id: menu.id },
                      })
                    }
                    className="cursor-pointer flex-none"
                    src="/trash_icon.svg"
                    height={23}
                    width={15}
                  />
                ) : null}
              </div>
              <p className="text-xs">{menu.description}</p>
            </div>
          </div>

          <div className="p-2 space-y-2">
            {menu.type === "menu" ? (
              <div className="flex flex-col sm:flex-row  items-start  sm:items-center  justify-start">
                <div className="font-bold mr-6 pb-2">Package</div>
                <div className="flex flex-wrap">
                  {page == "PRINT_PAGE" ? (
                    <PackageButton menu={menu} text={menu.package} />
                  ) : (
                    <>
                      <PackageButton menu={menu} text="Family size" />
                      <PackageButton menu={menu} text="Party size" />
                      <PackageButton menu={menu} text="Mix dish" />
                    </>
                  )}
                </div>
              </div>
            ) : null}
            <div className="flex flex-col sm:flex-row  items-start  sm:items-center  justify-start">
              <div className="font-bold mr-5 pb-2">Quantity</div>
              {page == "PRINT_PAGE" ? (
                menu.quantity
              ) : (
                <AddQuantity menu={menu} />
              )}
            </div>
          </div>
          {page == "CHEF_PAGE" ? (
            <div
              onClick={() => {
                card?.dispatchCard({
                  type: "ADD_MENU",
                  payload: {
                    menu: menu,
                  },
                });
              }}
              className="buttonBase text-xl font-bold"
            >
              Add to card
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export default CheckoutCardMenu;
