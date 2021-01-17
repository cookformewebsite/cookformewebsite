import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../lib/useUser";
import { useCard } from "../../lib/useUser";
import { useRouter } from "next/router";

function Navigation() {
  const auth = useAuth();
  const card = useCard();
  const router = useRouter();

  return (
    <div className="fixed w-screen pl-5 pr-10 sm:px-16 bg-white flex justify-between items-center shadow-md z-20 ">
      <Link
        href={
          auth?.user
            ? "https://mymealplans.ca/admin"
            : "https://mymealplans.ca/"
        }
      >
        <a>
          <div className="flex flex-col sm:flex-row justify-center items-center sm:gap-1">
            <Image
              src="/logo_img.png"
              alt="Picture of the author"
              height={55}
              width={55}
              quality={100}
            />
            <p className="font-logo text-2xl font-semibold">Cook for me</p>
          </div>
        </a>
      </Link>
      <div className="flex gap-10 items-center">
        {auth !== undefined && auth?.user ? (
          <>
            <div className="flex gap-10 items-center">
              <p>{auth?.user.email}</p>
              <div className="buttonBase" onClick={() => auth?.signout()}>
                Logout
              </div>
            </div>
          </>
        ) : null}
        {!auth?.user ? (
          <div className="flex gap-8">
            <div
              className="hover:text-yellow-500 cursor-pointer"
              onClick={() => {
                card?.dispatchCard({ type: "HIDDE_DIALOG", payload: {} });
                router.push("https://mymealplans.ca/Checkout");
              }}
            >
              Checkout
            </div>
            <div
              className="relative cursor-pointer"
              onClick={() => {
                if (card) {
                  card.dispatchCard({ type: "SHOW_DIALOG", payload: {} });
                }
              }}
            >
              <Image
                src="/bag.svg"
                alt="Picture of the author"
                height={25}
                width={25}
              />
              {card ? (
                <div className="bg-yellow-500 rounded-full w-6 h-6 text-sm text-center absolute -top-3 -right-5">
                  {card.card.menu.length}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Navigation;
