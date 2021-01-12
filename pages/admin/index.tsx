import React from "react";
import Navigation from "../component/Navigation";
import Footer from "../component/Footer";
import { useAuth } from "../../lib/useUser";
import FromSignin from "./FormSignIn";
import AdminPanel from "./AdminPanel";

function index() {
  const auth = useAuth();

  return (
    <>
      <Navigation />

      {auth && auth.user ? <AdminPanel /> : <FromSignin />}
      <Footer />
    </>
  );
}

export default index;
