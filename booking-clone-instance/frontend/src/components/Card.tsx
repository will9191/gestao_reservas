import { postReserveBookingSlot } from "../utils/requests";
import type { BookingSlotResponse, ModalInfo } from "../utils/types";

type CardProps = {
  data: BookingSlotResponse;
  setShouldRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  setModalInfo: React.Dispatch<React.SetStateAction<ModalInfo | null>>;
};

export function Card({ data, setShouldRefetch, setModalInfo }: CardProps) {
  const handleReserve = async () => {
    console.log(`Booking slot: ${data.name}`);
    const response: Response = await postReserveBookingSlot(data.id_key);
    if (!response.ok) {
      console.error("Failed to book slot:", response.statusText);
      setModalInfo({ title: "A vaga não pôde ser reservada." });
    } else {
      setModalInfo({ title: "Vaga reservada com sucesso." });
    }
    setShouldRefetch(true);
    return;
  };

  return (
    <div
      className={`bg-gray-100 p-4 rounded-lg shadow-md ${
        data.is_reserved ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{data.name}</h2>
        <div>
          {data.is_reserved ? (
            <span className="bg-red-400 text-white text-sm px-2 py-1 rounded-2xl font-semibold">
              Reservado
            </span>
          ) : (
            <span className="bg-green-400 text-white text-sm px-2 py-1 rounded-2xl font-semibold">
              Disponível
            </span>
          )}
        </div>
      </div>
      {data.image && (
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-48 object-cover mb-2 rounded"
        />
      )}
      <div className="text-gray-600 flex flex-col justify-start items-start text-sm">
        <p>
          {data.street}, {data.number}, {data.neighborhood}, {data.city}
        </p>
        <p>
          {data.country}, {data.zip_code}
        </p>
      </div>
      <button
        disabled={data.is_reserved}
        onClick={handleReserve}
        className="bg-light-booking rounded-xl shadow text-white px-4 py-2 m-2 h-fit hover:bg-booking-200 transition delay-50 duration-300 ease-in-out hover:scale-110 active:bg-booking-300 disabled:hover:scale-100 disabled:cursor-not-allowed disabled:hover:bg-light-booking"
      >
        Reservar
      </button>
    </div>
  );
}
