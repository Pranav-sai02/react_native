// services/inventoryService.ts

import { SaveInventoryRequest } from "@/shared/types/roomAvailability";
import axiosInstance from "./axiosinstance";


// ✅ POST inventory data
export const saveRoomsAvailability = async (
  payload: SaveInventoryRequest
): Promise<void> => {
  await axiosInstance.post('/inventory/saveRoomsAvailability', payload);
};
