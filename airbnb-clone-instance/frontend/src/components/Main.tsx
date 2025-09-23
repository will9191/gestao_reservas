import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { BookingSlotResponse, ModalInfo } from "../utils/types";
import { Card } from "./Card";
import { getBookingSlots } from "../utils/requests";

const fetchBookingSlots = async (
  setBookingSlots: Dispatch<SetStateAction<BookingSlotResponse[]>>
): Promise<void> => {
  console.log("Fetching booking slots...");
  const response: Response = await getBookingSlots();
  if (!response.ok) {
    console.error("Failed to fetch booking slots:", response.statusText);
    return;
  }
  setBookingSlots(
    await response.json().then((data: unknown) => data as BookingSlotResponse[])
  );
};

export const Main = () => {
  const [bookingSlots, setBookingSlots] = useState<BookingSlotResponse[]>([]);
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo | null>(null);

  // Fetch booking slots from the backend when the component mounts
  useEffect(() => {
    fetchBookingSlots(setBookingSlots);
  }, [shouldRefetch]);

  return (
    <main className="w-full border border-gray-200">
      {modalInfo && (
        <div className="fixed z-100 inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">{modalInfo.title}</h2>
            <button
              onClick={() => setModalInfo(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-start items-start m-4">
        <h1 className="text-2xl font-bold">Em Destaque</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-3">
          {bookingSlots.map((slot) => (
            <Card
              key={slot.id}
              data={slot}
              setShouldRefetch={setShouldRefetch}
              setModalInfo={setModalInfo}
            />
          ))}
        </div>
      </div>
    </main>
  );
};
