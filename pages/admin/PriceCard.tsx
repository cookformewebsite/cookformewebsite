import React from "react";

function PriceCard({ text, price }: { text: string; price: number }) {
  return (
    <div className="py-2 px-5 text-center w-44 font-bold border-yellow-500 border-2">
      <div>{text}</div>
      <div className="text-xl font-black">{price}</div>
    </div>
  );
}

export default PriceCard;
