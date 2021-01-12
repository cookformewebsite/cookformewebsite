import React from "react";
import AdminActionButton from "./AdminActionButton";

function AdminPanel() {
  return (
    <>
      <div className="container mx-auto pt-40 pb-20">
        <h1 className="text-7xl font-bold">Hello Tai</h1>
        <h2 className="text-3xl font-semibold text-gray-400">
          Welcom to the admin panel
        </h2>
        <div className="flex flex-col gap-5 w-64 mt-10">
          <AdminActionButton title="Add new chef" href="./admin/AddNewChef" />
          <AdminActionButton
            title="Remove and modify chef"
            href="./admin/RemoveChef"
          />
          <AdminActionButton
            title="Add and remove snack"
            href="./admin/AddNewSnack"
          />
          <AdminActionButton
            title="Add and remove city"
            href="./admin/AddNewCity"
          />
          <AdminActionButton
            title="Add and remove type of food"
            href="./admin/AddNewTypeOfFood"
          />
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
