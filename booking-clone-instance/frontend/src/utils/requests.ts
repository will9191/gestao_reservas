import { API_BASE_URL, BookingSlotStatus } from "./types";

export const getBookingSlots = async () => {
  // First, get the raw response from the server
  const response = await fetch(
    `http://localhost:3001/vagas/vagas-cadastradas-local`,
    {
      method: "GET",
      // Note: 'Content-Type' header is not needed for a GET request
    }
  );

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Second, parse the JSON body from the response
  const data = await response.json();

  // Finally, return the parsed data
  return data;
};

export const postReserveBookingSlot = async (id_key: string) => {
  return await fetch(`${API_BASE_URL}/vagas/update-status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_key,
    }),
  });
};
