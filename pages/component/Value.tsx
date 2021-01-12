import React from "react";
import Image from "next/image";

function Value({
  img,
  title,
  description,
}: {
  img: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row w-52 lg:w-80 gap-5">
      <Image src={img} alt="svg icons" height={50} width={80} />
      <div className="flex-col text-center lg:text-left">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Value;
