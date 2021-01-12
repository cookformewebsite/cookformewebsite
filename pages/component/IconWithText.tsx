import React from "react";
import Image from "next/image";

export default function Icon_with_text({
  icon,
  text,
  size,
}: {
  icon: string;
  text: string;
  size: string;
}) {
  return (
    <div className="flex gap-3">
      <Image
        src={icon}
        alt="Picture of the author"
        height={size}
        width={size}
      />
      <p>{text}</p>
    </div>
  );
}
