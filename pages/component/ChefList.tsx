import React, { useReducer, useEffect, useState, useRef } from "react";
import ChefCard from "./ChefCard";
import Filter from "./Filter";
import { getAllSnacks, getListOfChefOnly } from "../../lib/firestoreDb";
import SnackCard from "./SnackCard";
import Chef from "../../class/ChefClass";
import Menu from "../../class/MenuClass";
import ScrollXButton from "../component/ScrollXButton";

interface IState {
  city: string;
  typeOfFood: string;
}

interface IAction {
  type: string;
  payload: string;
}

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "CHANGE_CITY":
      return { ...state, city: action.payload };
    case "CHANGE_TYPE_OF_FOOD":
      return { ...state, typeOfFood: action.payload };
    default:
      return { city: "All", typeOfFood: "All" };
  }
}

function ChefList({ isAdminPage }: { isAdminPage: boolean }) {
  const [snacks, setSnacks] = useState<Menu[]>([]);
  const [chefList, setChefList] = useState<Chef[]>([]);
  const initialUrlState = { city: "All", typeOfFood: "All" };
  const [filter, dispatch] = useReducer(reducer, initialUrlState);
  const snackDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAdminPage) {
      getAllSnacks(setSnacks);
    }
  }, []);
  useEffect(() => {
    getListOfChefOnly(filter.city, filter.typeOfFood, setChefList);
  }, [filter]);
  return (
    <section id="chefListBackground">
      <style jsx>{`
        #chefListBackground {
          background: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.7),
              rgba(0, 0, 0, 0.7)
            ),
            url(/background_image.png);
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          height: 100%;
          width: 100%;
        }
      `}</style>
      {!isAdminPage ? (
        <div className="container mx-auto ">
          <h2 className="text-white text-6xl font-bold  py-10">Snacks</h2>
          <div className="relative">
            <div
              ref={snackDivRef}
              className="flex gap-5 h-full p-2 overflow-x-hidden"
            >
              {snacks.map((e) => (
                <div key={e.id}>
                  <SnackCard snack={e} />
                </div>
              ))}
            </div>
            <ScrollXButton
              snackDivRef={snackDivRef}
              scrollDirection={"right"}
            />
            <ScrollXButton snackDivRef={snackDivRef} scrollDirection={"left"} />
          </div>
        </div>
      ) : null}

      {chefList ? (
        <div className="container mx-auto flex flex-col lg:flex-row gap-10 py-20">
          <div className="flex-none">
            <Filter filter={filter} dispatch={dispatch} />
          </div>
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {chefList.map((e) => (
                <div key={e.id}>
                  <ChefCard chef={e} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default ChefList;
