import React, { useEffect, useRef, useState } from "react";
import { useCard } from "../../lib/useUser";
import Bill from "./Bill";
import { useReactToPrint } from "react-to-print";
import { PayPalButton } from "react-paypal-button-v2";
import { priceByPackage } from "../../lib/useUser";
import Loading from "./Loading";

function PayPalIntegration({ paid, setPaid, time }) {
  const card = useCard();
  const [loading, setLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);
  const invoiceRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });
  {
    /**    onAfterPrint: () => card?.dispatchCard({ type: "INIT", payload: {} }),
     */
  }
  const [error, setError] = useState(null);
  let items = [];
  let description = "";

  useEffect(() => {
    if (card) {
      for (let i = 0; i < card.card.menu.length; i++) {
        description = description.concat(
          card.card.menu[i].quantity +
            " " +
            card.card.menu[i].package +
            " " +
            card.card.menu[i].title +
            " for "
        );
        if (card.card.menu[i].type == "menu") {
          description = description.concat(
            priceByPackage(card.card.menu[i], card.card.menu[i].package) *
              card.card.menu[i].quantity +
              " CAD"
          );
        } else {
          description = description.concat(
            card.card.menu[i].price * card.card.menu[i].quantity + " CAD"
          );
        }
        if (i === card.card.menu.length - 1) {
          description = description.concat(". Total: " + card.card.total);
        } else {
          description = description.concat(", ");
        }
        items.push({
          unit_amount: {
            currency_code: "CAD",
            value:
              card.card.menu[i].type == "menu"
                ? priceByPackage(card.card.menu[i], card.card.menu[i].package)
                : card.card.menu[i].price,
          },
          quantity: card.card.menu[i].quantity,
          name: card.card.menu[i].title,
        });
      }
    }
    console.log({
      total: card?.card.total,
      items: items,
      description: description,
    });
  }, [card?.card.total]);

  return (
    <div>
      {card.card.menu.length > 0 &&
      paid &&
      !(Object.entries(paid).length > 0) ? (
        <PayPalButton
          createOrder={(data, actions) => {
            setLoading(true);
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    value: card?.card.total,
                    currency_code: "CAD",
                    breakdown: {
                      item_total: {
                        currency_code: "CAD",
                        value: card?.card.total,
                      },
                    },
                  },
                  items: items,
                },
              ],
              // application_context: {
              //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
              // }
            });
          }}
          onApprove={async (data, actions) => {
            const order = await actions.order.capture();
            // Show a success message to the buyer
            setPaid(order);
            setLoading(false);
            fetch("http://localhost:3000/api/sendEmail", {
              method: "post",
              body: JSON.stringify({
                time: time,
                orderDerscription: description,
                firstName: order.payer.name.given_name,
                name: order.payer.name.surname,
                email: order.payer.email_address,
                address_line_1:
                  order.purchase_units[0].shipping.address.address_line_1,
                address_line_2:
                  order.purchase_units[0].shipping.address.address_line_2,
                admin_area_2:
                  order.purchase_units[0].shipping.address.admin_area_2,
                admin_area_1:
                  order.purchase_units[0].shipping.address.admin_area_1,
                postal_code:
                  order.purchase_units[0].shipping.address.postal_code,
                country_code:
                  order.purchase_units[0].shipping.address.country_code,
              }),
            }).then(function (response) {
              setEmailStatus(response);
              return response;
            });

            console.log(order);
          }}
          onError={(err) => {
            setError(err), console.error(err);
          }}
        />
      ) : null}
      {paid && Object.entries(paid).length > 0 ? (
        <div className="bg-yellow-100 flex flex-col items-center justify-center p-5 text-center mb-4 h-96">
          <p className="text-5xl sm:text-7xl font-bold">Payment successful!</p>
          <div onClick={handlePrint} className="buttonBase mt-5">
            Download your invoice
          </div>
          <div className="hidden">
            <Bill ref={invoiceRef} data={card?.card} />
          </div>
        </div>
      ) : null}

      {error ? (
        <div>Error Occurred in processing payment! Please try again.</div>
      ) : null}
      {emailStatus ? (
        <div className="flex flex-wrap justify-center bg-green-400 py-5 px-5 gap-2">
          A confirmation email has been sent to you at:
          <div className="font-semibold"> {paid.payer.email_address}</div>
        </div>
      ) : null}
      {loading ? <Loading /> : null}
    </div>
  );
}

export default PayPalIntegration;
