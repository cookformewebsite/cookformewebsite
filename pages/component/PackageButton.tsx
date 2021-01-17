import React from "react";
import { useCard } from "../../lib/useUser";
import Menu, { IMenuCard } from "../../class/MenuClass";

function PackageButton({ menu, text }: { menu?: IMenuCard; text?: string }) {
  const card = useCard();

  return (
    <div
      className={`buttonBase w-32 ${
        menu?.package === text
          ? "bg-yellow-500 text-white"
          : "bg-white text-black"
      }`}
      onClick={() => {
        if (text && menu) menu.package = text;
        card?.dispatchCard({
          type: "CHANGE_PACKAGE",
          payload: { id: menu?.id, menu: menu },
        });
      }}
    >
      {text}
    </div>
  );
}

export default PackageButton;
