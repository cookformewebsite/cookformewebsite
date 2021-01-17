import React, { useReducer } from "react";
import Image from "next/image";
import IconWithText from "../component/IconWithText";
import Navigation from "../component/Navigation";
import Footer from "../component/Footer";
import { GetServerSideProps } from "next";
import SideBardCard from "../component/SideBardCard";
import Chef from "../../class/ChefClass";
import CheckoutCardMenu from "../component/CheckoutCardMenu";

function ChefPage({ chef }: { chef: Chef }) {
  return (
    <>
      <Navigation />
      <div id="intro" className="pt-20 sm:pt-10">
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
        <Image
          className={`object-cover w-auto ${
            chef.backgroundImage == undefined ? "object-fill" : "object-cover"
          }`}
          src={chef.backgroundImage.backgroundImage}
          alt="ChefPage picture"
          height={800}
          width={2000}
        />
        <div className="bg-white container mx-auto p-5 sm:p-10   mb-40">
          <h1 className="font-bold text-5xl sm:text-7xl mt-5 mb-2">
            {chef.fullName}
          </h1>
          <IconWithText
            icon="/chef_icon.svg"
            text={chef.typeOfFood}
            size="15"
          />
          <IconWithText icon="/location_icon.svg" text={chef.city} size="15" />
          <p className="mt-5">{chef.description}</p>
          <div className="text-lg font-bold bg-gray-50 p-5 my-5">All menus</div>
          <div className="space-y-5">
            {chef.menus.map((e) => (
              <div key={e.id}>
                <CheckoutCardMenu page={"CHEF_PAGE"} menu={e} />
              </div>
            ))}
          </div>
        </div>
        {<SideBardCard />} <Footer />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { chefId } = context.query;
  const response = await fetch(
    "https://mymealplans.ca/api/getChefsAndMenus?id=" + chefId
  );
  const Chef: Chef = await response.json();

  return {
    props: { chef: Chef },
  };
};

export default ChefPage;
