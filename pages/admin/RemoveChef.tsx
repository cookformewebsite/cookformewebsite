import React, { useEffect } from "react";
import Navigation from "../component/Navigation";
import Footer from "../component/Footer";
import { useAuth } from "../../lib/useUser";
import { useRouter } from "next/router";
import ChefList from "../component/ChefList";

function RemoveChef() {
  const auth = useAuth();
  const rout = useRouter();

  useEffect(() => {
    if (!auth?.user) {
      rout.push("http://localhost:3000/admin");
    }
  }, [auth]);

  return (
    <div>
      <Navigation />
      <div className="pt-32">
        <ChefList isAdminPage={true} />
      </div>
      <Footer />
    </div>
  );
}

export default RemoveChef;
