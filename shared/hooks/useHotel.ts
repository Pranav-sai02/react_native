// app/shared/hooks/useHotels.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Hotel } from '@/shared/types/Hotel';
import { fetchAllHotels, saveHotel, updateHotel } from '@/api/hotel';


// ✅ React Query - Fetch Hotels
export const useHotels = () => {
  return useQuery<Hotel[]>({
    queryKey: ['hotels'],
    queryFn: fetchAllHotels,
  });
};

// ✅ React Query - Save Hotel
export const useSaveHotel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveHotel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
    },
    onError: (error) => {
      console.error('Save failed:', error);
    },
  });
};

// ✅ React Query - Update Hotel
export const useUpdateHotel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateHotel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
    },
    onError: (error) => {
      console.error('Update failed:', error);
    },
  });
};

// ❌ Optional: React Query - Delete Hotel
// export const useDeleteHotel = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: deleteHotel,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['hotels'] });
//     },
//   });
// };
