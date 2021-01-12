import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../lib/useUser";

function FormSignIn() {
  const auth = useAuth();

  const { register, handleSubmit, watch, errors } = useForm();

  return (
    <form
      onSubmit={handleSubmit((data) => auth?.signin(data.email, data.password))}
      className="flex flex-col h-screen pt-40"
    >
      <div className="flex flex-auto justify-center">
        <div className="flex flex-col space-y-3">
          <h1 className="text-6xl font-bold my-10">Login to the admin panel</h1>
          <input
            className="border-2 rounded p-2"
            placeholder="Enter your e-mail"
            type="text"
            id="email"
            name="email"
            ref={register({ required: true })}
          />
          <input
            className="border-2 rounded p-2"
            placeholder="Enter your password"
            type="password"
            id="password"
            name="password"
            ref={register({ required: true })}
          />
          <button type="submit" className="buttonBase">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormSignIn;
