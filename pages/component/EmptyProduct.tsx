import React from "react";
import Image from "next/image";

function EmptyProduct() {
  return (
    <>
      <div className="bg-gray-50 py-20 flex flex-col justify-center items-center w-full relative">
        <p className="text-6xl font-bold absolute text-gray-600">
          Get some product first
        </p>
        <Image
          className="opacity-10"
          src="/empty.svg"
          height={400}
          width={400}
        />
      </div>
    </>
  );
}

export default EmptyProduct;
