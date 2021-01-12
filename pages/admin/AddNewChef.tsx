import React, { useState, useEffect, useContext } from "react";
import Navigation from "../component/Navigation";
import Footer from "../component/Footer";
import { useForm } from "react-hook-form";
import {
  saveImageToFireStorage,
  createChef,
  getFilters,
} from "../../lib/firestoreDb";
import AddNewChefMenu from "./AddNewChefMenu";
import { IChef } from "../../class/ChefClass";
import { IMenu } from "../../class/MenuClass";
import { useAuth } from "../../lib/useUser";
import { useRouter } from "next/router";
import Loading from "../component/Loading";

function capitalize(params: string) {
  return params.trim().charAt(0).toUpperCase() + params.trim().slice(1);
}

function AddNewChef() {
  const { register, handleSubmit, watch, errors } = useForm();
  const [menuList, setMenuList] = useState<IMenu[]>([]);
  const [typeOfFood, setTypeOfFood] = useState<string[] | undefined>(undefined);
  const [cities, setCities] = useState<string[] | undefined>(undefined);
  const auth = useAuth();
  const rout = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getFilters(setCities, setTypeOfFood);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!auth?.user) {
        rout.push("http://localhost:3000/admin");
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [auth]);

  return (
    <div>
      <Navigation />
      <form
        className="pt-40"
        onSubmit={handleSubmit(async (formData) => {
          setLoading(true);
          const {
            downloadURL,
            filePathToFirestore,
          } = await saveImageToFireStorage(
            "/chefs/",
            formData.backgroundImage[0]
          );
          const chefData: IChef = {
            backgroundImage: {
              backgroundImage: downloadURL,
              filePathToFirestore: filePathToFirestore,
            },
            city: formData.city,
            description: capitalize(formData.description),
            fullName: capitalize(formData.fullName),
            typeOfFood: formData.typeOfFood,
            menus: menuList,
          };
          await createChef(chefData, setLoading);
        })}
      >
        <div className="container mx-auto mb-40">
          <h1 className="text-6xl font-bold mb-10">Add a new chef</h1>
          <div className="flex flex-col space-y-4">
            <input
              type="file"
              name="backgroundImage"
              required
              ref={register({ required: true })}
            />
            <input
              className="border-2 rounded p-2"
              placeholder="Enter the chef full name (required)"
              type="text"
              name="fullName"
              required
              ref={register({ required: true })}
            />
            {typeOfFood ? (
              <select
                className="border-2 rounded p-2 "
                name="typeOfFood"
                ref={register({ required: true })}
              >
                {typeOfFood.map((e, index) => (
                  <option key={index} value={e}>
                    {e === "All" ? "All type of food" : e}
                  </option>
                ))}
              </select>
            ) : null}
            {cities ? (
              <select
                className="border-2 rounded p-2 "
                name="city"
                ref={register({ required: true })}
              >
                {cities.map((e, index) => (
                  <option key={index} value={e}>
                    {e === "All" ? "All cities" : e}
                  </option>
                ))}
              </select>
            ) : null}
            <textarea
              className="border-2 rounded p-2 h-40"
              placeholder="Chef description (required)"
              name="description"
              required
              ref={register({ required: true })}
            ></textarea>
            <AddNewChefMenu setMenuList={setMenuList} menu={menuList} />
          </div>
          <button
            type="submit"
            className="w-full mt-10 bg-yellow-500 rounded text-white py-3 font-bold text-2xl"
          >
            Add new chef
          </button>
        </div>
      </form>

      {loading ? <Loading /> : null}

      <Footer />
    </div>
  );
}

export default AddNewChef;
