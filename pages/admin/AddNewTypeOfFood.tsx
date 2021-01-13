import React, { useState, useEffect, useRef } from "react";
import Navigation from "../component/Navigation";
import Footer from "../component/Footer";
import { useAuth } from "../../lib/useUser";
import {
  addTypeOfFood,
  getTypeOfFood,
  deleteTypeOfFood,
} from "../../lib/firestoreDb";
import { useRouter } from "next/router";

function AddNewTypeOfFood() {
  const [typeOfFoodList, setTypeOfFood] = useState<string[]>([]);
  const typeOfFoodRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const rout = useRouter();

  useEffect(() => {
    getTypeOfFood(setTypeOfFood);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!auth?.user) {
        rout.push("https://cookformewebsite.vercel.app/admin");
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [auth]);

  return (
    <div>
      <Navigation />
      <form
        className="pt-40"
        onSubmit={(data) => {
          data.preventDefault();
          if (
            typeOfFoodRef.current &&
            typeOfFoodRef.current.value.trim() !== ""
          ) {
            addTypeOfFood(
              typeOfFoodRef.current.value.trim().charAt(0).toUpperCase() +
                typeOfFoodRef.current.value.trim().slice(1)
            );
            typeOfFoodRef.current.value = "";
          }
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col gap-10 mb-40">
            <h1 className="text-6xl font-bold mb-10">Add a new type of food</h1>
            <input
              className="border-2 rounded p-2"
              placeholder="Enter the type of food"
              type="text"
              name="typeOfFood"
              ref={typeOfFoodRef}
              required
            />
            <button
              type="submit"
              className=" bg-yellow-500 rounded text-white py-3 font-bold text-2xl"
            >
              Add new city
            </button>
            <div className="font-bold text-lg bg-gray-100 p-4 rounded">
              All type of food
            </div>
            <div className="flex flex-col gap-4">
              {typeOfFoodList &&
                typeOfFoodList.map((e, index) => (
                  <div
                    key={index}
                    className="border-2 px-10 py-5 flex justify-between "
                  >
                    {e}
                    <div
                      onClick={() => deleteTypeOfFood(e)}
                      className="text-red-400 font-bold cursor-pointer"
                    >
                      Delete
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default AddNewTypeOfFood;
