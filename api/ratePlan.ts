// services/ratePlanService.ts

import { RatePlan } from "@/shared/types/RatePlan";
import axiosInstance from "./axiosinstance";


// ✅ GET rate plans by roomId
export const fetchRatePlansByRoom = async (roomId: number): Promise<RatePlan[]> => {
  const response = await axiosInstance.get(`/rateplans/room/${roomId}`);
  return response.data;
};

// ✅ CREATE a new rate plan (omit ID)
export const createRatePlan = async (
  ratePlan: Omit<RatePlan, 'ratePlanId'>
): Promise<void> => {
  await axiosInstance.post('/rateplans/saveRatePlan', ratePlan);
};

// ✅ UPDATE existing rate plan
export const updateRatePlan = async (ratePlan: RatePlan): Promise<void> => {
  await axiosInstance.put(`/rateplans/update/${ratePlan.ratePlanId}`, ratePlan);
};

// ✅ DELETE rate plan (optional)
export const deleteRatePlan = async (ratePlanId: number): Promise<void> => {
  await axiosInstance.delete(`/rateplans/${ratePlanId}`);
};
