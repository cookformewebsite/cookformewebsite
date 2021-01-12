import React from "react";
import Image from "next/image";
import IconWithText from "./IconWithText";
import Link from "next/link";
import { useAuth } from "../../lib/useUser";
import { deleteChef, deletFileInFirestore } from "../../lib/firestoreDb";
import Chef from "../../class/ChefClass";

function ChefCard({ chef }: { chef?: Chef }) {
  const auth = useAuth();

  return (
    <div>
      {chef ? (
        <div className="bg-white hover:shadow-2xl">
          {auth?.user ? (
            <div className="flex justify-end gap-4 font-bold px-4">
              <div
                onClick={() =>
                  deletFileInFirestore(
                    "/chefs/" + chef.backgroundImage.filePathToFirestore,
                    function onCompleteFunction() {
                      deleteChef(chef);
                    }
                  )
                }
                className="text-red-400 cursor-pointer"
              >
                Delete
              </div>
              <div className="text-green-400 cursor-pointer">
                <Link href={"./ModifyChef/" + chef.id}>
                  <a>Modify</a>
                </Link>
              </div>
            </div>
          ) : null}
          {!auth?.user ? (
            <Link href={"./chef/" + chef.id}>{returnCard(chef)}</Link>
          ) : (
            returnCard(chef)
          )}
        </div>
      ) : null}
    </div>
  );
}

function returnCard(chef: Chef) {
  return (
    <div className="cursor-pointer ">
      <Image
        className="object-cover"
        src={chef.backgroundImage.backgroundImage}
        alt="Picture of the author"
        height={250}
        width={650}
      />
      <div className="px-5 pb-5 sm:px-10 sm:pb-10 ">
        <h1 className="font-bold text-2xl mt-5 mb-2">{chef.fullName}</h1>
        <IconWithText icon="/chef_icon.svg" text={chef.typeOfFood} size="15" />
        <IconWithText icon="/location_icon.svg" text={chef.city} size="15" />
        <p>
          {chef.description.length <= 150
            ? chef.description
            : chef.description.substring(1, 100) + "..."}
        </p>
      </div>
    </div>
  );
}

export default ChefCard;
