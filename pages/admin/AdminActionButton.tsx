import React from "react";
import { useRouter } from "next/router";

function AdminActionButton({ title, href }: { title?: string; href?: string }) {
  const route = useRouter();

  return (
    <>
      {href ? (
        <a onClick={() => route.push(href)} className="buttonBase">
          {title}
        </a>
      ) : null}
    </>
  );
}

export default AdminActionButton;
