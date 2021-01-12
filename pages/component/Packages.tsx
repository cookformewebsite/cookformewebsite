import React from "react";
import PackageQuestion from "./PackageQuestion";

function Packages() {
  return (
    <section className="bg-white container mx-auto px-2 sm:px-10 mb-20 pb-5 shadow-lg">
      <h2 className="text-4xl font-bold mb-4 pt-10">
        WELCOME TO A NEW WAY TO ORDER FOOD
      </h2>
      <PackageQuestion text="ARE YOU LOOKING FOR DIVERSE MEAL OPTIONS FROM ALL OVER THE WORLD?" />
      <PackageQuestion text="ARE YOU TOO BUSY TO COOK?" />
      <PackageQuestion text="ARE YOUR CULINARY SKILLS LIMITED?" />
      <PackageQuestion text="DO YOU PREFER TO EAT WHEN SOMEONE ELSE COOKS?" />
      <p className="pt-4">
        If any of these apply then you are at the right place. Go ahead and pick
        your city.
      </p>
      <h2 className="text-2xl font-bold mb-4 pt-5">Packages</h2>
      <table className="table-auto w-full text-center">
        <thead>
          <tr className="border-b h-16">
            <th className="text-left font-normal ">Packages</th>
            <th>Family size</th>
            <th>Party size</th>
            <th>Mix dish</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-emerald-200 h-16">
            <td className="text-left">Features</td>
            <td className="text-yellow-500">5 meals</td>
            <td className="text-yellow-500">10 meals</td>
            <td className="text-yellow-500">Customise </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default Packages;
