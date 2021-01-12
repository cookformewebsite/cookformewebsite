import React from "react";
import Image from "next/image";

function ScrollXButton({
  snackDivRef,
  scrollDirection,
}: {
  snackDivRef: React.RefObject<HTMLDivElement>;
  scrollDirection: string;
}) {
  return (
    <div
      onClick={() => {
        let scrollAmount: number = 0;
        var slideTimer = setInterval(function () {
          if (snackDivRef != null && snackDivRef.current != null) {
            scrollDirection == "left"
              ? (snackDivRef.current.scrollLeft -= 10)
              : (snackDivRef.current.scrollLeft += 10);

            scrollAmount += 10;

            if (scrollAmount >= 400) {
              window.clearInterval(slideTimer);
            }
          }
        }, 5);
      }}
      className={`bg-black w-10 sm:w-20 absolute flex justify-center items-center ${
        scrollDirection == "left" ? "left-0" : "right-0"
      } top-0 bottom-0 opacity-80 my-2`}
    >
      <Image
        src={scrollDirection == "left" ? "/left.svg" : "/right.svg"}
        height={50}
        width={50}
      />
    </div>
  );
}

export default ScrollXButton;
