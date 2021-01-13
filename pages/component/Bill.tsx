import React, { PureComponent } from "react";
import Menu from "../../class/MenuClass";
import CheckoutCardMenu from "./CheckoutCardMenu";

interface ICard {
  showSideBar: boolean;
  menu: Array<Menu>;
  total: string;
}

interface ICardProps {
  data?: ICard;
  date?: string;
}

interface ICardState {}

class Bill extends PureComponent<ICardProps, ICardState> {
  render() {
    return (
      <>
        {this.props.data ? (
          <div>
            <style jsx>{`
              #backgroungImage {
                background: url(/bill_background_image.svg);
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
                height: 100%;
                width: 100%;
              }
            `}</style>

            <div
              id="backgroungImage"
              className="bg-white p-16 flex flex-col justify-between space-y-10"
            >
              <div className="flex justify-between">
                <div className="flex flex-col gap-5">
                  <div>
                    <h2 className="font-bold">Date</h2>
                    <p>{this.props.date}</p>
                  </div>
                  <div>
                    <h2 className="font-bold">Phone number</h2>
                    <p>+1(819)154-5452 </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5  pb-20">
                <h2 className="font-bold text-2xl">
                  Product{this.props.data.menu?.length > 1 ? "s" : ""}
                </h2>
                {this.props.data.menu?.map((e) => (
                  <CheckoutCardMenu page="PRINT_PAGE" menu={e} />
                ))}
              </div>
              <div className="flex justify-center">
                <h2 className="text-xl font-bold">
                  Total : {this.props.data.total} CAD
                </h2>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default Bill;
