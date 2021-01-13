import React, { useRef, useReducer, useState } from "react";
import Navigation from "./component/Navigation";
import Footer from "./component/Footer";
import { useCard } from "./../lib/useUser";
import CheckoutCardMenu from "./component/CheckoutCardMenu";
import PayPalIntegration from "./component/PayPalIntegration";
import EmptyProduct from "./component/EmptyProduct";

function Checkout() {
  const card = useCard();
  const [paid, setPaid] = useState({});
  const [time, setTime] = useState(formatDate(Date.now()));

  function formatDate(date: number) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = (d.getDate() + 1).toString(),
      year = d.getFullYear(),
      hour = d.getHours().toString(),
      min = d.getMinutes().toString();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    if (hour.length < 2) hour = "0" + hour;
    if (min.length < 2) min = "0" + min;
    return [year, month, day].join("-") + "T" + hour + ":" + min;
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-3 xl:px-24 py-24 flex flex-col">
        {Object.entries(paid).length > 0 ? null : (
          <div>
            <h2 className="text-4xl font-bold mb-10">Orders details</h2>
            {card && card.card.menu.length > 0 ? (
              <div>
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col flex-wrap gap-2">
                    <p className="font-bold text-xl ">Delivery date</p>
                    <input
                      className="border-2 rounded p-2 flex-none w-56"
                      type="datetime-local"
                      id="time"
                      name="time"
                      value={time}
                      min={formatDate(Date.now())}
                      onChange={(e) => {
                        setTime(e.target.value);
                      }}
                    ></input>
                  </div>
                  {card.card.menu.map((e) => (
                    <div key={e.id}>
                      <CheckoutCardMenu page="CHECKOUT_PAGE" menu={e} />
                    </div>
                  ))}
                </div>
                <h2 className="text-xl font-bold my-10">
                  Total : {card.card.total} CAD
                </h2>
              </div>
            ) : (
              <EmptyProduct />
            )}
          </div>
        )}
        <PayPalIntegration paid={paid} setPaid={setPaid} time={time} />
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
