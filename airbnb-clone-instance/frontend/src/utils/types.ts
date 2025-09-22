export const API_BASE_URL = "http://localhost:3000";

export interface BookingSlotResponse {
  id: string;
  name: string;
  id_key: string;
  country: string;
  city: string;
  neighborhood: string;
  street: string;
  zip_code: string;
  number: string;
  unit?: string;
  unit_number?: string;
  image: string;
  is_reserved: boolean;
}

export interface BookingSlotPayload {
  name: string;
  address: {
    country: string;
    city: string;
    neighborhood: string;
    street: string;
    zip_code: string;
    number: string;
    unit?: string;
    unit_number?: string;
  };
  image: string;
}

export interface ModalInfo {
  title?: string;
}

export enum BookingSlotStatus {
  AVAILABLE = "available",
  RESERVED = "reserved",
  NON_EXISTENT = "non_existent",
}
