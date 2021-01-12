import Value from "./component/Value";
import Packages from "./component/Packages";
import Footer from "./component/Footer";
import ChefList from "./component/ChefList";
import Navigation from "./component/Navigation";
import SideBardCard from "./component/SideBardCard";

export default function Home() {
  return (
    <div className="overflow-x-hidden flex flex-col font-body">
      <style jsx>{`
        #introImg {
          background: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.7),
              rgba(0, 0, 0, 0.7)
            ),
            url(/intro_img.jpg);
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          height: 600px;
          width: 100%;
        }
      `}</style>
      <Navigation />
      <section id="introImg" className="flex justify-start items-center ">
        <div className="bg-black bg-opacity-70 p-10 w-4/5 md:w-7/12 text-white space-y-4">
          <h1 className="text-3xl md:text-6xl font-black">
            Welcome to Cook For Me
          </h1>
          <h2 className="text-xl font-bold">A new way to order food</h2>
          <p>
            You simply pick your city, pick the kind of food that you feel like
            and pick the chef to prepare it. Once done the food can be delivered
            to you or picked up.
          </p>
        </div>
      </section>
      <section className="bg-white container mx-auto relative bottom-10 flex flex-wrap justify-around gap-10 p-10 shadow-lg">
        <Value
          img="/clock_svg.svg"
          title="Always at time"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        />
        <Value
          img="/car_svg.svg"
          title="We deliver"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        />
        <Value
          img="/calendar_svg.svg"
          title="Schedule"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        />
      </section>
      <Packages />
      <ChefList isAdminPage={false} />
      <Footer />
      {<SideBardCard />}
    </div>
  );
}
