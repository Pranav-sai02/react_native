// hooks/useInventory.ts

import { useMutation } from '@tanstack/react-query';
import { SaveInventoryRequest } from '../types/roomAvailability';
import { saveRoomsAvailability } from '@/api/roomsAvailability';

// ✅ Hook to save room availability (inventory)
export const useSaveInventory = () => {
  return useMutation({
    mutationFn: (payload: SaveInventoryRequest) => saveRoomsAvailability(payload),
    onSuccess: () => {
      console.log('✅ Inventory saved successfully');
      // You can trigger a toast/snackbar here if needed
    },
    onError: (error) => {
      console.error('❌ Failed to save inventory:', error);
      // You can show a user-friendly error toast here too
    },
  });
};
