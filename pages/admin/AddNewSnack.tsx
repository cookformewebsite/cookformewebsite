import React, { useState, useEffect, useRef } from "react";
import Navigation from "../component/Navigation";
import Footer from "../component/Footer";
import Loading from "../component/Loading";
import {
  addSnack,
  getSnacks,
  saveImageToFireStorage,
  deletFileInFirestore,
  deleteSnack,
} from "../../lib/firestoreDb";
import Image from "next/image";
import Menu from "../../class/MenuClass";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/useUser";

function capitalize(params: string) {
  return params.trim().charAt(0).toUpperCase() + params.trim().slice(1);
}

function AddNewSnack() {
  const [snacks, setSnacks] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const snackName = useRef<HTMLInputElement>(null);
  const snackDescription = useRef<HTMLTextAreaElement>(null);
  const snackPrice = useRef<HTMLInputElement>(null);
  const snackImage = useRef<HTMLInputElement>(null);
  const auth = useAuth();
  const rout = useRouter();

  useEffect(() => {
    getSnacks(setSnacks);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!auth?.user) {
        rout.push("https://cookformewebsite.vercel.app/admin");
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [auth]);

  return (
    <div>
      <Navigation />
      <form
        className="pt-40"
        onSubmit={async (data) => {
          setLoading(true);
          if (
            snackName.current !== null &&
            snackPrice.current !== null &&
            snackDescription.current !== null &&
            snackImage !== null &&
            snackImage.current !== null &&
            snackImage.current.files !== null &&
            snackName.current.value.trim() !== "" &&
            snackPrice.current.value.trim() !== "" &&
            snackDescription.current.value.trim() !== ""
          ) {
            data.preventDefault();
            const {
              downloadURL,
              filePathToFirestore,
            } = await saveImageToFireStorage(
              "/snacks/",
              snackImage.current.files[0]
            );
            if (
              snackName.current !== null &&
              snackPrice.current !== null &&
              snackDescription.current !== null &&
              snackImage.current !== null &&
              snackName.current.value.trim() !== "" &&
              snackPrice.current.value.trim() !== "" &&
              snackDescription.current.value.trim() !== ""
            ) {
              await addSnack({
                description: capitalize(snackDescription.current.value.trim()),
                price: Number(snackPrice.current.value.trim()),
                title: capitalize(snackName.current.value.trim()),
                type: "snack",
                backgroundImage: {
                  backgroundImage: downloadURL,
                  filePathToFirestore: filePathToFirestore,
                },
              });
              snackName.current.value = "";
              snackDescription.current.value = "";
              snackPrice.current.value = "";
              snackImage.current.value = "";
            }
            setLoading(false);
          }
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col gap-10 mb-40">
            <h1 className="text-6xl font-bold mb-10">Add a new snack</h1>
            <input
              type="file"
              name="backgroundImage"
              required
              ref={snackImage}
            />
            <input
              className="border-2 rounded p-2"
              placeholder="Snack name"
              type="text"
              name="title"
              required
              maxLength={30}
              ref={snackName}
            />
            <input
              className="border-2 rounded p-2"
              placeholder="Snack price"
              type="number"
              step=".01"
              name="price"
              required
              ref={snackPrice}
            />

            <textarea
              className="border-2 rounded p-2 h-40"
              placeholder="Snack description"
              name="description"
              required
              maxLength={90}
              ref={snackDescription}
            ></textarea>
            <button
              type="submit"
              className=" bg-yellow-500 rounded text-white py-3 font-bold text-2xl"
            >
              Add new snack
            </button>
            <div className="font-bold text-lg bg-gray-100 p-4 rounded">
              All snacks
            </div>
            <div className="flex flex-col gap-4">
              {snacks.map((e) => (
                <div
                  key={e.id}
                  className="border-2 pr-10  flex justify-between gap-5"
                >
                  <Image
                    src={e.backgroundImage.backgroundImage}
                    width={70}
                    height={50}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between font-bold">
                      <div>{e.title}</div>
                      <div>{e.price} CAD</div>
                    </div>
                    <div>{e.description}</div>
                  </div>
                  <div
                    onClick={() =>
                      deletFileInFirestore(
                        "/snacks/" + e.backgroundImage.filePathToFirestore,
                        async function onCompleteFunction() {
                          deleteSnack(e.id);
                        }
                      )
                    }
                    className="text-red-400 font-bold cursor-pointer"
                  >
                    Delete
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
      {loading ? <Loading /> : null}
      <Footer />
    </div>
  );
}

export default AddNewSnack;
