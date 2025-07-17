// hooks/useRooms.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// ✅ updated to match React Native service folder
import { Room } from '../types/room';
import { createRoom, deleteRoom, fetchRoomsByHotel, updateRoom } from '@/api/rooms';

// 🔁 Fetch rooms by hotel ID
export const useRooms = (hotelId: number) => {
  return useQuery<Room[]>({
    queryKey: ['rooms', hotelId],
    queryFn: () => fetchRoomsByHotel(hotelId),
    enabled: !!hotelId, // run only if hotelId is valid
  });
};

// ➕ Create a room, then invalidate rooms list
export const useCreateRoom = (hotelId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms', hotelId] });
    },
  });
};

// ✏️ Update a room, then invalidate rooms list
export const useUpdateRoom = (hotelId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms', hotelId] });
    },
  });
};

// ❌ Delete a room, then invalidate rooms list
export const useDeleteRoom = (hotelId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms', hotelId] });
    },
  });
};
