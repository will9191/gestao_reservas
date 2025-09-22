import { API_BASE_URL, BookingSlotStatus } from "./types";

export const getBookingSlots = async () => {
  return await fetch(`${API_BASE_URL}/vagas/vagas-cadastradas-local`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const postReserveBookingSlot = async (id_key: string) => {
  return await fetch(`${API_BASE_URL}/vagas/update-status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_key,
      status: BookingSlotStatus.RESERVED,
    }),
  });
};
