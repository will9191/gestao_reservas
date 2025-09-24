export const Navbar = () => {
  return (
    <nav className="flex justify-around items-center bg-gray-100 w-full ">
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Booking.com_Logo.svg/2560px-Booking.com_Logo.svg.png"
        }
        className="logo"
        alt="Airbnb logo"
      />
      <button
        onClick={() => console.log("vamos criar uma vaga!!!")}
        className="bg-booking rounded-xl shadow text-white px-6 py-4 m-2 h-fit hover:bg-booking-200 transition delay-50 duration-300 ease-in-out hover:scale-110 active:bg-booking-300"
      >
        Criar vaga
      </button>
    </nav>
  );
};
