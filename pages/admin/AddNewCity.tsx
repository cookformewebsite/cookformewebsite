import React, { useState, useEffect, useRef } from "react";
import Navigation from "../component/Navigation";
import Footer from "../component/Footer";
import { useAuth } from "../../lib/useUser";
import { addCity, getCities, deleteCities } from "../../lib/firestoreDb";
import { useRouter } from "next/router";

function AddNewCity() {
  const [citiesList, setCitiesList] = useState([]);
  const citiesRef = useRef<HTMLInputElement>(null);
  const auth = useAuth();
  const rout = useRouter();

  useEffect(() => {
    getCities(setCitiesList);
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
        onSubmit={(data) => {
          data.preventDefault();
          if (
            citiesRef.current !== null &&
            citiesRef.current.value.trim() !== ""
          ) {
            addCity(
              citiesRef.current.value.trim().charAt(0).toUpperCase() +
                citiesRef.current.value.trim().slice(1)
            );
            citiesRef.current.value = "";
          }
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col gap-10 mb-40">
            <h1 className="text-6xl font-bold mb-10">Add a new City</h1>
            <input
              className="border-2 rounded p-2"
              placeholder="Enter the city"
              type="text"
              name="city"
              required
              ref={citiesRef}
            />
            <button
              type="submit"
              className=" bg-yellow-500 rounded text-white py-3 font-bold text-2xl"
            >
              Add new city
            </button>
            <div className="font-bold text-lg bg-gray-100 p-4 rounded">
              All city
            </div>
            <div className="flex flex-col gap-4">
              {citiesList &&
                citiesList.map((e, index) => (
                  <div
                    key={index}
                    className="border-2 px-10 py-5 flex justify-between "
                  >
                    {e}
                    <div
                      onClick={() => deleteCities(e)}
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

export default AddNewCity;
