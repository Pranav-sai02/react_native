// hooks/useRatePlans.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { RatePlan } from '../types/RatePlan';
import { createRatePlan, fetchRatePlansByRoom, updateRatePlan } from '@/api/ratePlan';

// ✅ Fetch rate plans for a given roomId
export const useRatePlansByRoom = (roomId: number) => {
  return useQuery<RatePlan[]>({
    queryKey: ['ratePlans', roomId],
    queryFn: () => fetchRatePlansByRoom(roomId),
    enabled: !!roomId, // only fetch if roomId is truthy
  });
};

// ✅ Create rate plan hook
export const useCreateRatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRatePlan,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ratePlans', variables.roomId] });
    },
  });
};

// ✅ Update rate plan hook
export const useUpdateRatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRatePlan,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ratePlans', variables.roomId] });
    },
  });
};
