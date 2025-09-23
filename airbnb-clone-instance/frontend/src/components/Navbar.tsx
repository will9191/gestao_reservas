export const Navbar = () => {
  return (
    <nav className="flex justify-around items-center bg-gray-100 w-full ">
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1280px-Airbnb_Logo_B%C3%A9lo.svg.png"
        }
        className="logo"
        alt="Airbnb logo"
      />
      <button
        onClick={() => console.log("vamos criar uma vaga!!!")}
        className="bg-airbnb rounded-xl shadow text-white px-6 py-4 m-2 h-fit hover:bg-airbnb-200 transition delay-50 duration-300 ease-in-out hover:scale-110 active:bg-airbnb-300"
      >
        Criar vaga
      </button>
    </nav>
  );
};
