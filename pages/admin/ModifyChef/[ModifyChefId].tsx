import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navigation from "../../component/Navigation";
import Footer from "../../component/Footer";
import { GetServerSideProps } from "next";
import Chef from "../../../class/ChefClass";
import {
  changeChefData,
  deletFileInFirestore,
  getFilters,
  saveImageToFireStorage,
} from "../../../lib/firestoreDb";
import { useRouter } from "next/router";
import { useAuth } from "../../../lib/useUser";
import AddOrRemoveChefMenu from "./AddOrRemoveChefMenu";
import { listenToChef } from "../../../lib/firestoreDb";
import IconWithText from "../../component/IconWithText";
import { changeChefBackgroundImage } from "../../../lib/firestoreDb";

function capitalize(params: string) {
  return params.trim().charAt(0).toUpperCase() + params.trim().slice(1);
}

function ModifyChef({ chefId }: { chefId: string }) {
  const rout = useRouter();
  const auth = useAuth();
  const [chef, setChef] = useState<Chef | undefined>(undefined);
  const [typeOfFood, setTypeOfFood] = useState<string[] | undefined>(undefined);
  const [cities, setCities] = useState<string[] | undefined>(undefined);
  const menuImage = useRef<HTMLInputElement>(null);
  const chefFullName = useRef<HTMLInputElement>(null);
  const chefDescription = useRef<HTMLTextAreaElement>(null);
  const chefCity = useRef<HTMLSelectElement>(null);
  const chefTypeOfFood = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    getFilters(setCities, setTypeOfFood);
    listenToChef(chefId, setChef);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!auth?.user) {
        rout.push("https://mymealplans.ca/admin");
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [auth]);

  return (
    <div id="intro">
      <style jsx>{`
        #intro {
          background: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.9),
              rgba(0, 0, 0, 0.9)
            ),
            url(/background_image.png);
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          height: 100%;
          width: 100%;
        }
      `}</style>
      <Navigation />

      {chef ? (
        <Image
          className={`object-cover w-auto ${
            chef?.backgroundImage == undefined ? "object-fill" : "object-cover"
          }`}
          src={chef?.backgroundImage.backgroundImage}
          alt="ModifyChef
         picture"
          height={800}
          width={2000}
        />
      ) : null}
      <div className="bg-white container mx-auto p-5 sm:p-10   mb-40 flex flex-col gap-5">
        <h1 className="font-bold text-5xl sm:text-7xl mt-5 mb-2">
          {chef?.fullName}
        </h1>
        {chef ? (
          <>
            <IconWithText
              icon="/chef_icon.svg"
              text={chef?.typeOfFood}
              size="15"
            />
            <IconWithText
              icon="/location_icon.svg"
              text={chef?.city}
              size="15"
            />
          </>
        ) : null}

        <p className="mt-5">{chef?.description}</p>

        <div className="text-lg font-bold bg-gray-50 p-5 mt-5">
          Change chef picture
        </div>

        <input type="file" name="backgroundImage" required ref={menuImage} />

        <button
          type="submit"
          className=" bg-yellow-500 rounded text-white py-3 font-bold text-2xl"
          onClick={async () => {
            if (
              chef &&
              menuImage.current?.files &&
              menuImage.current?.files[0] != null
            ) {
              const {
                downloadURL,
                filePathToFirestore,
              } = await saveImageToFireStorage(
                "/chefs/",
                menuImage.current.files[0]
              );
              await deletFileInFirestore(
                "/chefs/" + chef.backgroundImage.filePathToFirestore,
                function onCompleteFunction() {
                  changeChefBackgroundImage(
                    chef?.id,
                    downloadURL,
                    filePathToFirestore
                  );
                }
              );
            }
            if (menuImage.current) menuImage.current.value = "";
          }}
        >
          Change chef picture
        </button>

        <div className="text-lg font-bold bg-gray-50 p-5 mt-5">
          Change chef data
        </div>
        <input
          className="border-2 rounded p-2"
          placeholder="Enter the chef full name"
          type="text"
          name="fullName"
          ref={chefFullName}
        />
        {typeOfFood ? (
          <select
            defaultValue={chef?.typeOfFood}
            ref={chefTypeOfFood}
            className="border-2 rounded p-2 "
            name="typeOfFood"
          >
            {typeOfFood.map((e) => (
              <option value={e}>{e === "All" ? "All type of food" : e}</option>
            ))}
          </select>
        ) : null}
        {cities ? (
          <select
            defaultValue={chef?.city}
            ref={chefCity}
            className="border-2 rounded p-2 "
            name="city"
          >
            {cities.map((e) => (
              <option value={e}>{e === "All" ? "All cities" : e}</option>
            ))}
          </select>
        ) : null}
        <textarea
          ref={chefDescription}
          className="border-2 rounded p-2 h-40"
          placeholder="description"
          name="description"
        ></textarea>
        <button
          type="submit"
          className=" bg-yellow-500 rounded text-white py-3 font-bold text-2xl"
          onClick={() => {
            if (
              chef != undefined &&
              chefFullName.current?.value != undefined &&
              chefDescription.current?.value != undefined &&
              chefCity.current?.value != undefined &&
              chefTypeOfFood.current?.value != undefined
            ) {
              changeChefData(
                chefId,
                chefFullName.current?.value.trim() === ""
                  ? chef?.fullName
                  : capitalize(chefFullName.current?.value.trim()),
                chefDescription.current?.value.trim() === ""
                  ? chef?.description
                  : capitalize(chefDescription.current?.value.trim()),
                chefCity.current?.value,
                chefTypeOfFood.current?.value
              );
            }
          }}
        >
          Change chef data
        </button>

        <div className="text-lg font-bold bg-gray-50 p-5 my-5">
          Add new menus
        </div>
        <AddOrRemoveChefMenu chefId={chefId} />
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ModifyChefId } = context.query;
  return {
    props: { chefId: ModifyChefId },
  };
};

export default ModifyChef;
