import React from "react";
import Image from "next/image";

function PackageQuestion({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-none">
        <Image
          className="object-cover rounded-tl-lg rounded-bl-lg"
          src="/dish_icon.svg"
          alt="Picture of the author"
          height={30}
          width={30}
        />
      </div>
      <p>{text}</p>
    </div>
  );
}

export default PackageQuestion;
