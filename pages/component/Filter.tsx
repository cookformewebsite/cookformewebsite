import React, { useState, useEffect } from "react";
import { getFilters } from "../../lib/firestoreDb";

function Filter({
  filter,
  dispatch,
}: {
  filter?: {
    city: string;
    typeOfFood: string;
  };
  dispatch: React.Dispatch<{ type: string; payload: string }>;
}) {
  const [typeOfFood, setTypeOfFood] = useState<string[] | undefined>(undefined);
  const [cities, setCities] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    getFilters(setCities, setTypeOfFood);
  }, []);

  return (
    <div className="bg-white flex flex-wrap lg:flex-col items-center lg:items-start p-5 lg:p-10 gap-5">
      <div className="font-bold  text-2xl md:text-4xl">Filter</div>
      <div className="flex flex-wrap w-full  items-end lg:flex-col lg:items-start gap-5">
        <select
          defaultValue={filter?.typeOfFood}
          onChange={(e) =>
            dispatch({ type: "CHANGE_TYPE_OF_FOOD", payload: e.target.value })
          }
          name="typeOfFood"
        >
          <option key={-1} value={"All"}>
            {"All type of food"}
          </option>
          {typeOfFood?.map((e, index) => (
            <option key={index} value={e}>
              {e}
            </option>
          ))}
        </select>
        <select
          defaultValue={filter?.city}
          onChange={(e) =>
            dispatch({ type: "CHANGE_CITY", payload: e.target.value })
          }
          name="city"
        >
          <option key={-1} value={"All"}>
            {"All cities"}
          </option>
          {cities?.map((e, index) => (
            <option key={index} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filter;
