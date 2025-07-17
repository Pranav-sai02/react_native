import { Hotel } from '@/shared/types/Hotel';
import axiosInstance from './axiosinstance';


// ✅ Fetch all hotels
export const fetchAllHotels = async (): Promise<Hotel[]> => {
  const response = await axiosInstance.get('/hotels/all');
  return response.data;
};

// ✅ Save a new hotel
export const saveHotel = async (hotel: Hotel): Promise<Hotel> => {
  const response = await axiosInstance.post('/hotels/saveHotel', hotel);
  return response.data; 
};

// ✅ Update an existing hotel
export const updateHotel = async (hotel: Hotel): Promise<Hotel> => {
  const response = await axiosInstance.put(`/hotels/update/${hotel.hotelId}`, hotel);
  return response.data;
};

// ✅ Delete a hotel (uncomment when needed)
export const deleteHotel = async (hotelId: number): Promise<void> => {
  await axiosInstance.delete(`/hotels/delete/${hotelId}`);
};
